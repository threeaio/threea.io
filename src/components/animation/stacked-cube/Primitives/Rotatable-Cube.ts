import { createMemo, createSignal } from "solid-js";
import P5 from "p5";
import { dvtx } from "~/components/animation/animation-drawables";
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

export type RotatableCubeConfig = {
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
  drawAs: "CUBE_ROTATE" | "COLORED" | "OTHER";
};

export default function RotatableCube(p5: P5, config: RotatableCubeConfig) {
  const [center, setCenter] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [dimension, setDimensions] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [progress, setProgress] = createSignal(0);

  const [AMOUNT_EDGES, setAmountEdges] = createSignal(config.amountEdges);
  const [AMOUNT_ITEMS, setAmountItems] = createSignal(config.amountItems);

  const USE_PADDING = createMemo(() => {
    return reMap(200, 700, config.padding / 5, config.padding, dimension().x);
  });
  const RAD_X = createMemo(() => dimension().x / 2 - USE_PADDING());
  const RAD_Y = createMemo(() => dimension().x / 22);

  const USE_HEIGHT = createMemo(() => {
    return (RAD_X() * 2) / Math.sqrt(2);
  });
  const SPACE_Y_LEFT = createMemo(() => {
    return (dimension().y - USE_HEIGHT()) / 2 - RAD_Y();
  });
  const HEIGHT_OF_ELEMENTS = createMemo(() => {
    return USE_HEIGHT() / AMOUNT_ITEMS();
  });

  const GAP = createMemo(() => {
    if (progress() < 0.25) {
      return reMap(0, 0.25, 0, 1, progress()) * config.maxGap;
    } else {
      return reMap(0.5, 0.75, 1, 0, progress()) * config.maxGap;
    }
  });

  /**
   * First Calculation Memo
   */
  const getPlanes = createMemo(() => {
    // Config!
    // Zw. 0 und 1 ! 1 = alle Gleichzeitig; 0 = Alle nacheinander !
    let OVERLAP = config.overlap;

    // eine halbe Umdrehung. Configurable ?
    const SPEED = ((4 / AMOUNT_EDGES()) * Math.PI) / 2;

    const FORM_CENTER = {
      x: center().x,
      y: RAD_Y(),
    };

    const CIRCLE = 2 * Math.PI;
    const CIRCLE_STEP = CIRCLE / AMOUNT_EDGES();

    let PROGRESS_ROTATION = 0;

    if (progress() <= 0.5) {
      PROGRESS_ROTATION = reMap(0.25, 0.5, 0, 1, progress());
      OVERLAP = config.overlap;
    } else {
      PROGRESS_ROTATION = reMap(0.75, 1, 0, 1, progress());
      OVERLAP = 1;
    }

    // calculate item-step-size and respect overlap
    const additionalSpace = (AMOUNT_ITEMS() - 1) * OVERLAP;
    const I_STEP_WITHOVERLAP = (1 + additionalSpace) / AMOUNT_ITEMS();

    return createArrayFromLength(AMOUNT_ITEMS())
      .map((i) => {
        let rand1 = 0;
        if (config.addRandom) {
          rand1 =
            p5.noise(CIRCLE_STEP * i) / 3 + p5.noise(CIRCLE_STEP * i) / 10;
        }

        const overlapForStepStart = i * -OVERLAP;

        const iFrom = clamp(0, 1, i * I_STEP_WITHOVERLAP + overlapForStepStart);
        const iTo = clamp(0, 1, iFrom + I_STEP_WITHOVERLAP);

        const mappedRotationProgress =
          reMap(iFrom, iTo, 0, 1, PROGRESS_ROTATION) + rand1;

        const actualRotation = mappedRotationProgress * SPEED;

        const offsetRadius = 0;
        const yPosition = HEIGHT_OF_ELEMENTS() * i;

        let USE_RAD_X = RAD_X();
        let USE_RAD_Y = RAD_Y();

        if (config.asGlobe) {
          const h = HEIGHT_OF_ELEMENTS() * (i + 0.5);
          const height = USE_HEIGHT();
          USE_RAD_X = getSliceLengthOnCircle(height / 2, h) / 2;
          USE_RAD_Y = USE_RAD_X / 2;
        }

        return createArrayFromLength(AMOUNT_EDGES())
          .map((i) => {
            return getPointOnEllipse(
              i * CIRCLE_STEP + actualRotation + offsetRadius,
              USE_RAD_X,
              USE_RAD_Y,
            );
          })
          .map((p) =>
            translate2D(
              p,
              FORM_CENTER.x,
              FORM_CENTER.y +
                yPosition +
                SPACE_Y_LEFT() +
                i * GAP() -
                ((AMOUNT_ITEMS() - 1) * GAP()) / 2,
            ),
          );
      })
      .reverse();
  });

  /**
   *
   */
  const getConnectors = createMemo(() => {
    return getPlanes().map((form) => {
      const sortedByX = [...form].sort((a, b) => a.x - b.x);
      const minY = Math.min(sortedByX[0].y, sortedByX.at(-1)!.y);

      const frontPoints = sortedByX.filter((p) => p.y >= minY);

      return createArrayFromLength(frontPoints.length - 1).map((i) => {
        return [
          frontPoints[i],
          frontPoints[i + 1],
          translate2D(frontPoints[i + 1], 0, HEIGHT_OF_ELEMENTS()),
          translate2D(frontPoints[i], 0, HEIGHT_OF_ELEMENTS()),
        ];
      });
    });
  });

  const draw = () => {
    if (config.drawAs === "CUBE_ROTATE") {
      drawAsStackedCubes(p5, getPlanes(), getConnectors(), config, GAP() > 0);
    } else if (config.drawAs === "COLORED") {
      drawAsColored(p5, getPlanes(), getConnectors(), config, center());
    } else {
      drawAsOther(p5, getPlanes(), getConnectors(), config, center());
    }
    // p5.line(0, dimension().y / 2, dimension().x, dimension().y / 2);
  };

  return {
    draw,
    setCenter,
    setDimensions,
    setProgress,
    setAmountEdges,
    setAmountItems,
  };
}

/**
 * Type definition for the VerticeArc function's return value.
 */
export type RotatableCubeType = ReturnType<typeof RotatableCube>;
