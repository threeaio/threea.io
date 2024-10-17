import P5 from "p5";
import { createEffect, createMemo, createSignal } from "solid-js";
import * as p5 from "p5";
import { COLORS_3A } from "~/_util-client-only";
import {
  ColorArray,
  Simple2D,
  calculateArcLength,
  createArrayFromLength,
  getAngleFromArcLengthInDegrees,
  lerp,
  createSimple2D,
  reMap,
  allPointsOutsideViewport,
  clamp,
} from "~/_util";
import { coordOfCircle } from "~/_util-client-only";
export type VerticeArcConfig = {
  debug: boolean;
  randomizeStartPosition: boolean;
  bgColor: ColorArray;
  fill: { color: ColorArray } | false;
  stroke: { color: ColorArray } | false;
};

export default function VerticeArc(p5: P5, config: VerticeArcConfig) {
  const RESOLUTION_MIN: number = 60; // Resolution for vertex generation along the arc
  const RESOLUTION_VERT: number = 4; // Resolution for vertex generation along the arc

  const TEMP_SCALER: number = 1; // This constant is used for temporary scaling
  const OFFSET_ANGLES: number = -90; // Offset for calculating angles from the top, like a clock

  const applyTempScale = (n: number): number => n * TEMP_SCALER;

  /**
   * Draws a vertex at the given coordinates.
   * @param {Simple2D} p - The position vector where the vertex should be drawn.
   * @returns {p5} - The p5 vertex function.
   */
  const dvtx = (p: Simple2D): p5 => p5.vertex(p.x, p.y);

  // Signals for arc properties
  const [strokeColor, setStrokeColor] = createSignal<ColorArray>([
    255, 255, 255, 255,
  ]);
  // const [center, setCenter] = createSignal<Vector2D>({ x: 0, y: 0 });
  const [centerX, setCenterX] = createSignal<number>(0);
  const [centerY, setCenterY] = createSignal<number>(0);
  const [cvsWidth, setCvsWidth] = createSignal<number>(0);
  const [cvsHeight, setCvsHeight] = createSignal<number>(0);
  // const [dimensions, setDimension] = createSignal<Simple2D>({ x: 0, y: 0 });

  const [arcStartAngle, setArcStartAngle] = createSignal<number>(0);
  const useStartAngle = createMemo<number>(() => arcStartAngle());
  const [arcEndAngle, setArcEndAngle] = createSignal<number>(0);
  const useEndAngle = createMemo<number>(() => arcEndAngle());
  const [radius, setRadius] = createSignal<number>(0);
  const [thickness, setThickness] = createSignal<number>(0);
  const [progress, setProgress] = createSignal<number>(0);

  // no need for signal here
  const [startOffset, setStartOffset] = createSignal<number>(
    config.randomizeStartPosition ? p5.random(-2, cvsWidth() / 2) : 0,
  );

  // Memoized values for scaled radius and thickness
  // const center = createMemo<Simple2D>(() => ({
  //   x: centerX(),
  //   y: centerY(),
  // }));
  const scaledRadius = createMemo<number>(() => applyTempScale(radius()));
  const scaledThickness = createMemo<number>(() => applyTempScale(thickness()));
  const scaledInnerRadius = createMemo<number>(
    () => scaledRadius() + scaledThickness() / 2,
  );

  // Memoized calculations for arc geometry
  const arcInnerAngle = createMemo<number>(
    () => useEndAngle() - useStartAngle(),
  );
  const finalArcLength = createMemo<number>(() =>
    calculateArcLength(scaledInnerRadius(), arcInnerAngle()),
  );

  // Position calculations
  const linePositionY = createMemo<number>(
    () => centerY() - scaledInnerRadius(),
  );

  const startPositionX = createMemo<number>(
    () => cvsWidth() / 2 - finalArcLength() + startOffset(),
  );
  const finalPositionX = createMemo<number>(
    () => centerX() + calculateArcLength(scaledInnerRadius(), useStartAngle()),
  );
  const currentX = createMemo<number>(() =>
    lerp(startPositionX(), finalPositionX(), progress()),
  );

  const USE_RESOLUTION = createMemo(() => {
    return Math.round(reMap(50, 2000, 10, 90, finalArcLength()));
  });

  const USE_RESOLUTION_VERT = createMemo(() => {
    // console.log("scaledThickness()", scaledThickness());
    return Math.round(reMap(0, 200, 1, 8, scaledThickness()));
  });

  const vertexGrid = createMemo<Simple2D[][]>(() => {
    const finalArc = finalArcLength();
    if (!finalArc) {
      return [];
    }

    const scaledThicknessVal = scaledThickness();
    const _centerX = centerX();
    const _centerY = centerY();
    const scaledInnerRad = scaledInnerRadius();
    const useResolution = USE_RESOLUTION();
    const useResolutionVert = USE_RESOLUTION_VERT();

    const colSize = scaledThicknessVal / useResolutionVert;
    const rowSize = finalArc / useResolution;

    const startX = currentX();
    const startY = linePositionY() + scaledThicknessVal / 2;

    const res: Simple2D[][] = Array.from(
      { length: useResolution + 1 },
      () => [],
    );

    for (let row = 0; row <= useResolution; row++) {
      const offsetRow = row * rowSize;
      const rowPosLinear = offsetRow + startX;
      const arcLength = rowPosLinear - _centerX;
      const angle =
        rowPosLinear > _centerX
          ? getAngleFromArcLengthInDegrees(arcLength, scaledInnerRad) +
            OFFSET_ANGLES
          : 0;

      for (let col = 0; col <= useResolutionVert; col++) {
        const offsetCol = col * colSize;
        const colPosLinear = startY - offsetCol;
        const colPosAsRadius =
          scaledInnerRad - scaledThicknessVal / 2 + offsetCol;

        if (rowPosLinear <= _centerX) {
          res[row][col] = createSimple2D(rowPosLinear, colPosLinear);
        } else {
          res[row][col] = coordOfCircle(
            p5,
            { x: _centerX, y: _centerY },
            angle,
            colPosAsRadius,
          );
        }
      }
    }

    return res;
  });

  const vertexGridCells = createMemo<
    {
      row: number;
      col: number;
      points: [Simple2D, Simple2D, Simple2D, Simple2D];
    }[]
  >(() => {
    const grid = vertexGrid();
    const cells: {
      row: number;
      col: number;
      points: [Simple2D, Simple2D, Simple2D, Simple2D];
    }[] = [];
    for (let row = 0; row < grid.length - 1; row++) {
      for (let col = 0; col < grid[row].length - 1; col++) {
        const cellLeftTop = grid[row][col];
        const cellRightTop = grid[row][col + 1];
        const cellLeftBottom = grid[row + 1][col];
        const cellRightBottom = grid[row + 1][col + 1];
        const points = [
          cellLeftTop,
          cellRightTop,
          cellRightBottom,
          cellLeftBottom,
        ] as [Simple2D, Simple2D, Simple2D, Simple2D];
        if (!allPointsOutsideViewport(cvsWidth(), cvsHeight(), points)) {
          cells.push({
            row,
            col,
            points,
          });
        }
      }
    }
    return cells;
  });

  /**
   * Draws the arcs
   */
  const draw = (): void => {
    // const grid = vertexGrid();
    //
    // for (let row = 0; row < grid.length; row++) {
    //   for (let col = 0; col < grid[row].length; col++) {
    //     p5.strokeWeight(0.5);
    //     p5.stroke("red");
    //     p5.noFill();
    //     p5.circle(grid[row][col].x, grid[row][col].y, 3);
    //   }
    // }

    const cells = vertexGridCells();

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];

      p5.push();

      if (config.fill) {
        // p5.noStroke();
        // p5.stroke([
        //   config.fill.color[0],
        //   config.fill.color[1],
        //   config.fill.color[2],
        //   cell.row * 5,
        // ]);
        const t1 = 1 - cell.row / USE_RESOLUTION();
        const t2 = 1 - cell.col / USE_RESOLUTION_VERT();
        const t = 0;
        p5.strokeWeight(1);
        p5.stroke([
          lerp(config.fill.color[0], config.bgColor[0], t),
          lerp(config.fill.color[1], config.bgColor[1], t),
          lerp(config.fill.color[2], config.bgColor[2], t),
          255,
        ]);
        p5.fill([
          lerp(config.fill.color[0], config.bgColor[0], t),
          lerp(config.fill.color[1], config.bgColor[1], t),
          lerp(config.fill.color[2], config.bgColor[2], t),
          255,
        ]);
      }
      if (config.stroke) {
        p5.noFill();
        p5.strokeWeight(0.5);
        p5.stroke([
          config.stroke.color[0],
          config.stroke.color[1],
          config.stroke.color[2],
          cell.row * 5,
        ]);
      }

      p5.beginShape();
      dvtx(cell.points[0]);
      dvtx(cell.points[1]);
      dvtx(cell.points[2]);
      dvtx(cell.points[3]);
      dvtx(cell.points[0]);
      p5.endShape(p5.CLOSE);
      p5.pop();
      // dvtx(cell[3]);
      // dvtx(cell[0]);
    }

    // p5.fill("red");
    // p5.text(p5.frameRate(), 20, 20);
    // p5.text(USE_RESOLUTION_VERT(), 400 + USE_RESOLUTION_VERT() * 10, 20);

    // p5.updatePixels();

    // p5.image(buffer, -p5.width / 2, -p5.height / 2);

    // if (!config.debug) {
    //   if (config.fill) {
    //     p5.push();
    //     p5.strokeWeight(0.5);
    //     p5.noStroke();
    //     p5.fill(config.fill.color);
    //     p5.beginShape();
    //     for (let i = 0; i < vertexPoints().length; i++) {
    //       dvtx(vertexPoints()[i].top);
    //     }
    //     const reversed = [...vertexPoints()].reverse();
    //     for (let i = 0; i < vertexPoints().length; i++) {
    //       dvtx(reversed[i].bottom);
    //     }
    //     p5.endShape(p5.CLOSE);
    //     p5.pop();
    //   }
    //
    //   if (config.stroke) {
    //     p5.push();
    //     p5.noFill();
    //     p5.stroke(config.stroke.color);
    //     p5.strokeWeight(0.5);
    //
    //     p5.beginShape();
    //     /// outline
    //     for (let i = 0; i < vertexPoints().length; i++) {
    //       dvtx(vertexPoints()[i].top);
    //     }
    //     const reversed = [...vertexPoints()].reverse();
    //     for (let i = 0; i < vertexPoints().length; i++) {
    //       dvtx(reversed[i].bottom);
    //     }
    //     p5.endShape(p5.CLOSE);
    //
    //     /// center
    //     for (let i = 0; i < vertexPoints().length - 1; i++) {
    //       p5.line(
    //         vertexPoints()[i].center!.x,
    //         vertexPoints()[i].center!.y,
    //         vertexPoints()[i + 1].center!.x,
    //         vertexPoints()[i + 1].center!.y,
    //       );
    //     }
    //
    //     /// verticals
    //     for (let i = 0; i < vertexPoints().length; i++) {
    //       if (i % 4 === 0) {
    //         p5.line(
    //           vertexPoints()[i].top.x,
    //           vertexPoints()[i].top.y,
    //           vertexPoints()[i].bottom.x,
    //           vertexPoints()[i].bottom.y,
    //         );
    //       }
    //     }
    //     p5.pop();
    //   }
    // } else if (config.debug) {
    //   p5.push();
    //   p5.stroke(COLORS_3A.RED);
    //   p5.fill(COLORS_3A.GRAY_DARKEST);
    //   p5.strokeWeight(0.5);
    //   p5.line(center().x, 0, center().x, p5.height);
    //   p5.circle(center().x, center().y, 15);
    //   p5.pop();
    //
    //   p5.push();
    //
    //   p5.noFill();
    //   p5.stroke(strokeColor());
    //   p5.strokeWeight(0.5);
    //
    //   p5.beginShape();
    //   for (let i = 0; i < vertexPoints().length; i++) {
    //     if (i % 4 === 0) {
    //       dvtx(vertexPoints()[i].center!);
    //     }
    //   }
    //   p5.endShape();
    //
    //   p5.push();
    //   p5.stroke(COLORS_3A.RED);
    //   let shadI = -1;
    //   for (let i = 0; i < vertexPoints().length; i++) {
    //     if (vertexPoints()[i].shadow && i % 4 === 0) {
    //       p5.circle(
    //         vertexPoints()[i].shadow!.x,
    //         vertexPoints()[i].shadow!.y,
    //         5,
    //       );
    //       shadI = i;
    //     }
    //   }
    //
    //   if (shadI > -1) {
    //     p5.line(
    //       vertexPoints()[shadI].shadow!.x,
    //       vertexPoints()[shadI].shadow!.y - 20,
    //       center().x,
    //       vertexPoints()[shadI].shadow!.y - 20,
    //     );
    //     p5.line(
    //       center().x,
    //       center().y,
    //       vertexPoints()[shadI].center!.x,
    //       vertexPoints()[shadI].center!.y,
    //     );
    //   }
    //   p5.pop();
    //
    //   for (let i = 0; i < vertexPoints().length; i++) {
    //     if (i % 4 === 0) {
    //       p5.circle(
    //         vertexPoints()[i].center!.x,
    //         vertexPoints()[i].center!.y,
    //         5,
    //       );
    //     }
    //   }
    // }
  };

  // Return functions to set various arc properties and the draw function
  return {
    draw,
    arcStartAngle,
    setArcStartAngle,
    arcEndAngle,
    setArcEndAngle,
    setRadius,
    setThickness,
    setProgress,
    setCenterX,
    setCenterY,
    setCvsWidth,
    setCvsHeight,
    setStrokeColor,
    setStartOffset,
    startOffset,
  };
}

/**
 * Type definition for the VerticeArc function's return value.
 */
export type VerticeArcType = ReturnType<typeof VerticeArc>;
