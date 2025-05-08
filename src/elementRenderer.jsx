import React from "react";
import TextArea from "./elements/textArea";
import DropDownMenu from "./elements/dropDownMenu";
import RadioButtonGroup from "./elements/radioGroup";
import CheckboxGroup from "./elements/checkBoxGroup";

const RenderElement = ({ el, elements, setElements, setSelectedElement }) => {
  const handleSelectElement = (id) => {
    console.log(id);
    const element = elements.find((el) => el.id === id);
    setSelectedElement(element);
  };

  const deleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  const handleContentChange = (e) => {
    setElements((prev) =>
      prev.map((item) =>
        item.id === el.id ? { ...item, content: e.target.value } : item
      )
    );
  };

  const handleRadioChange = (value) => {
    setElements((prev) =>
      prev.map((item) => (item.id === el.id ? { ...item, value: value } : item))
    );
  };

  const handleCheckboxChange = (value, checked) => {
    setElements((prev) =>
      prev.map((item) => {
        if (item.id === el.id) {
          const newContent = checked
            ? [...(item.value || []), value]
            : item.value.filter((v) => v !== value);
          return { ...item, value: newContent };
        }
        return item;
      })
    );
  };

  const handleDropdownChange = (e) => {
    setElements((prev) =>
      prev.map((item) =>
        item.id === el.id ? { ...item, value: e.target.value } : item
      )
    );
  };
  return (
    <div
      className="relative w-full h-full"
      onClick={() => handleSelectElement(el.id)}>
      <button
        onClick={() => deleteElement(el.id)}
        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded">
        X
      </button>

      {el.type === "Text Area" && (
        <TextArea
          content={el.content}
          placeholder={"Enter text..."}
          styles={`w-full h-full outline-none resize-none`}
          changeHandler={handleContentChange}
        />
      )}

      {el.type === "Radio Group" && (
        <RadioButtonGroup
          id={el.id}
          content={el.content}
          value={el.value}
          changeHandler={handleRadioChange}
        />
      )}

      {el.type === "Checkbox Group" && (
        <CheckboxGroup
          content={el.content}
          value={el.value}
          changeHandler={handleCheckboxChange}
        />
      )}

      {el.type === "Dropdown" && (
        <DropDownMenu
          content={el.content}
          value={el.value}
          changeHandler={handleDropdownChange}
        />
      )}
    </div>
  );
};

export default RenderElement;
