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
      gridTemplateColumns: {
        '26': '1rem 1rem 1rem repeat(20, minmax(0, 1fr)) 1rem 1rem 1rem',
      },
      fontFamily: {
        display: ['"Hoves"', ...defaultTheme.fontFamily.sans],
        sans: ['"Hoves-Mono"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: []
};

function generateGrid(size) {
  const gridColumn = {};
  const gridTemplateRows = {};
  const gridColumnStart = {};
  const gridColumnEnd = {};
  for (let i = 1; i <= size; i++) {
    gridColumn[`span-${i}`] = `span ${i} / span ${i}`;
    gridTemplateRows[i] = `repeat(${i}, minmax(0, 1fr))`;
    gridColumnStart[i] = `${i}`;
    gridColumnEnd[i] = `${i}`;
  }
  return {
    gridColumn,
    gridTemplateRows,
    gridColumnStart,
    gridColumnEnd,
  };
}
