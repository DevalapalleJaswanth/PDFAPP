import React from "react";

export default function TextArea({
  content,
  changeHandler,
  styles,
  placeholder,
}) {
  return (
    <>
      <textarea
        value={content}
        placeholder={placeholder}
        className={styles}
        onChange={changeHandler}
      />
    </>
  );
}
