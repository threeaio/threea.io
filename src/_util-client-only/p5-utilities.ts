import P5 from "p5";
import { createSimple2D, Simple2DAndTuple } from "~/_util";

export const coordOfCircle = (
  center: { x: number; y: number },
  angle: number, // respects settings in P5
  radius: number,
): Simple2DAndTuple => {
  const ang = angle * (Math.PI / 180);
  return createSimple2D(
    center.x + Math.cos(ang) * radius,
    center.y + Math.sin(ang) * radius,
  );
};
