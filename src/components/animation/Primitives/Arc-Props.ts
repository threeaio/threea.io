import P5 from "p5";

export type BrockmanProps = {
  pos: P5.Vector;
  arcStart: number;
  arcEnd: number;
  radius: number;
  thickness: number;
  numPoints: number;
  color?: string;
};
