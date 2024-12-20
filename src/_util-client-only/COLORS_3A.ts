const asColorArray = (
  colorString: string,
): [number, number, number, number] => {
  const splitted = colorString.split(" ").map(Number);

  return [splitted[0], splitted[1], splitted[2], 255];
};

const style = getComputedStyle(document.body);
const GRAY_DARKEST = asColorArray(
  style.getPropertyValue("--color-3a-gray-darkest"),
);
const GRAY_DARKER = asColorArray(
  style.getPropertyValue("--color-3a-gray-darker"),
);
const GRAY = asColorArray(style.getPropertyValue("--color-3a-gray"));

const PAPER = asColorArray(style.getPropertyValue("--color-3a-paper"));
const WHITE = asColorArray(style.getPropertyValue("--color-3a-white"));
const GREEN = asColorArray(style.getPropertyValue("--color-3a-green"));
const RED = asColorArray(style.getPropertyValue("--color-3a-red"));
const BLACK = asColorArray(style.getPropertyValue("--color-3a-black"));
const BLUE = asColorArray(style.getPropertyValue("--color-3a-blue"));

export const COLORS_3A = {
  WHITE,
  PAPER,
  GREEN,
  BLUE,
  RED,
  GRAY,
  GRAY_DARKER,
  GRAY_DARKEST,
  BLACK,
};
