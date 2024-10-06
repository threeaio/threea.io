const style = getComputedStyle(document.body);
const GRAY_DARKEST = style.getPropertyValue("--color-3a-gray-darkest");
const PAPER = style.getPropertyValue("--color-3a-paper");
const GREEN = style.getPropertyValue("--color-3a-green");
const BLACK = style.getPropertyValue("--color-3a-black");

export const COLORS_3A = {
  GRAY_DARKEST,
  PAPER,
  GREEN,
  BLACK,
};
