import P5 from "p5";
import { ColorArray, remapT } from "~/_util";

export function fadeInout(p5: P5, bgColor: ColorArray, progress: number) {
  p5.push();
  p5.noStroke();
  p5.fill(
    bgColor[0],
    bgColor[1],
    bgColor[2],
    (1 - remapT(progress, 0, 0.1)) * 255,
  );
  p5.rect(0, 0, p5.width, p5.height);
  p5.pop();

  p5.push();
  p5.noStroke();
  p5.fill(bgColor[0], bgColor[1], bgColor[2], remapT(progress, 0.9, 1) * 255);
  p5.rect(0, 0, p5.width, p5.height);
  p5.pop();
}
