import React from "react";

const elementsList = [
  { type: "Text Area", label: "Text Area" },
  { type: "Radio Group", label: "Radio Group" },
  { type: "Checkbox Group", label: "Checkbox Group" },
  { type: "Dropdown", label: "Dropdown Menu" },
];

export default function ElementsList() {
  return (
    <>
      <h3 className="text-lg font-bold">Elements</h3>
      {elementsList.map((el) => (
        <div
          key={el.type}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("elementType", el.type)}
          className="p-2 bg-white shadow rounded cursor-pointer hover:bg-gray-200">
          {el.label}
        </div>
      ))}
    </>
  );
}
