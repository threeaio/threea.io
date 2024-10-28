import { Simple2D, Simple2DAndTuple, Simple2DLine } from "~/_util/types";

/**
 * Math Utility Functions
 */

/**
 * Normalizes a value between a given range.
 * @param min Minimum range value.
 * @param max Maximum range value.
 * @param value The value to normalize.
 * @returns The normalized value.
 * @throws RangeError if the range is zero.
 */
export const normalize = (min: number, max: number, value: number) => {
  if (max - min === 0)
    throw new RangeError(
      `Must be a range greater than 0. Given was a range with max: ${max} and min: ${min}`,
    );
  return (value - min) / (max - min);
};

/**
 * Clamps a value between min and max.
 * @param min Minimum limit.
 * @param max Maximum limit.
 * @param value The value to clamp.
 * @returns The clamped value.
 */
export const clamp = (min: number, max: number, value: number) => {
  return Math.min(Math.max(min, value), max);
};

/**
 * Linearly interpolates between two values.
 * @param a Start value.
 * @param b End value.
 * @param t Interpolation factor.
 * @returns Interpolated value.
 */
export const lerp = (a: number, b: number, t: number) => a + t * (b - a);

/**
 * Remaps a value from one range to another.
 * @param origMin Original minimum value.
 * @param origMax Original maximum value.
 * @param targetMin Target minimum value.
 * @param targetMax Target maximum value.
 * @param num Value to remap.
 * @returns The remapped value.
 */
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

/**
 * maps a normalized value within a specified range [min, max] to a constrained value between 0 and 1.
 * @param value The input value (between 0 and 1) to normalize within the new range.
 * @param min Minimum boundary of the range (must be between 0 and 1).
 * @param max Maximum boundary of the range (must be between 0 and 1).
 * @returns A normalized value between 0 and 1.
 */
export const mapToNewUnitRange = (value: number, min = 0, max = 1) => {
  if (max > 1 || max < 0 || min > 1 || min < 0)
    throw new RangeError("Range values must be between 0 and 1");
  if (max - min === 0)
    throw new RangeError(
      `Range must be greater than 0. Given was max: ${max} and min: ${min}`,
    );
  const normalizedValue = (value - min) / (max - min);
  return Math.min(Math.max(normalizedValue, 0), 1);
};

/**
 * Smoothstep function.
 * @param x Value between 0 and 1.
 * @returns Smoothly interpolated value.
 * @throws Error if x is not in [0,1].
 */
export const smoothStep = (x: number): number => {
  if (x < 0 || x > 1) {
    throw new Error("Input x must be between 0 and 1.");
  }
  return x * x * (3 - 2 * x);
};

/**
 * Circle and Ellipse Calculations
 */

/**
 * Calculates slice length on a circle.
 * @param r Radius of the circle.
 * @param offsetTop Offset from the top.
 * @returns The length of the slice.
 */
export function getSliceLengthOnCircle(r: number, offsetTop: number): number {
  return 2 * Math.sqrt(2 * r * offsetTop - offsetTop * offsetTop);
}

/**
 * Gets a point on an ellipse at a given angle.
 * @param angle Angle in radians.
 * @param radiusX X-radius of the ellipse.
 * @param radiusY Y-radius of the ellipse (defaults to X-radius if undefined).
 * @returns The point on the ellipse as a Simple2D object.
 */
export function getPointOnEllipse(
  angle: number,
  radiusX: number,
  radiusY?: number,
): Simple2D {
  const x = radiusX * Math.cos(angle);
  const y =
    (typeof radiusY !== "undefined" ? radiusY : radiusX) * Math.sin(angle);
  return { x, y };
}

const PI = Math.trunc(Math.PI * 1000) / 1000;

/**
 * Calculates arc length for a given angle on a circle.
 * @param radius Radius of the circle.
 * @param angle Angle in degrees.
 * @returns The arc length.
 */
export const calculateArcLength = (radius: number, angle: number) => {
  return 2 * PI * radius * (angle / 360);
};

/**
 * Gets the angle in degrees from arc length.
 * @param arcLength Length of the arc.
 * @param radius Radius of the circle.
 * @returns The angle in degrees.
 */
export const getAngleFromArcLengthInDegrees = (
  arcLength: number,
  radius: number,
): number => {
  const angleInRadians = arcLength / radius;
  return angleInRadians * (180 / PI);
};

/**
 * Translates a point in 2D space.
 * @param p Point to translate.
 * @param translateX Translation in x-axis.
 * @param translateY Translation in y-axis.
 * @returns Translated point.
 */
export function translate2D(
  p: Simple2D,
  translateX: number,
  translateY: number,
): Simple2D {
  return {
    x: p.x + translateX,
    y: p.y + translateY,
  };
}

/**
 * Random Utility
 */

/**
 * Generates a random float within a range.
 * @param min Minimum value.
 * @param max Maximum value.
 * @param precision Decimal precision.
 * @returns Random float within the range.
 */
export const getRandomFloat = (min: number, max: number, precision = 2) => {
  const minCeiled = min * Math.pow(10, precision);
  const maxFloored = max * Math.pow(10, precision);
  return (
    Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) /
    Math.pow(10, precision)
  );
};

/**
 * Geometry Functions
 */

/**
 * Creates a Simple2D point with tuple.
 * @param x X-coordinate.
 * @param y Y-coordinate.
 * @returns A Simple2DAndTuple object.
 */
export const createSimple2D = (x: number, y: number): Simple2DAndTuple => ({
  x,
  y,
  tuple: [x, y],
});

/**
 * Creates a line between two points.
 * @param start Start point.
 * @param end End point.
 * @returns A Simple2DLine.
 */
export const createSimpleLine = (
  start: Simple2D,
  end: Simple2D,
): Simple2DLine => [start, end];

/**
 * Checks if two lines intersect.
 * @param line1 First line.
 * @param line2 Second line.
 * @returns True if lines intersect, false otherwise.
 */
function linesIntersect(line1: Simple2DLine, line2: Simple2DLine): boolean {
  const [p1, p2] = line1;
  const [q1, q2] = line2;

  const cross = (a: Simple2D, b: Simple2D) => a.x * b.y - a.y * b.x;
  const subtract = (a: Simple2D, b: Simple2D) => ({
    x: a.x - b.x,
    y: a.y - b.y,
  });

  const r = subtract(p2, p1);
  const s = subtract(q2, q1);
  const rxs = cross(r, s);
  const qpxr = cross(subtract(q1, p1), r);

  if (rxs === 0 && qpxr === 0) return false;
  if (rxs === 0 && qpxr !== 0) return false;

  const t = cross(subtract(q1, p1), s) / rxs;
  const u = cross(subtract(q1, p1), r) / rxs;

  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

/**
 * Checks if a shape is outside the viewport.
 * @param widthOfRect Width of the viewport.
 * @param heightOfRect Height of the viewport.
 * @param pointsOfShape Array of points defining the shape.
 * @returns True if the shape is outside, false otherwise.
 */
export const isShapeOutsideViewport = (
  widthOfRect: number,
  heightOfRect: number,
  pointsOfShape: Simple2D[],
): boolean => {
  const someInside = pointsOfShape.some(
    (point) =>
      (point.x >= 0 && point.x <= widthOfRect) ||
      (point.y >= 0 && point.y <= heightOfRect),
  );
  if (someInside) return false;

  const viewportEdges = [
    [
      { x: 0, y: 0 },
      { x: widthOfRect, y: 0 },
    ],
    [
      { x: widthOfRect, y: 0 },
      { x: widthOfRect, y: heightOfRect },
    ],
    [
      { x: widthOfRect, y: heightOfRect },
      { x: 0, y: heightOfRect },
    ],
    [
      { x: 0, y: heightOfRect },
      { x: 0, y: 0 },
    ],
  ];

  for (let i = 0; i < pointsOfShape.length; i++) {
    const p1 = pointsOfShape[i];
    const p2 = pointsOfShape[(i + 1) % pointsOfShape.length];
    for (const [q1, q2] of viewportEdges) {
      if (linesIntersect(createSimpleLine(p1, p2), createSimpleLine(q1, q2))) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Generates subpoints along a line.
 * @param line Line between two points.
 * @param num Number of subpoints.
 * @returns Array of subpoints.
 */
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

/**
 * Array and Object Utilities
 */

/**
 * Gets the keys of an object.
 * @param obj Object to get keys from.
 * @returns Array of keys.
 */
export const getObjectKeys = <T extends object>(obj: T) =>
  Object.keys(obj) as Array<keyof T>;

/**
 * Creates an array of numbers from 0 to length - 1.
 * @param length The length of the array.
 * @returns Array of numbers.
 */
export const createArrayFromLength = (length: number) => {
  try {
    return Array.from({ length }).map((_, i) => i);
  } catch (e) {
    console.error(`${e} Given length: ${length}`);
    return [];
  }
};

/**
 * Inserts an element into an array at a specified index.
 * @param array Original array.
 * @param newEl New element to insert.
 * @param insertAtIndex Index to insert at.
 * @returns New array with the element inserted.
 */
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

/**
 * Moves an element within an array from one index to another.
 * @param array The array to modify.
 * @param from Index of the element to move.
 * @param to New index of the element.
 * @returns New array with the element moved.
 */
export const moveInArray = <T>(array: T[], from: number, to: number) => {
  const elm = array[from];
  const withoutElArray = [...array.slice(0, from), ...array.slice(from + 1)];
  return insertInArray(withoutElArray, elm, to);
};
