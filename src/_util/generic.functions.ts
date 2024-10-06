export const createArrayFromLength = (length: number) => {
  try {
    return [...Array(length).keys()];
  } catch (e) {
    const em = e + "Given length:" + length;
    console.error(em);
    return [];
  }
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
  if (max - min === 0)
    throw new RangeError(
      "max must be a range greater 0. Gives was max:" + max + " and min" + min,
    );
  return value / (max - min);
};

export const remapT = (t: number, min = 0, max = 1) => {
  const newT = (t - min) / (max - min);
  const res = Math.min(Math.max(newT, 0), 1);
  return res;
};

export const calculateArcLength = (radius: number, angle: number) => {
  return 2 * Math.PI * radius * (angle / 360);
};

export const getAngleFromArcLengthInDegrees = (
  arcLength: number,
  radius: number,
): number => {
  const angleInRadians = arcLength / radius;
  return angleInRadians * (180 / Math.PI);
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

export const hexToRgb = (hex: string): [number, number, number, number] => {
  hex = hex.replace("#", "");

  const bigint = parseInt(hex, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b, 255];
};
