import { Simple2D, Simple2DAndTuple, Simple2DLine } from "~/_util/types";

export const normalize = (min: number, max: number, value: number) => {
  if (max - min === 0)
    throw new RangeError(
      "Must be a range greater 0. Given was a Range with max:" +
        max +
        " and min" +
        min,
    );
  return value / (max - min);
};

export const clamp = (min: number, max: number, value: number) => {
  return Math.min(Math.max(min, value), max);
};

export const lerp = (a: number, b: number, t: number) => a + t * (b - a);

export const reMap = (
  origMin: number,
  origMax: number,
  targetMin: number,
  targetMax: number,
  num: number,
) => {
  const numClamped = clamp(origMin, origMax, num);
  const tInOrig = normalize(origMin, origMax, numClamped);
  return lerp(targetMin, targetMax, tInOrig);
};

export const remapT = (t: number, min = 0, max = 1) => {
  if (max - min === 0)
    throw new RangeError(
      "max must be a range greater 0. Gives was max:" + max + " and min" + min,
    );
  const newT = (t - min) / (max - min);
  return Math.min(Math.max(newT, 0), 1);
};

const PI = Math.trunc(Math.PI * 1000) / 1000;

export const calculateArcLength = (radius: number, angle: number) => {
  return 2 * PI * radius * (angle / 360);
};

export const getAngleFromArcLengthInDegrees = (
  arcLength: number,
  radius: number,
): number => {
  const angleInRadians = arcLength / radius;
  return angleInRadians * (180 / PI);
};

export const getRandomFloat = (min: number, max: number, precision = 2) => {
  const minCeiled = min * Math.pow(10, precision);
  const maxFloored = max * Math.pow(10, precision);
  return (
    Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) /
    Math.pow(10, precision)
  );
};

/*
Geometry
 */

export const createSimple2D = (x: number, y: number): Simple2DAndTuple => ({
  x,
  y,
  tuple: [x, y],
});

export const createSimpleLine = (
  start: Simple2D,
  end: Simple2D,
): Simple2DLine => [start, end];

export const allPointsOutsideViewport = (
  width: number,
  height: number,
  points: Simple2D[],
): boolean => {
  return points.every((point) => {
    return point.x < 0 || point.x > width || point.y < 0 || point.y > height;
  });
};

export const subpoints = (
  line: Simple2DLine,
  num: number,
): Simple2DAndTuple[] => {
  let pts: Simple2DAndTuple[] = [];
  for (let i = 1; i <= num; i++) {
    pts.push(
      createSimple2D(
        lerp(line[0].x, line[1].x, i / (num + 1)),
        lerp(line[0].y, line[1].y, i / (num + 1)),
      ),
    );
  }
  return pts;
};

/*
Arrays and Objects
 */

export const getObjectKeys = <T extends object>(obj: T) =>
  Object.keys(obj) as Array<keyof T>;

export const createArrayFromLength = (length: number) => {
  try {
    return Array.from({ length }).map((_, i) => i);
  } catch (e) {
    const em = e + " Given length:" + length;
    console.error(em);
    return [];
  }
};

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

export const moveInArray = <T>(array: T[], from: number, to: number) => {
  const elm = array[from];
  const withoutElArray = [...array.slice(0, from), ...array.slice(from + 1)];
  return insertInArray(withoutElArray, elm, to);
};

// export const hexToRgb = (hex: string): [number, number, number, number] => {
//   hex = hex.replace("#", "");
//
//   const bigint = parseInt(hex, 16);
//
//   const r = (bigint >> 16) & 255;
//   const g = (bigint >> 8) & 255;
//   const b = bigint & 255;
//
//   return [r, g, b, 255];
// };
