import React from "react";

export default function ParameterPanel({
  selectedElement,
  updateSelectedElement,
}) {
  if (!selectedElement) return null;

  return (
    <>
      <h3 className="text-lg font-bold">Parameter Control</h3>

      {selectedElement.type === "Text Area" && (
        <div className="flex flex-col gap-4">
          {/* <div>
            <label>Content: </label>
            <textarea
              value={selectedElement.content}
              onChange={(e) => updateSelectedElement("content", e.target.value)}
              className="w-full border mt-1 p-1"
            />
          </div> */}
          <div>
            <label className="mt-2">Font Color: </label>
            <input
              type="color"
              value={selectedElement.fontColor}
              onChange={(e) => {
                updateSelectedElement("fontColor", e.target.value);
              }}
            />
          </div>
          <div>
            <label className="mt-2">Border: </label>
            <input
              type="checkbox"
              checked={selectedElement.border}
              onChange={(e) =>
                updateSelectedElement("border", e.target.checked)
              }
            />
          </div>
          <div className={!selectedElement.border ? "text-gray-200" : ""}>
            <label className="mt-2">Border Color: </label>
            <input
              type="color"
              value={selectedElement.borderColor}
              onChange={(e) =>
                updateSelectedElement("borderColor", e.target.value)
              }
              disabled={!selectedElement.border}
            />
          </div>
        </div>
      )}

      {(selectedElement.type === "Radio Group" ||
        selectedElement.type === "Checkbox Group" ||
        selectedElement.type === "Dropdown") && (
        <div className="flex flex-col gap-4">
          <div>
            <label>Options (comma separated):</label>
            <textarea
              value={selectedElement.content.join(",")}
              onChange={(e) =>
                updateSelectedElement("content", e.target.value.split(","))
              }
              className="w-full border mt-1 p-1"
            />
          </div>
          <div>
            <label className="mt-2">Text Color:</label>
            <input
              type="color"
              value={selectedElement.fontColor}
              onChange={(e) =>
                updateSelectedElement("fontColor", e.target.value)
              }
            />
          </div>
          <div>
            <label className="mt-2">Border:</label>
            <input
              type="checkbox"
              checked={selectedElement.border}
              onChange={(e) =>
                updateSelectedElement("border", e.target.checked)
              }
            />
          </div>
          <div className={!selectedElement.border ? "text-gray-200" : ""}>
            <label className="mt-2">Border Color:</label>
            <input
              type="color"
              value={selectedElement.borderColor}
              onChange={(e) =>
                updateSelectedElement("borderColor", e.target.value)
              }
              disabled={!selectedElement.border}
            />
          </div>
        </div>
      )}
    </>
  );
}
