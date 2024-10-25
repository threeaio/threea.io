import { Simple2D, Simple2DAndTuple, Simple2DLine } from "~/_util/types";

export const normalize = (min: number, max: number, value: number) => {
  if (max - min === 0)
    throw new RangeError(
      "Must be a range greater 0. Given was a Range with max:" +
        max +
        " and min" +
        min,
    );
  return (value - min) / (max - min);
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

export function getPointOnEllipse(
  angle: number,
  radiusX: number,
  radiusY: number,
): Simple2D {
  const x = radiusX * Math.cos(angle);
  const y = radiusY * Math.sin(angle);
  return { x, y };
}

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

// Funktion zum Berechnen der Schnittpunkte zwischen zwei Linien
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

  if (rxs === 0 && qpxr === 0) {
    // Linien sind kollinear
    return false;
  }

  if (rxs === 0 && qpxr !== 0) {
    // Linien sind parallel und nicht überschneidend
    return false;
  }

  const t = cross(subtract(q1, p1), s) / rxs;
  const u = cross(subtract(q1, p1), r) / rxs;

  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

// Funktion zum Überprüfen, ob die Form außerhalb des Viewports ist
export const isShapeOutsideViewport = (
  widthOfRect: number,
  heightOfRect: number,
  pointsOfShape: Simple2D[],
): boolean => {
  const someInside = pointsOfShape.some((point) => {
    return (
      (point.x >= 0 && point.x <= widthOfRect) ||
      (point.y >= 0 && point.y <= heightOfRect)
    );
  });

  if (someInside) {
    return false;
  }

  // Viewport-Kanten
  const viewportEdges = [
    [
      { x: 0, y: 0 },
      { x: widthOfRect, y: 0 },
    ], // obere Kante
    [
      { x: widthOfRect, y: 0 },
      { x: widthOfRect, y: heightOfRect },
    ], // rechte Kante
    [
      { x: widthOfRect, y: heightOfRect },
      { x: 0, y: heightOfRect },
    ], // untere Kante
    [
      { x: 0, y: heightOfRect },
      { x: 0, y: 0 },
    ], // linke Kante
  ];

  // Prüfen, ob eine Kante der Form den Viewport schneidet
  for (let i = 0; i < pointsOfShape.length; i++) {
    const p1 = pointsOfShape[i];
    const p2 = pointsOfShape[(i + 1) % pointsOfShape.length]; // nächste Kante (schließt die Form)

    for (const [q1, q2] of viewportEdges) {
      if (linesIntersect(createSimpleLine(p1, p2), createSimpleLine(q1, q2))) {
        return false; // Form schneidet Viewport, also ist sie sichtbar
      }
    }
  }
  return true;
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
