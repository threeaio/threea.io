const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "3a-green": "var(--color-3a-green)",
      "3a-red": "var(--color-3a-red)",
      "3a-white": "var(--color-3a-white)",
      "3a-paper": "var(--color-3a-paper)",
      "3a-gray": "var(--color-3a-gray)",
      "3a-gray-darker": "var(--color-3a-gray-darker)",
      "3a-gray-darkest": "var(--color-3a-gray-darkest)",
      "3a-black": "var(--color-3a-black)",
    },
    extend: {
      ...generateGrid(26),
      fontFamily: {
        display: ['"Cal Sans"', ...defaultTheme.fontFamily.sans],
        sans: ['"Trispace"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: []
};

function generateGrid(size) {
  const gridColumn = {};
  const gridTemplateColumns = {};
  const gridRow = {};
  const gridTemplateRows = {};
  const gridRowStart = {};
  const gridRowEnd = {};
  const gridColumnStart = {};
  const gridColumnEnd = {};
  for (let i = 1; i <= size; i++) {
    gridRow[`span-${i}`] = `span ${i} / span ${i}`;
    gridColumn[`span-${i}`] = `span ${i} / span ${i}`;
    gridTemplateColumns[i] = `repeat(${i}, minmax(0, 1fr))`;
    gridTemplateRows[i] = `repeat(${i}, minmax(0, 1fr))`;
    gridRowStart[i] = `${i}`;
    gridRowEnd[i] = `${i}`;
    gridColumnStart[i] = `${i}`;
    gridColumnEnd[i] = `${i}`;
  }
  return {
    gridColumn,
    gridTemplateColumns,
    gridRow,
    gridTemplateRows,
    gridRowStart,
    gridRowEnd,
    gridColumnStart,
    gridColumnEnd,
  };
}
