import { createMemo, createSignal } from "solid-js";
import P5 from "p5";
import {
  getSliceLengthOnCircle,
  clamp,
  createArrayFromLength,
  getPointOnEllipse,
  reMap,
  Simple2D,
  translate2D,
} from "~/_util";
import { COLORS_3A } from "~/_util-client-only";
import { drawAsStackedCubes } from "~/components/animation/stacked-cube/Primitives/Draw-As-Stacked-Cubes";
import { drawAsOther } from "~/components/animation/stacked-cube/Primitives/Draw-As-Other";
import { drawAsColored } from "~/components/animation/stacked-cube/Primitives/Draw-As-Colored";

// Constants
const ANIMATION_PHASES = {
  GAP_INCREASE: { start: 0, end: 0.25 },
  ROTATION_FIRST: { start: 0.25, end: 0.5 },
  GAP_DECREASE: { start: 0.5, end: 0.75 },
  ROTATION_SECOND: { start: 0.75, end: 1 },
} as const;

const CIRCLE = 2 * Math.PI;
const NOISE_FACTORS = {
  PRIMARY: 1 / 3,
  SECONDARY: 1 / 10,
};

// Types
export type DrawMode = "CUBE_ROTATE" | "COLORED" | "OTHER";

export interface RotatableCubeConfig {
  debug?: boolean;
  amountEdges: number;
  amountItems: number;
  maxGap: number;
  padding: number;
  overlap: number;
  addRandom: boolean;
  hideOutlinesWhenStable: boolean;
  asGlobe: boolean;
  outlineColor: keyof typeof COLORS_3A;
  fillColor: keyof typeof COLORS_3A;
  drawAs: DrawMode;
}

export default function RotatableCube(p5: P5, config: RotatableCubeConfig) {
  // State
  const [center, setCenter] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [dimension, setDimensions] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [progress, setProgress] = createSignal(0);
  const [amountEdges, setAmountEdges] = createSignal(config.amountEdges);
  const [amountItems, setAmountItems] = createSignal(config.amountItems);

  // Layout calculations
  const dimensions = createMemo(() => {
    const padding = reMap(
      200,
      700,
      config.padding / 5,
      config.padding,
      dimension().x,
    );
    const radX = dimension().x / 2 - padding;
    const radY = dimension().x / 22;
    const height = (radX * 2) / Math.sqrt(2);

    return {
      padding,
      radX,
      radY,
      height,
      elementHeight: height / amountItems(),
      spaceYLeft: (dimension().y - height) / 2 - radY,
    };
  });

  // Gap calculation
  const gap = createMemo(() => {
    const { GAP_INCREASE, GAP_DECREASE } = ANIMATION_PHASES;
    const prog = progress();

    if (prog <= GAP_INCREASE.end) {
      return reMap(0, GAP_INCREASE.end, 0, 1, prog) * config.maxGap;
    }
    return (
      reMap(GAP_DECREASE.start, GAP_DECREASE.end, 1, 0, prog) * config.maxGap
    );
  });

  const getPlanes = createMemo(() => {
    const { ROTATION_FIRST, ROTATION_SECOND } = ANIMATION_PHASES;
    const dims = dimensions();
    const currentGap = gap();
    let overlap = config.overlap;

    // Calculate rotation properties
    const CIRCLE_STEP = CIRCLE / amountEdges();
    const SPEED = ((4 / amountEdges()) * Math.PI) / 2;

    // Calculate rotation progress based on animation phase
    let rotationProgress = 0;
    if (progress() <= ROTATION_FIRST.end) {
      rotationProgress = reMap(
        ROTATION_FIRST.start,
        ROTATION_FIRST.end,
        0,
        1,
        progress(),
      );
    } else {
      rotationProgress = reMap(
        ROTATION_SECOND.start,
        ROTATION_SECOND.end,
        0,
        1,
        progress(),
      );
      overlap = 1;
    }

    // Calculate step size with overlap
    const additionalSpace = (amountItems() - 1) * overlap;
    const STEP_SIZE = (1 + additionalSpace) / amountItems();

    // Generate all layers
    return createArrayFromLength(amountItems())
      .map((i) => {
        // Calculate progression for this layer
        const overlapOffset = i * -overlap;
        const layerFrom = clamp(0, 1, i * STEP_SIZE + overlapOffset);
        const layerTo = clamp(0, 1, layerFrom + STEP_SIZE);

        // Add random offset if enabled
        let randomOffset = 0;
        if (config.addRandom) {
          randomOffset =
            p5.noise(CIRCLE_STEP * i) * NOISE_FACTORS.PRIMARY +
            p5.noise(CIRCLE_STEP * i) * NOISE_FACTORS.SECONDARY;
        }

        // Calculate rotation and position
        const mappedRotation =
          reMap(layerFrom, layerTo, 0, 1, rotationProgress) + randomOffset;
        const actualRotation = mappedRotation * SPEED;
        const yPosition = dims.elementHeight * i;

        // Calculate radii (handle globe transformation)
        let useRadX = dims.radX;
        let useRadY = dims.radY;

        if (config.asGlobe) {
          const h = dims.elementHeight * (i + 0.5);
          useRadX = getSliceLengthOnCircle(dims.height / 2, h) / 2;
          useRadY = useRadX / 2;
        }

        // Generate points for this layer
        return createArrayFromLength(amountEdges()).map((j) => {
          // Calculate point on ellipse
          const point = getPointOnEllipse(
            j * CIRCLE_STEP + actualRotation,
            useRadX,
            useRadY,
          );

          // Translate point to final position
          return translate2D(
            point,
            center().x,
            dims.radY +
              yPosition +
              dims.spaceYLeft +
              i * currentGap -
              ((amountItems() - 1) * currentGap) / 2,
          );
        });
      })
      .reverse();
  });

  const getConnectors = createMemo(() => {
    const elementHeight = dimensions().elementHeight;

    return getPlanes().map((layer) => {
      // Sort points and find front-facing ones
      const sortedByX = [...layer].sort((a, b) => a.x - b.x);
      const minY = Math.min(sortedByX[0].y, sortedByX.at(-1)!.y);
      const frontPoints = sortedByX.filter((p) => p.y >= minY);

      // Create connector faces
      return createArrayFromLength(frontPoints.length - 1).map((i) => [
        frontPoints[i], // Current point
        frontPoints[i + 1], // Next point
        translate2D(frontPoints[i + 1], 0, elementHeight), // Next point raised
        translate2D(frontPoints[i], 0, elementHeight), // Current point raised
      ]);
    });
  });

  // Drawing function selector
  const drawFunctions: Record<DrawMode, () => void> = {
    CUBE_ROTATE: () =>
      drawAsStackedCubes(p5, getPlanes(), getConnectors(), config, gap() > 0),
    COLORED: () =>
      drawAsColored(p5, getPlanes(), getConnectors(), config, center()),
    OTHER: () =>
      drawAsOther(p5, getPlanes(), getConnectors(), config, center()),
  };

  // Drawing function
  const draw = () => {
    if (config.debug) {
      p5.push();
      p5.stroke(255, 0, 0);
      p5.text(`FPS: ${Math.round(p5.frameRate())}`, 20, 20);
      p5.pop();
    }
    drawFunctions[config.drawAs]();
  };

  return {
    draw,
    setCenter,
    setDimensions,
    setProgress,
    setAmountEdges,
    setAmountItems,
    // Expose these for external use if needed
    getPlanes,
    getConnectors,
    dimensions,
  };
}

export type RotatableCubeType = ReturnType<typeof RotatableCube>;
