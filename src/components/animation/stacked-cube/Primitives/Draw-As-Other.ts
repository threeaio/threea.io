import { COLORS_3A } from "~/_util-client-only";
import { dvtx } from "~/components/animation/animation-drawables";
import P5 from "p5";
import { reMap, mapToNewUnitRange, Simple2D, translate2D } from "~/_util";
import { RotatableCubeConfig } from "~/components/animation/stacked-cube/Primitives/Rotatable-Cube";

export const drawAsOther = (
  p5: P5,
  planes: Simple2D[][],
  connectors: Simple2D[][][],
  config: RotatableCubeConfig,
  center: Simple2D,
) => {
  // const vex

  const _planes = planes.map((plane, planeIndex) => {
    let planeIndexFactor =
      Math.sin(reMap(0, planes.length, 0, 3, planeIndex)) +
      Math.sin(reMap(0, planes.length, 0, 12, planeIndex)) / 3;
    return plane.map((planePoint) => {
      const moved = translate2D(planePoint, -center.x, -center.y);
      const movedSignx = moved.x;
      return translate2D(
        {
          x: moved.x + (movedSignx / 12) * planeIndexFactor,
          y: moved.y,
        },
        center.x,
        center.y,
      );
    });
  });

  p5.push();
  p5.blendMode(p5.ADD);

  const iStep = 1 / _planes.length;
  for (let i = 0; i < _planes.length; i++) {
    const origColor = COLORS_3A[config.outlineColor];
    const color = [...origColor];

    // color[2] = origColor[2] * iStep * i;
    // color[0] = origColor[0] * iStep * (_planes.length - i);

    const thisPlane = _planes[i];
    const planeBefore = _planes[i - 1];

    for (let j = 0; j < thisPlane.length; j++) {
      p5.push();
      p5.noFill();

      p5.stroke(color);

      p5.strokeWeight(2);
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
    p5.noFill();
    p5.stroke([color[0], color[1], color[2], 70]);
    p5.strokeWeight(0.5);
    p5.beginShape();
    for (let j = 0; j < thisPlane.length; j++) {
      dvtx(p5, thisPlane[j]);
    }
    p5.endShape(p5.CLOSE);
    p5.pop();
  }

  p5.pop();
};
