import P5 from "p5";
import { P5Line } from "./p5-types";

export const subpoints = (line: P5Line, num: number): P5.Vector[] => {
  let pts: P5.Vector[] = [];
  for (let i = 1; i <= num; i++) {
    pts.push(P5.Vector.lerp(line[0], line[1], i / (num + 1)));
  }
  return pts;
};
