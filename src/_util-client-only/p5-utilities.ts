import P5 from "p5";
import { createSimple2D, Simple2DAndTuple } from "~/_util";

export const coordOfCircle = (
  _p5: P5,
  center: { x: number; y: number },
  angle: number, // respects settings in P5
  radius: number,
): Simple2DAndTuple => {
  return createSimple2D(
    center.x + _p5.cos(angle) * radius,
    center.y + _p5.sin(angle) * radius,
  );
};
