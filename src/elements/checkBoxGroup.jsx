import React from "react";

export default function CheckboxGroup({ content, value, changeHandler }) {
  return (
    <div>
      {content.length > 0
        ? content.map((option, idx) => (
            <div key={idx}>
              <input
                type="checkbox"
                checked={value.includes(option)}
                onChange={(e) => changeHandler(option, e.target.checked)}
              />{" "}
              {option}
            </div>
          ))
        : ["Option 1", "Option 2", "Option 3"].map((option, idx) => (
            <div key={idx}>
              <input
                type="checkbox"
                checked={value.includes(option)}
                onChange={(e) => changeHandler(option, e.target.checked)}
              />{" "}
              {option}
            </div>
          ))}
    </div>
  );
}
