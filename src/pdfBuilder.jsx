import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import ParameterPanel from "./parameterpanel";
import RenderElement from "./elementRenderer";
import ElementsList from "./elementsPanel";

const PDFBuilder = () => {
  const savedPages = JSON.parse(localStorage.getItem("pdf_pages"));
  const savedElements = JSON.parse(localStorage.getItem("pdf_elements"));
  const [elements, setElements] = useState(
    savedElements.length > 0 ? savedElements : []
  );
  const [pages, setPages] = useState(savedPages.length > 0 ? savedPages : [0]);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    if (elements.length == 0) {
      setSelectedElement(null);
    }
  }, [elements, pages]);

  const updateSelectedElement = (key, value) => {
    console.log(key, value);
    setSelectedElement((prev) => ({
      ...prev,
      [key]: value,
    }));

    setElements((prev) =>
      prev.map((el) =>
        el.id === selectedElement.id ? { ...el, [key]: value } : el
      )
    );
  };

  // Load from LocalStorage
  // useEffect(() => {
  //   const savedPages = localStorage.getItem("pdf_pages");
  //   const savedElements = localStorage.getItem("pdf_elements");
  //   // console.log(savedElements, );
  //   setPages(JSON.parse(localStorage.getItem("pdf_pages")));
  //   setElements(JSON.parse(localStorage.getItem("pdf_elements")));
  // }, []);

  // Sync to LocalStorage
  useEffect(() => {
    function saveToLocalStorage() {
      localStorage.setItem("pdf_elements", JSON.stringify(elements));
    }
    saveToLocalStorage();
    // window.addEventListener("beforeunload", saveToLocalStorage);

    // return () => {
    //   window.removeEventListener("beforeunload", saveToLocalStorage);
    // };
  }, [elements]);

  useEffect(() => {
    function saveToLocalStorage() {
      localStorage.setItem("pdf_pages", JSON.stringify(pages));
    }
    saveToLocalStorage();
    // window.addEventListener("beforeunload", saveToLocalStorage);

    // return () => {
    //   window.removeEventListener("beforeunload", saveToLocalStorage);
    // };
  }, [pages]);

  // Handle Drag End
  const handleDragEnd = (e, pageIndex) => {
    const elementType = e.dataTransfer.getData("elementType");
    if (!elementType) return;

    const dropZone = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - dropZone.left;
    const offsetY = e.clientY - dropZone.top;

    if (
      offsetX < 0 ||
      offsetY < 0 ||
      offsetX > dropZone.width ||
      offsetY > dropZone.height
    )
      return;

    const newElement = {
      id: Date.now(),
      type: elementType,
      page: pageIndex,
      x: offsetX,
      y: offsetY,
      width: 150,
      height: 90,
      border: true,
      fontColor: "#000000",
      borderColor: "#000000",
      content:
        elementType === "Text Area" ? "" : ["Option 1", "Option 2", "Option 3"],
    };
    if (elementType !== "Text Area") {
      newElement.value = elementType === "Checkbox Group" ? [] : "";
    }
    setElements((prev) => [...prev, newElement]);
  };

  const addPage = () => {
    setPages((prev) => [...prev, prev.length]);
  };

  const removePage = (pageIndex) => {
    if (pages.length > 1) {
      setPages((prev) => prev.filter((_, index) => index !== pageIndex));
      setElements((prev) => prev.filter((el) => el.page !== pageIndex));
    } else {
      alert("Cannot remove the last remaining page.");
    }
  };

  const updateElementPosition = (id, x, y, width, height) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, x, y, width, height } : el))
    );
  };

  return (
    <div className="flex h-full relative ">
      <div className="w-1/5 bg-gray-100 p-4 space-y-2 fixed left-0 top-20 z-1 h-screen">
        <ElementsList />
        <button
          onClick={addPage}
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Page
        </button>
      </div>

      <div className="flex-1 relative bg-gray-50 flex flex-col items-center">
        {pages.map((page, index) => (
          <div
            key={index}
            className="relative border border-gray-300 mt-4 w-[595px] h-[841px] bg-white"
            onDrop={(e) => handleDragEnd(e, index)}
            onDragOver={(e) => e.preventDefault()}>
            <button
              onClick={() => removePage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded">
              Delete Page
            </button>

            {elements
              .filter((el) => el.page === index)
              .map((el) => (
                <Rnd
                  key={el.id}
                  size={{ width: el.width, height: el.height }}
                  position={{ x: el.x, y: el.y }}
                  onDragStop={(e, d) =>
                    updateElementPosition(el.id, d.x, d.y, el.width, el.height)
                  }
                  onResizeStop={(e, direction, ref, delta, position) => {
                    updateElementPosition(
                      el.id,
                      position.x,
                      position.y,
                      parseFloat(ref.style.width),
                      parseFloat(ref.style.height)
                    );
                  }}
                  bounds="parent"
                  className={` ${el.border && "border border-dashed "} p-2`}
                  style={{
                    borderColor: el.border && el.borderColor,
                    color: el.fontColor,
                  }}>
                  <RenderElement
                    el={el}
                    elements={elements}
                    setElements={setElements}
                    setSelectedElement={setSelectedElement}
                  />
                </Rnd>
              ))}
          </div>
        ))}
      </div>
      <div className="w-1/5 bg-gray-100 p-4 space-y-2 fixed right-0 top-20 z-1 h-screen">
        <ParameterPanel
          updateSelectedElement={updateSelectedElement}
          selectedElement={selectedElement}
        />
      </div>
    </div>
  );
};

export default PDFBuilder;
