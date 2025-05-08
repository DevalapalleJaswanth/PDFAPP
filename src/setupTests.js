import "@testing-library/jest-dom";
// import "@testing-library/jest-dom/extend-expect";

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

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

const windowMock = {
  location: {
    href: "http://localhost/",
  },
};

Object.defineProperty(window, "window", {
  value: windowMock,
  writable: true,
});
