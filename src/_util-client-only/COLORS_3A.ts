const style = getComputedStyle(document.body);
const GRAY_DARKEST = style.getPropertyValue("--color-3a-gray-darkest");
const GRAY_DARKER = style.getPropertyValue("--color-3a-gray-darker");

const PAPER = style.getPropertyValue("--color-3a-paper");
const WHITE = style.getPropertyValue("--color-3a-white");
const GREEN = style.getPropertyValue("--color-3a-green");
const RED = style.getPropertyValue("--color-3a-red");
const BLACK = style.getPropertyValue("--color-3a-black");

export const COLORS_3A = {
  WHITE,
  PAPER,
  GREEN,
  RED,
  GRAY_DARKER,
  GRAY_DARKEST,
  BLACK,
};
