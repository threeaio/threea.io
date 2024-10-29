import { COLORS_3A } from "~/_util-client-only";
import { dvtx } from "~/components/animation/animation-drawables";
import P5 from "p5";
import { Simple2D } from "~/_util";
import { RotatableCubeConfig } from "~/components/animation/stacked-cube/Primitives/Rotatable-Cube";

export const drawAsStackedCubes = (
  p5: P5,
  planes: Simple2D[][],
  connectors: Simple2D[][][],
  config: RotatableCubeConfig,
  hasGap: boolean,
) => {
  p5.stroke(COLORS_3A.WHITE);
  p5.strokeWeight(1);

  for (let i = 0; i < planes.length; i++) {
    p5.fill(COLORS_3A[config.outlineColor]);
    p5.stroke(COLORS_3A[config.outlineColor]);
    p5.beginShape();
    for (let j = 0; j < planes[i].length; j++) {
      dvtx(p5, planes[i][j]);
    }
    p5.endShape(p5.CLOSE);

    p5.fill(COLORS_3A[config.fillColor]);
    if (hasGap || !config.hideOutlinesWhenStable) {
      p5.stroke(COLORS_3A[config.outlineColor]);
      for (let j = 0; j < connectors[i].length; j++) {
        p5.beginShape();
        dvtx(p5, connectors[i][j][0]);
        dvtx(p5, connectors[i][j][1]);
        dvtx(p5, connectors[i][j][2]);
        dvtx(p5, connectors[i][j][3]);
        p5.endShape(p5.CLOSE);
      }
    } else {
      for (let j = 0; j < connectors[i].length; j++) {
        p5.noStroke();
        p5.beginShape();
        dvtx(p5, connectors[i][j][0]);
        dvtx(p5, connectors[i][j][1]);
        dvtx(p5, connectors[i][j][2]);
        dvtx(p5, connectors[i][j][3]);
        p5.endShape(p5.CLOSE);
        p5.stroke(COLORS_3A[config.outlineColor]);
        p5.line(
          connectors[i][j][0].x,
          connectors[i][j][0].y,
          connectors[i][j][3].x,
          connectors[i][j][3].y,
        );
        p5.line(
          connectors[i][j][1].x,
          connectors[i][j][1].y,
          connectors[i][j][2].x,
          connectors[i][j][2].y,
        );
      }
    }
  }

  if (config.hideOutlinesWhenStable && !hasGap) {
    const last = connectors.at(0)!;
    for (let j = 0; j < last.length; j++) {
      const lastConnector = last[j];
      p5.stroke(COLORS_3A[config.outlineColor]);
      p5.line(
        lastConnector[2].x,
        lastConnector[2].y,
        lastConnector[3].x,
        lastConnector[3].y,
      );
      p5.line(
        lastConnector[1].x,
        lastConnector[1].y,
        lastConnector[2].x,
        lastConnector[2].y,
      );
    }
  }
};
