// import { Pt } from "pts";

export const createArrayFromLength = (length: number) => {
  return [...Array(length).keys()];
};

export const getObjectKeys = <T extends object>(obj: T) =>
  Object.keys(obj) as Array<keyof T>;

export const insertInArray = <T>(
  array: T[],
  newEl: T,
  insertAtIndex: number,
): T[] => {
  return [
    ...array.slice(0, insertAtIndex),
    newEl,
    ...array.slice(insertAtIndex),
  ];
};

export const lerp = (a: number, b: number, t: number) => a + t * (b - a);

export const normalize = (min: number, max: number, value: number) => {
  if (max - min === 0) throw new RangeError("max must be a range greater 0");
  return value / (max - min);
};

export const calculateArcLength = (radius: number, angle: number) => {
  return 2 * Math.PI * radius * (angle / 360);
};

export const getRandomFloat = (min: number, max: number, precision = 2) => {
  const minCeiled = min * Math.pow(10, precision);
  const maxFloored = max * Math.pow(10, precision);
  return (
    Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) /
    Math.pow(10, precision)
  ); // The maximum is exclusive and the minimum is inclusive
};

export const moveInArray = <T>(array: T[], from: number, to: number) => {
  const elm = array[from];
  const withoutElArray = [...array.slice(0, from), ...array.slice(from + 1)];
  return insertInArray(withoutElArray, elm, to);
};

export const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace("#", "");

  const bigint = parseInt(hex, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
};
