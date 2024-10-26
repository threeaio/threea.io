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
  SimpleCell,
  getPointOnEllipse,
  translate2D,
} from "~/_util";
import { COLORS_3A, coordOfCircle } from "~/_util-client-only";
import { dvtx } from "~/components/animation/animation-drawables";
import { convertToCells } from "~/components/animation/convert-to-cells";
export type VerticeArcConfig = {
  debug?: 1 | 2;
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

  const centerRadius = createMemo<number>(() => radius() + thickness() / 2);
  const outerRadius = createMemo<number>(() => radius() + thickness());

  const arcInnerAngle = createMemo<number>(
    () => useEndAngle() - useStartAngle(),
  );
  const finalArcLength = createMemo<number>(() =>
    calculateArcLength(centerRadius(), arcInnerAngle()),
  );

  // Position calculations
  const linePositionY = createMemo<number>(() => center().y - centerRadius());

  const startPositionX = createMemo<number>(
    () => dimension().x / 2 - finalArcLength() + startOffset(),
  );
  const finalPositionX = createMemo<number>(
    () => center().x + calculateArcLength(centerRadius(), useStartAngle()),
  );
  const currentX = createMemo<number>(() =>
    lerp(startPositionX(), finalPositionX(), progress()),
  );

  const USE_RESOLUTION = createMemo(() => {
    return Math.round(reMap(300, 2000, 50, 90, finalArcLength()));
  });

  const USE_RESOLUTION_VERT = createMemo(() => {
    return config.fill
      ? 1
      : config.debug
        ? 1
        : Math.round(reMap(0, 200, 1, 8, thickness()));
  });

  /**
   *
   */
  const vertexGrid = createMemo<Simple2D[][]>(() => {
    const finalArc = finalArcLength();
    if (!finalArc) {
      return [];
    }

    const thicknessVal = thickness();
    const centerX = center().x;
    const centerY = center().y;
    const scaledInnerRad = centerRadius();
    const useResolution = USE_RESOLUTION();
    const useResolutionVert = USE_RESOLUTION_VERT();

    const colSize = thicknessVal / useResolutionVert;
    const rowSize = finalArc / useResolution;

    const startX = currentX();
    const startY = linePositionY() + thicknessVal / 2;

    const res: Simple2D[][] = Array.from(
      { length: useResolution + 1 },
      () => [],
    );

    for (let row = 0; row <= useResolution; row++) {
      const offsetRow = row * rowSize;
      const rowPosLinear = offsetRow + startX;
      const arcLength = rowPosLinear - centerX;
      const angle =
        rowPosLinear > centerX
          ? getAngleFromArcLengthInDegrees(arcLength, scaledInnerRad) +
            OFFSET_ANGLES
          : 0;

      for (let col = 0; col <= useResolutionVert; col++) {
        const offsetCol = col * colSize;
        const colPosLinear = startY - offsetCol;
        const colPosAsRadius = scaledInnerRad - thicknessVal / 2 + offsetCol;

        if (rowPosLinear <= centerX) {
          res[row][col] = createSimple2D(rowPosLinear, colPosLinear);
        } else {
          res[row][col] = coordOfCircle(
            { x: centerX, y: centerY },
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
  const vertexGridCells = createMemo<SimpleCell[]>(() => {
    return convertToCells(vertexGrid(), dimension());
  });

  /**
   * Draws the arcs
   */
  const draw = (): void => {
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

    if (config.debug && config.debug === 1) {
      p5.strokeWeight(0.5);
      p5.stroke(COLORS_3A.WHITE);
      p5.noFill();
      p5.circle(center().x, center().y, radius() * 2);
      p5.line(center().x, 0, center().x, dimension().y);
    }
    if (config.debug && config.debug === 2) {
      const DEBUG2_LINE_SIZE = 42;
      p5.stroke(COLORS_3A.WHITE);

      p5.line(
        center().x - radius(),
        center().y,
        center().x - outerRadius(),
        center().y,
      );
      p5.line(
        center().x - radius(),
        center().y - DEBUG2_LINE_SIZE,
        center().x - radius(),
        center().y,
      );
      p5.line(
        center().x - outerRadius(),
        center().y - DEBUG2_LINE_SIZE,
        center().x - outerRadius(),
        center().y,
      );
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
    radius,
    outerRadius,
    debug: config.debug,
  };
}

/**
 * Type definition for the VerticeArc function's return value.
 */
export type VerticeArcType = ReturnType<typeof VerticeArc>;
