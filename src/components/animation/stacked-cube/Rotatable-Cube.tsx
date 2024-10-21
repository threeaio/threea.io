import {
  createComputed,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  ParentProps,
} from "solid-js";
import P5 from "p5";
import { useAnimationWrapperContext } from "~/components/animation/CanvasScrollAnimationWrapper";
import { fromLandingPageState } from "~/landing-page-state";
import { AnimatedSceneProps } from "~/components/animation/animation-types";
import { dvtx, fadeInout } from "~/components/animation/animation-drawables";
import {
  AnimationProxies,
  createAnimationProxies,
  useHeightMemo,
  useP5Effects,
  useSetCenterEffect,
  useSetCenterMemo,
} from "~/components/animation/animation-factories";
import {
  clamp,
  ColorArray,
  createArrayFromLength,
  createSimple2D,
  getPointOnEllipse,
  reMap,
  translate2D,
} from "~/_util";
import { COLORS_3A } from "~/_util-client-only";

export type RotatableCubeConfig = {
  debug?: boolean;
  fill: { color: ColorArray } | false;
  stroke: { color: ColorArray } | false;
};

export default function RotatableCube(p5: P5, config: RotatableCubeConfig) {
  const [centerX, setCenterX] = createSignal<number>(0);
  const [centerY, setCenterY] = createSignal<number>(0);
  const [cvsWidth, setCvsWidth] = createSignal<number>(0);
  const [cvsHeight, setCvsHeight] = createSignal<number>(0);

  // const animationProxies: AnimationProxies = createAnimationProxies();

  const RAD_X = createMemo(() => cvsWidth() / 2);
  const RAD_Y = createMemo(() => cvsWidth() / 6);
  const [PADDING] = createSignal(100);
  const [AMOUNT_ITEMS] = createSignal(4);

  const HEIGHT_OF_ELEMENTS = createMemo(() => {
    return (cvsHeight() - 2 * PADDING() - 2 * RAD_Y()) / AMOUNT_ITEMS();
    // return reMap(0.2, 1, 3, 10, progress());
  });

  const [p5Millis, setp5Millis] = createSignal(0);

  /**
   * First Calculation Memo
   */
  const getTopBottomOfForm = createMemo(() => {
    const FORM_CENTER = {
      x: centerX(),
      y: RAD_Y(),
    };

    const SPEED = Math.PI / 2;
    const AMOUNT_EDGES = 4;
    const CIRCLE = 2 * Math.PI;
    const CIRCLE_STEP = CIRCLE / AMOUNT_EDGES;

    const I_STEP = 1 / AMOUNT_ITEMS();
    const PROGRESS = Math.cos(p5Millis() / 500) % Math.PI;

    return createArrayFromLength(AMOUNT_ITEMS())
      .map((i) => {
        // const rand1 = p5InstanceSig()
        //   ? p5InstanceSig()!.noise(norm * i) / 3 +
        //     p5InstanceSig()!.noise(norm * i * 10) / 10
        //   : 0;
        //
        // const rand2 = p5InstanceSig()
        //   ? p5InstanceSig()!.noise(norm * i * 3) / 5 +
        //     p5InstanceSig()!.noise(norm * i * 10) / 10
        //   : 0;
        const rand1 = 0;
        const rand2 = 0;

        const overlapBy = 1 / (AMOUNT_ITEMS() * 20);

        const iFrom = Math.max(i * I_STEP - i * overlapBy, 0);
        const iTo = Math.min((i + 1) * I_STEP + i * overlapBy, 1);

        const mapped = reMap(iFrom, iTo, 0, 1, PROGRESS);
        const myRotationProgress =
          mapped + rand1 * mapped + rand2 * (1 - mapped);

        const p = myRotationProgress * SPEED;

        const offsetRadius = 0;
        const yPosition = HEIGHT_OF_ELEMENTS() * i;

        return createArrayFromLength(AMOUNT_EDGES)
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
              FORM_CENTER.y + PADDING() + yPosition - myRotationProgress * 20,
            ),
          );
      })
      .reverse();
  });

  const getConnectors = createMemo(() => {
    return getTopBottomOfForm().map((form) => {
      const sortedByX = [...form].sort((a, b) => a.x - b.x);
      const minY = Math.min(sortedByX[0].y, sortedByX.at(-1)!.y);

      const frontPoints = sortedByX.filter((p) => p.y >= minY);

      const GAP = 0;

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
    setp5Millis(p5.millis());

    const planes = getTopBottomOfForm();
    const connectors = getConnectors();
    // const vex

    p5.push();
    p5.stroke(COLORS_3A.WHITE);
    p5.strokeWeight(0.5);
    // p5.noStroke();
    // p5.noFill();
    // p5.strokeWeight(0.5);
    // p5.fill(COLORS_3A.PAPER);

    for (let i = 0; i < planes.length; i++) {
      p5.push();
      p5.stroke(COLORS_3A.PAPER);
      p5.fill(COLORS_3A.GRAY_DARKEST);
      p5.beginShape();
      for (let j = 0; j < planes[i].length; j++) {
        dvtx(p5, planes[i][j]);
      }
      p5.endShape(p5.CLOSE);
      p5.pop();

      p5.push();
      p5.stroke(COLORS_3A.GRAY_DARKEST);
      p5.fill(COLORS_3A.PAPER);

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
}
