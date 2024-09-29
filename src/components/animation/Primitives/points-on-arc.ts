import P5 from "p5";
import { coordOfCircle, createArrayFromLength, lerp, normalize } from "~/_util";

export type CreatePointsOnArcParams = {
  p5: P5;
  center: { x: number; y: number };
  angleStart: number;
  angleEnd: number;
  radius: number;
  resolution: number;
};

export type CreatePointsOnArcParams2 = {
  p5: P5;
  center: { x: number; y: number };
  angleStart: number;
  angleEnd: number;
  radius: number;
  angleToAdd: number;
  resolution: number;
  useResolution: boolean;
};

export const createPointsOnArc = ({
  p5,
  center,
  angleStart,
  angleEnd,
  radius,
  resolution,
}: CreatePointsOnArcParams): P5.Vector[] => {
  return createArrayFromLength(resolution).map((_, i) => {
    const t = normalize(0, resolution, i);
    const angleHere = lerp(angleStart, angleEnd, t);
    const circleCoord = coordOfCircle(p5, center, angleHere, radius);
    return new P5.Vector(circleCoord.x, circleCoord.y);
  });
};

export const createPointsOnArc2 = ({
  p5,
  center,
  angleStart,
  angleEnd,
  radius,
  angleToAdd,
  useResolution,
  resolution,
}: CreatePointsOnArcParams2): P5.Vector[] => {
  let angleHere = angleStart;
  const res = [];

  if (useResolution) {
    for (let i = 0; i < resolution; i++) {
      res.push(coordOfCircle(p5, center, angleStart + i * angleToAdd, radius));
    }
  } else {
    while (angleHere < angleEnd) {
      res.push(coordOfCircle(p5, center, angleHere, radius));
      angleHere += angleToAdd;
    }
  }

  return res;
};
