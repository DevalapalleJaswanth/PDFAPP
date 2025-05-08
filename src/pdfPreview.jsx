import React, { useEffect, useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";

const PDFPreview = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const generatePDF = async () => {
      const pdfDoc = await PDFDocument.create();

      // Fetch the pages and elements from localStorage
      const savedPages = JSON.parse(localStorage.getItem("pdf_pages")) || [];
      const savedElements =
        JSON.parse(localStorage.getItem("pdf_elements")) || [];

      // Create pages based on the existing page state
      savedPages.forEach(() => {
        pdfDoc.addPage([595, 841]);
      });

      const pdfPages = pdfDoc.getPages();
      const form = pdfDoc.getForm();

      // Map each element to its respective page with form elements
      savedElements.forEach((el) => {
        const page = pdfPages[el.page];
        const { x, y, width, height, content } = el;

        switch (el.type) {
          case "Text Area": {
            const textField = form.createTextField(`text_field_${el.id}`);
            textField.setText(content);
            textField.addToPage(page, {
              x,
              y: 841 - y - height,
              width,
              height,
            });
            break;
          }
          case "Checkbox Group": {
            if (Array.isArray(content)) {
              content.forEach((option, idx) => {
                if (typeof option === "string") {
                  const checkBox = form.createCheckBox(
                    `checkbox_${el.id}_${idx}`
                  );
                  if (el.value.includes(option)) {
                    checkBox.check();
                  }
                  checkBox.addToPage(page, {
                    x: x,
                    y: 841 - y - height - idx * 20,
                    width: 15,
                    height: 15,
                  });

                  page.drawText(option, {
                    x: x + 20,
                    y: 841 - y - height - idx * 20,
                    size: 12,
                    color: rgb(0, 0, 0),
                  });
                }
              });
            }
            break;
          }
          case "Radio Group": {
            const radioGroup = form.createRadioGroup(`radio_group_${el.id}`);
            if (Array.isArray(content)) {
              content.forEach((option, idx) => {
                if (typeof option === "string") {
                  radioGroup.addOptionToPage(option, page, {
                    x: x,
                    y: 841 - y - height - idx * 20,
                    width: 15,
                    height: 15,
                  });

                  page.drawText(option, {
                    x: x + 20,
                    y: 841 - y - height - idx * 20,
                    size: 12,
                    color: rgb(0, 0, 0),
                  });
                }
              });
            }
            radioGroup.select(el.value);
            break;
          }
          case "Dropdown": {
            const dropdown = form.createDropdown(`dropdown_${el.id}`);
            if (Array.isArray(content)) {
              dropdown.setOptions(content);
              dropdown.select(el.value || "");
            }
            dropdown.addToPage(page, {
              x,
              y: 841 - y - height,
              width,
              height,
            });
            break;
          }
          default:
            break;
        }
      });

      form.flatten();

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };

    generatePDF();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          //   width="800px"
          //   height="1000px"
          className="w-full h-full border border-gray-300"></iframe>
      ) : (
        <p>Loading PDF Preview...</p>
      )}
    </div>
  );
};

export default PDFPreview;
