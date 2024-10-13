import P5 from "p5";
import { Simple2DLine } from "./p5-types";

export const subpoints = (line: Simple2DLine, num: number): P5.Vector[] => {
  let pts: P5.Vector[] = [];
  for (let i = 1; i <= num; i++) {
    pts.push(P5.Vector.lerp(line[0], line[1], i / (num + 1)));
  }
  return pts;
};

export const coordOfCircle = (
  _p5: P5,
  center: { x: number; y: number },
  angle: number, // respects settings in P5
  radius: number,
): P5.Vector => {
  return new P5.Vector(
    center.x + _p5.cos(angle) * radius,
    center.y + _p5.sin(angle) * radius,
  );
};
