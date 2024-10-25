import P5 from "p5";
import { createMemo, createSignal } from "solid-js";
import {
  ColorArray,
  Simple2D,
  calculateArcLength,
  getAngleFromArcLengthInDegrees,
  lerp,
  createSimple2D,
  reMap,
  isShapeOutsideViewport,
} from "~/_util";
import { COLORS_3A, coordOfCircle } from "~/_util-client-only";
import { dvtx } from "~/components/animation/animation-drawables";
export type VerticeArcConfig = {
  debug: boolean;
  randomizeStartPosition: boolean;
  bgColor: ColorArray;
  fill: { color: ColorArray } | false;
  stroke: { color: ColorArray } | false;
};

export default function VerticeArc(p5: P5, config: VerticeArcConfig) {
  const OFFSET_ANGLES: number = -90; // Offset for calculating angles from the top, like a clock

  const [progress, setProgress] = createSignal<number>(0);
  const [center, setCenter] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [dimension, setDimensions] = createSignal<Simple2D>({ x: 0, y: 0 });

  const [arcStartAngle, setArcStartAngle] = createSignal<number>(0);
  const useStartAngle = createMemo<number>(() => arcStartAngle());
  const [arcEndAngle, setArcEndAngle] = createSignal<number>(0);
  const useEndAngle = createMemo<number>(() => arcEndAngle());
  const [radius, setRadius] = createSignal<number>(0);
  const [thickness, setThickness] = createSignal<number>(0);

  const [startOffset, setStartOffset] = createSignal<number>(
    config.randomizeStartPosition ? p5.random(-2, dimension().x / 2) : 0,
  );

  const scaledRadius = createMemo<number>(() => radius());
  const scaledThickness = createMemo<number>(() => thickness());
  const scaledInnerRadius = createMemo<number>(
    () => scaledRadius() + scaledThickness() / 2,
  );

  const arcInnerAngle = createMemo<number>(
    () => useEndAngle() - useStartAngle(),
  );
  const finalArcLength = createMemo<number>(() =>
    calculateArcLength(scaledInnerRadius(), arcInnerAngle()),
  );

  // Position calculations
  const linePositionY = createMemo<number>(
    () => center().y - scaledInnerRadius(),
  );

  const startPositionX = createMemo<number>(
    () => dimension().x / 2 - finalArcLength() + startOffset(),
  );
  const finalPositionX = createMemo<number>(
    () => center().x + calculateArcLength(scaledInnerRadius(), useStartAngle()),
  );
  const currentX = createMemo<number>(() =>
    lerp(startPositionX(), finalPositionX(), progress()),
  );

  const USE_RESOLUTION = createMemo(() => {
    return Math.round(reMap(300, 2000, 50, 90, finalArcLength()));
  });

  const USE_RESOLUTION_VERT = createMemo(() => {
    return Math.round(reMap(0, 200, 1, 8, scaledThickness()));
  });

  /**
   *
   */
  const vertexGrid = createMemo<Simple2D[][]>(() => {
    const finalArc = finalArcLength();
    if (!finalArc) {
      return [];
    }

    const scaledThicknessVal = scaledThickness();
    const _centerX = center().x;
    const _centerY = center().y;
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
            { x: _centerX, y: _centerY },
            angle,
            colPosAsRadius,
          );
        }
      }
    }

    return res;
  });

  /**
   *
   */
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

        if (!isShapeOutsideViewport(dimension().x, dimension().y, points)) {
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

    if (config.fill) {
      p5.stroke(config.fill.color);
      p5.fill(config.fill.color);
    } else if (config.stroke) {
      p5.strokeWeight(0.5);
      p5.noFill();
      p5.stroke(config.stroke.color);
    } else if (config.debug) {
      p5.strokeWeight(0.5);
      p5.noFill();
      p5.stroke(COLORS_3A.PAPER);
    }

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      p5.beginShape();
      dvtx(p5, cell.points[0]);
      dvtx(p5, cell.points[1]);
      dvtx(p5, cell.points[2]);
      dvtx(p5, cell.points[3]);
      dvtx(p5, cell.points[0]);
      p5.endShape(p5.CLOSE);
    }
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
    setCenter,
    setDimensions,
    setStartOffset,
    startOffset,
  };
}

/**
 * Type definition for the VerticeArc function's return value.
 */
export type VerticeArcType = ReturnType<typeof VerticeArc>;
