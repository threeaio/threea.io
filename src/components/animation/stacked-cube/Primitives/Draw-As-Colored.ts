import { COLORS_3A } from "~/_util-client-only";
import { dvtx } from "~/components/animation/animation-drawables";
import P5 from "p5";
import { reMap, remapT, Simple2D, translate2D } from "~/_util";
import { RotatableCubeConfig } from "~/components/animation/stacked-cube/Primitives/Rotatable-Cube";

export const drawAsColored = (
  p5: P5,
  planes: Simple2D[][],
  connectors: Simple2D[][][],
  config: RotatableCubeConfig,
  center: Simple2D,
) => {
  // const vex

  const _planes = planes.map((plane, planeIndex) => {
    let planeIndexFactor =
      Math.sin(reMap(0, planes.length, 0, 3.5, planeIndex)) +
      p5.noise(planeIndex) / 6;
    return plane.map((planePoint) => {
      const moved = translate2D(planePoint, -center.x, -center.y);
      const movedSignx = moved.x;
      return translate2D(
        {
          x: moved.x + (movedSignx / 2) * planeIndexFactor,
          y: moved.y,
        },
        center.x,
        center.y,
      );
    });
  });

  p5.push();
  p5.colorMode(p5.RGB);

  for (let i = 0; i < _planes.length; i++) {
    const thisPlane = _planes[i];
    const planeBefore = _planes[i - 1];

    for (let j = 0; j < thisPlane.length; j++) {
      p5.push();
      p5.noFill();
      const strokeColor = COLORS_3A.WHITE;
      p5.stroke([strokeColor[0], strokeColor[1], strokeColor[2], 160]);
      p5.strokeWeight(0.5);
      if (i > 0) {
        p5.line(
          thisPlane[j].x,
          thisPlane[j].y,
          planeBefore[j].x,
          planeBefore[j].y,
        );
      }
      p5.pop();
    }

    p5.push();
    p5.blendMode(p5.ADD);
    p5.fill([
      reMap(0, _planes.length, 10, 255, i),
      50,
      reMap(0, _planes.length, 255, 120, i),
      reMap(0, _planes.length, 6, 40, i),
    ]);
    p5.noStroke();

    p5.beginShape();
    for (let j = 0; j < thisPlane.length; j++) {
      dvtx(p5, thisPlane[j]);
    }
    p5.endShape(p5.CLOSE);
    p5.pop();
  }

  p5.pop();
};
