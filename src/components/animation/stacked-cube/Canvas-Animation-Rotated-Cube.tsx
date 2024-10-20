import {
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
  createArrayFromLength,
  createSimple2D,
  getPointOnEllipse,
  reMap,
  translate2D,
} from "~/_util";
import { COLORS_3A } from "~/_util-client-only";

export default function CanvasAnimationRotatedCube(
  props: ParentProps & AnimatedSceneProps,
) {
  const { progress, width, height, active } = useAnimationWrapperContext();

  const [{ landingPageState }] = fromLandingPageState;

  const [animationParent, setAnimationParent] = createSignal<
    HTMLElement | undefined
  >();

  const [p5InstanceSig, setP5InstanceSig] = createSignal<P5 | undefined>();

  // let p5Instance: P5 | undefined;
  //
  const useHeight = useHeightMemo(props, height, landingPageState.screenHeight);

  const useAnimateCommand = createMemo(() => {
    return props.animateCommand || null;
  });

  // const animationProxies: AnimationProxies = createAnimationProxies();

  const center = useSetCenterMemo(props, width, useHeight, progress);

  const [AMOUNT_ITEMS] = createSignal(10);

  const HEIGHT_OF_ELEMENTS = createMemo(() => {
    // TODO: reflect Y-radius
    return (useHeight() - width() / 6) / AMOUNT_ITEMS();
    // return reMap(0.2, 1, 3, 10, progress());
  });

  /**
   * First Calculation Memo
   */
  const getTopBottomOfForm = createMemo(() => {
    const RAD_X = width() / 4;
    const RAD_Y = width() / 12; // width() / (8 + progress() * 24);

    const c = {
      x: center().x,
      y: RAD_Y,
    };

    const SPEED = Math.PI / 2;

    const norm = 1 / AMOUNT_ITEMS();

    return createArrayFromLength(AMOUNT_ITEMS())
      .map((i) => {
        const rand1 = p5InstanceSig()
          ? p5InstanceSig()!.noise(norm * i) / 3 +
            p5InstanceSig()!.noise(norm * i * 10) / 10
          : 0;

        const rand2 = p5InstanceSig()
          ? p5InstanceSig()!.noise(norm * i * 3) / 5 +
            p5InstanceSig()!.noise(norm * i * 10) / 10
          : 0;

        const overlapBy = 1 / (AMOUNT_ITEMS() * 20);
        const iFrom = Math.max(i * norm - i * overlapBy, 0);
        const iTo = Math.min((i + 1) * norm + i * overlapBy, 1);
        const mapped = reMap(iFrom, iTo, 0, 1, progress());
        const myRotationProgress =
          mapped + rand1 * mapped + rand2 * (1 - mapped);

        const p = myRotationProgress * SPEED;

        const offsetRadius = 0;
        //(Math.PI / -4) * i * norm * myProgress * 0.4 + rand;
        const yPosition = HEIGHT_OF_ELEMENTS() * i;

        return [
          getPointOnEllipse(p + offsetRadius, RAD_X, RAD_Y),
          getPointOnEllipse(p + Math.PI / 2 + offsetRadius, RAD_X, RAD_Y),
          getPointOnEllipse(p + Math.PI + offsetRadius, RAD_X, RAD_Y),
          getPointOnEllipse(p + Math.PI * 1.5 + offsetRadius, RAD_X, RAD_Y),
        ].map((p) =>
          translate2D(p, c.x, c.y + yPosition - myRotationProgress * 20),
        );
      })
      .reverse();
  });

  const getConnectors = createMemo(() => {
    return getTopBottomOfForm().map((form) => {
      const minYTop = Math.min(...form.map((p) => p.y));
      const minXleft = Math.min(...form.map((p) => p.x));
      const minXRight = Math.max(...form.map((p) => p.x));
      const topRow = form
        .filter(
          (p) => !(p.y === minYTop && ![minXleft, minXRight].includes(p.x)),
        )
        .sort((a, b) => a.x - b.x);

      const ps = [
        createSimple2D(topRow[0].x, topRow[0].y),
        createSimple2D(topRow[1].x, topRow[1].y),
        createSimple2D(topRow[2].x, topRow[2].y),
      ];
      const GAP = 0;
      return [
        ...ps,
        translate2D(ps[2], 0, HEIGHT_OF_ELEMENTS() - GAP),
        translate2D(ps[1], 0, HEIGHT_OF_ELEMENTS() - GAP),
        translate2D(ps[0], 0, HEIGHT_OF_ELEMENTS() - GAP),
      ];
    });
  });

  /**
   * Create Sketch
   */
  const createSketch = (ref: HTMLElement) => {
    const sketch = (_p5: P5) => {
      _p5.setup = () => {
        const canvas = _p5.createCanvas(width(), useHeight(), _p5.P2D);
        // _p5.noSmooth();
        _p5.angleMode(_p5.DEGREES);
        canvas.parent(ref);
      };
    };

    const draw = () => {
      p5.clear();
      p5.background(props.bgColor);

      const planes = getTopBottomOfForm();
      const connectors = getConnectors();
      // const vex

      p5.push();
      p5.stroke(COLORS_3A.WHITE);
      // p5.noStroke();
      // p5.noFill();
      // p5.strokeWeight(0.5);
      p5.fill(COLORS_3A.PAPER);

      for (let i = 0; i < planes.length; i++) {
        for (let j = 0; j < connectors[i].length; j += 6) {
          p5.push();
          p5.fill(COLORS_3A.GRAY_DARKER);
          p5.beginShape();
          dvtx(p5, connectors[i][j]);
          dvtx(p5, connectors[i][j + 1]);
          dvtx(p5, connectors[i][j + 4]);
          dvtx(p5, connectors[i][j + 5]);
          p5.endShape(p5.CLOSE);

          p5.beginShape();
          dvtx(p5, connectors[i][j + 1]);
          dvtx(p5, connectors[i][j + 2]);
          dvtx(p5, connectors[i][j + 3]);
          dvtx(p5, connectors[i][j + 4]);
          p5.endShape(p5.CLOSE);
          p5.pop();

          // p5.push();
          // p5.noFill();
          // p5.stroke(COLORS_3A.GREEN);
          // p5.strokeWeight(1);
          // p5.beginShape();
          // dvtx(p5, connectors[i][j + 1]);
          // dvtx(p5, connectors[i][j + 4]);
          // p5.endShape(p5.CLOSE);
          // p5.pop();
        }

        p5.push();
        p5.fill(COLORS_3A.GRAY_DARKER);
        p5.beginShape();
        for (let j = 0; j < planes[i].length; j++) {
          dvtx(p5, planes[i][j]);
        }
        p5.endShape(p5.CLOSE);
        p5.pop();
      }

      p5.pop();

      if (props.fadeInOut) {
        fadeInout(p5, props.bgColor, progress());
      }
    };

    const p5 = new P5(sketch, ref);

    useP5Effects(p5, width, useHeight, active);

    p5.draw = draw;

    setP5InstanceSig(p5);
  };

  /**
   * Init P5
   */
  onMount(() => {
    createSketch(animationParent()!); // Create sketch
    onCleanup(() => {
      p5InstanceSig()?.remove();
      setP5InstanceSig(undefined);
    }); // Clean up P5 instance on unmount
  });

  /**
   * Render
   */
  return (
    <div class="sticky inset-0 max-h-full " ref={setAnimationParent}></div>
  );
}
