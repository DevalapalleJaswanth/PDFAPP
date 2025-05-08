import React from "react";

export default function RadioButtonGroup({
  id,
  content,
  value,
  changeHandler,
}) {
  return (
    <div>
      {content.length > 0
        ? content.map((option, idx) => (
            <div key={idx}>
              <input
                type="radio"
                name={`radio_${id}`}
                checked={value === option}
                onChange={() => changeHandler(option)}
              />{" "}
              {option}
            </div>
          ))
        : ["Option 1", "Option 2", "Option 3"].map((option, idx) => (
            <div key={idx}>
              <input
                type="radio"
                name={`radio_${id}`}
                checked={value === option}
                onChange={() => changeHandler(option)}
              />{" "}
              {option}
            </div>
          ))}
    </div>
  );
}
