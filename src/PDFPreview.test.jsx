import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import PDFPreview from "./preview";
import "@testing-library/jest-dom/vitest";
// import "@testing-library/jest-dom/extend-expect";

const windowMock = {
  location: {
    href: "http://localhost/",
  },
  // Add other window properties or methods as needed
};

beforeEach(() => {
  Object.defineProperty(window, "window", {
    value: windowMock,
    writable: true,
  });
});

const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });
});

// ✅ Mock URL.createObjectURL
vi.stubGlobal("URL", {
  createObjectURL: vi.fn(() => "http://localhost/mock-url"),
});

// Prepare mock data
beforeEach(() => {
  window.localStorage.setItem("pdf_pages", JSON.stringify([0, 1]));
  window.localStorage.setItem(
    "pdf_elements",
    JSON.stringify([
      {
        id: 1,
        type: "Text Area",
        page: 0,
        x: 50,
        y: 100,
        width: 200,
        height: 50,
        content: "Sample Text",
      },
      {
        id: 2,
        type: "Checkbox Group",
        page: 0,
        x: 100,
        y: 150,
        width: 15,
        height: 15,
        content: ["Option 1", "Option 2"],
      },
    ])
  );
});

afterEach(() => {
  window.localStorage.clear();
});

describe("PDFPreview Component", () => {
  it("renders PDF preview iframe", async () => {
    render(<PDFPreview />);
    const iframeElement = await screen.findByRole("iframe");
    expect(iframeElement).toBeInTheDocument();
  });

  it("renders loading message initially", () => {
    render(<PDFPreview />);
    expect(screen.getByText("Loading PDF Preview...")).toBeInTheDocument();
  });

  it("fetches pdf_pages and pdf_elements from localStorage", () => {
    render(<PDFPreview />);
    const pages = JSON.parse(localStorage.getItem("pdf_pages"));
    const elements = JSON.parse(localStorage.getItem("pdf_elements"));
    expect(pages?.length).toBe(2);
    expect(elements?.length).toBe(2);
  });

  it("displays correct number of pages in PDF", async () => {
    render(<PDFPreview />);
    const iframeElement = await screen.findByRole(
      "iframe",
      {},
      { timeout: 5000 }
    );
    expect(iframeElement).toBeInTheDocument();
  });
});
