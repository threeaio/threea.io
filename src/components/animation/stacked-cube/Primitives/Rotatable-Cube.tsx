import { createMemo, createSignal } from "solid-js";
import P5 from "p5";
import { dvtx } from "~/components/animation/animation-drawables";
import {
  clamp,
  createArrayFromLength,
  getPointOnEllipse,
  reMap,
  Simple2D,
  translate2D,
} from "~/_util";
import { COLORS_3A } from "~/_util-client-only";

export type RotatableCubeConfig = {
  debug?: boolean;
  amountEdges: number;
  amountItems: number;
};

export default function RotatableCube(p5: P5, config: RotatableCubeConfig) {
  const [center, setCenter] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [dimension, setDimensions] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [progress, setProgress] = createSignal(0);
  // const animationProxies: AnimationProxies = createAnimationProxies();

  const [DISTANCE_OF_MOVED_ITEMS, setDistanceOfMovedItems] = createSignal(100);
  const [AMOUNT_EDGES, setAmountEdges] = createSignal(config.amountEdges);
  const [AMOUNT_ITEMS, setAmountItems] = createSignal(config.amountItems);
  const [PADDING, setPadding] = createSignal(120);

  const RAD_X = createMemo(() => dimension().x / 2 - PADDING());
  const RAD_Y = createMemo(() => dimension().x / 10);

  const HEIGHT_OF_ELEMENTS = createMemo(() => {
    return (
      (dimension().y -
        DISTANCE_OF_MOVED_ITEMS() -
        2 * PADDING() -
        2 * RAD_Y()) /
      AMOUNT_ITEMS()
    );
  });

  /**
   * First Calculation Memo
   */
  const getTopBottomOfForm = createMemo(() => {
    // Config
    // Zw. 0 und 1 ! 1 = alle Gleichzeitig; 0 = Alle nacheinander !
    const OVERLAP = 0.2;

    // eine halbe Umdrehung. Configurable ?
    const SPEED = Math.PI / 2;

    // private
    const FORM_CENTER = {
      x: center().x,
      y: RAD_Y(),
    };
    const CIRCLE = 2 * Math.PI;
    const CIRCLE_STEP = CIRCLE / AMOUNT_EDGES();
    const PROGRESS = progress();

    // calculate item size and respect overlap
    const additionalSpace = (AMOUNT_ITEMS() - 1) * OVERLAP;
    const I_STEP_WITHOVERLAP = (1 + additionalSpace) / AMOUNT_ITEMS();

    return createArrayFromLength(AMOUNT_ITEMS())
      .map((i) => {
        // const rand1 = p5.noise(I_STEP * i) / 6 + p5.noise(I_STEP * i) / 40;
        // const rand2 = p5.noise(I_STEP * i * 5) / 5;
        const rand1 = 0;
        const rand2 = 0;

        const overlapForStepStart = i * -OVERLAP;

        const iFrom = clamp(0, 1, i * I_STEP_WITHOVERLAP + overlapForStepStart);
        const iTo = clamp(0, 1, iFrom + I_STEP_WITHOVERLAP);

        //
        const myRotationProgress = reMap(iFrom, iTo, 0, 1, PROGRESS);
        // const myRotationProgress =
        //   mapped + rand1 * mapped + rand2 * (1 - mapped);

        const p = myRotationProgress * SPEED;

        const offsetRadius = 0;
        const yPosition = HEIGHT_OF_ELEMENTS() * i + DISTANCE_OF_MOVED_ITEMS();

        return createArrayFromLength(AMOUNT_EDGES())
          .map((i) => {
            return getPointOnEllipse(
              i * CIRCLE_STEP + p + offsetRadius,
              RAD_X(),
              RAD_Y(),
            );
          })
          .map((p) =>
            translate2D(
              p,
              FORM_CENTER.x,
              FORM_CENTER.y +
                PADDING() +
                yPosition -
                myRotationProgress * DISTANCE_OF_MOVED_ITEMS(),
            ),
          );
      })
      .reverse();
  });

  const getConnectors = createMemo(() => {
    // TODO: to Config
    const GAP = 0;

    return getTopBottomOfForm().map((form) => {
      const sortedByX = [...form].sort((a, b) => a.x - b.x);
      const minY = Math.min(sortedByX[0].y, sortedByX.at(-1)!.y);

      const frontPoints = sortedByX.filter((p) => p.y >= minY);

      return createArrayFromLength(frontPoints.length - 1).map((i) => {
        return [
          frontPoints[i],
          frontPoints[i + 1],
          translate2D(frontPoints[i + 1], 0, HEIGHT_OF_ELEMENTS() - GAP),
          translate2D(frontPoints[i], 0, HEIGHT_OF_ELEMENTS() - GAP),
        ];
      });
    });
  });

  const draw = () => {
    const planes = getTopBottomOfForm();
    const connectors = getConnectors();

    // const vex

    p5.push();
    p5.stroke(COLORS_3A.WHITE);
    p5.strokeWeight(1);

    for (let i = 0; i < planes.length; i++) {
      p5.push();
      p5.fill(COLORS_3A.GRAY);
      p5.stroke(COLORS_3A.GRAY);
      p5.beginShape();
      for (let j = 0; j < planes[i].length; j++) {
        dvtx(p5, planes[i][j]);
      }
      p5.endShape(p5.CLOSE);
      p5.pop();

      p5.push();
      p5.fill(COLORS_3A.PAPER);
      p5.stroke(COLORS_3A.GRAY);

      for (let j = 0; j < connectors[i].length; j++) {
        p5.beginShape();
        dvtx(p5, connectors[i][j][0]);
        dvtx(p5, connectors[i][j][1]);
        dvtx(p5, connectors[i][j][2]);
        dvtx(p5, connectors[i][j][3]);
        p5.endShape(p5.CLOSE);
      }

      p5.pop();
    }

    p5.pop();
  };

  return {
    draw,
    setCenter,
    setDimensions,
    setProgress,
    setAmountEdges,
    setAmountItems,
    setPadding,
    setDistanceOfMovedItems,
  };
}

/**
 * Type definition for the VerticeArc function's return value.
 */
export type RotatableCubeType = ReturnType<typeof RotatableCube>;
