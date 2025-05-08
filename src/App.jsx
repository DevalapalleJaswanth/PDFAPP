import { useState, useEffect } from "react";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PDFFormBuilder from "./pdfV2";
import PDFPreview from "./preview";

export default function App() {
  return (
    <div className="w-full flex flex-col h-full">
      <Router>
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-1">
          <Link to="/" className="text-xl hover:text-gray-300">
            🏠 Home
          </Link>
          <Link to="/preview" className="text-xl hover:text-gray-300">
            👁 Preview
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<PDFFormBuilder />} />
          <Route path="/preview" element={<PDFPreview />} />
        </Routes>
      </Router>
    </div>
  );
}
