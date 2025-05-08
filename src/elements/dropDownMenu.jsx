import React from "react";

export default function DropDownMenu({ content, value, changeHandler }) {
  return (
    <>
      <select
        value={value}
        onChange={changeHandler}
        className="w-full h-full outline-none">
        <option value="">Select an option</option>
        {content.length > 0 ? (
          content.map((op, idx) => (
            <option key={idx} value={op}>
              {op}
            </option>
          ))
        ) : (
          <>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </>
        )}
      </select>
    </>
  );
}
