import {
  onMount,
  createEffect,
  createMemo,
  ParentProps,
  onCleanup,
  untrack,
} from "solid-js";
import { gsap } from "gsap";
import P5 from "p5";
import { useAnimationWrapperContext } from "~/components/animation/Canvas-Animation-Wrapper";
import { BrockmanProps } from "~/components/animation/Primitives/Arc-Props";
import VerticeArc2 from "~/components/animation/Primitives/Vertice-Arc-2";
import { getRandomFloat, hexToRgb, lerp } from "~/_util";
import { fromLandingPageState } from "~/landing-page-state";

export default function CanvasAnimationSwiss1(
  props: ParentProps & { hue?: number },
) {
  const { progress, active, height, velocity, width } =
    useAnimationWrapperContext();
  const [{ landingPageState }] = fromLandingPageState;

  const useHeight = createMemo(() => {
    return landingPageState.screenHeight;
  });

  const hasSize = createMemo(() => width() > 0 && useHeight() > 0);

  let p5Instance: P5;
  let animationParent: HTMLDivElement | undefined;
  const numPoints = 100; // resolution

  const style = getComputedStyle(document.body);
  const colorGray = style.getPropertyValue("--color-3a-gray");
  const colorPaper = style.getPropertyValue("--color-3a-paper");
  const colorGrayDarkest = style.getPropertyValue("--color-3a-gray-darkest");
  const colorGreen = style.getPropertyValue("--color-3a-green");
  const useOutlineColor = colorPaper;
  const useFillColor = colorPaper;

  const scaleProxy = {
    scale: 1,
  };

  const rotateProxy = {
    rotate: 0,
  };

  const radiusProxy = {
    radius: 0,
  };

  const theOutlineColorProxy = [
    ...hexToRgb(useOutlineColor),
    0,
  ] as BrockmanProps["outlineColor"];

  const theFillColorProxy = [
    ...hexToRgb(useFillColor),
    0,
  ] as BrockmanProps["outlineColor"];

  const arcSeg = 90 / 8;
  const golden = 1.618;
  const minArc = -arcSeg;
  const maxArc = arcSeg * 24;
  const arcRange = [5, 6, 7, 8, 10, 13, 18, 24];
  const dist = 3;
  const sizes = [10, 20, 40, 80, 160, 320, 640, 1280];
  const amountOfArcs = 6;
  const brockmanns: VerticeArc2[] = [];
  const brockmannProps: BrockmanProps[] = [];

  // let lastRad = startRad;
  const startRad = width() / 3.5;

  let origin = new P5.Vector(width() / 1.2, useHeight() / 2);

  createEffect(() => {
    const newRotate = -180 + progress() * 180;
    gsap.to(scaleProxy, {
      scale: 0.5 + progress() / 2,
      duration: 0.3,
    });
    gsap.to(rotateProxy, {
      rotate: newRotate,
      duration: 0.8,
    });
    gsap.to(radiusProxy, {
      radius: progress(),
      duration: 2,
    });

    const factorOutline = 1 - progress() * 2;
    const factorFill = -0.5 + progress() * 1.5;
    const rgbOutline = hexToRgb(useOutlineColor);
    const rgbFill = hexToRgb(useFillColor);
    const rgbBg = hexToRgb(colorGrayDarkest);
    const lerpedOutlineColor = rgbOutline.map((c, i) => {
      return lerp(rgbBg[i], c, Math.max(factorOutline, 1));
    });
    const lerpedFillColor = rgbFill.map((c, i) => {
      return lerp(rgbBg[i], c, Math.max(factorFill, 0));
    });
    gsap.to(theOutlineColorProxy, {
      0: lerpedOutlineColor[0],
      1: lerpedOutlineColor[1],
      2: lerpedOutlineColor[2],
      3: factorOutline * 255,
      // 3: 255,
      duration: 0.4,
    });

    const fadeOut = progress() === 0 ? 0 : Math.pow(2, 10 * progress() - 10);
    gsap.to(theFillColorProxy, {
      0: lerpedFillColor[0],
      1: lerpedFillColor[1],
      2: lerpedFillColor[2],
      3: 255 * (1 - fadeOut),
      duration: 0.2,
    });
  });

  createEffect(() => {
    const wTarget = width() / 3;
    const rest = wTarget - width() / 2;
    const newOriginPoint = new P5.Vector(
      Math.min(width() / 2 + rest * progress() * 4, wTarget),
      useHeight() / 4 + (useHeight() / 2) * progress(),
    );

    gsap.to(origin, {
      x: width() / 1.8,
      y: newOriginPoint.y,
      duration: 0.3,
    });
  });

  const getFreshBrockmanProps = (): BrockmanProps[] => {
    const _brockmannProps: BrockmanProps[] = [];
    let lastRad = startRad;
    for (let i = 0; i < amountOfArcs; i++) {
      const distHere = dist;
      const sizeHere = sizes[i % sizes.length];
      const newRad = lastRad + distHere + sizeHere;

      const startArc =
        minArc + Math.floor(getRandomFloat(1, 2 + (i % 4) * 3, 0)) * arcSeg;
      const endArc = Math.min(startArc + arcRange[i] * arcSeg, maxArc * 2);

      _brockmannProps[i] = {
        pos: origin,
        arcStart: startArc + 70,
        arcEnd: endArc + 70,
        radius: lastRad + distHere,
        thickness: sizeHere,
        numPoints: numPoints,
        outlineColor: [0, 0, 0, 0],
        fillColor: [0, 0, 0, 0],
      };
      lastRad = newRad;
    }
    return _brockmannProps;
  };

  createEffect(() => {
    if (hasSize()) {
      const p = getFreshBrockmanProps();
      for (let i = 0; i < p.length; i++) {
        brockmannProps[i] = p[i];
      }
    }

    if (brockmanns.length) {
      for (let i = 0; i < brockmanns.length; i++) {
        gsap.to(brockmanns[i].props, {
          pos: brockmannProps[i].pos,
          arcStart: brockmannProps[i].arcStart,
          arcEnd: brockmannProps[i].arcEnd,
          radius: brockmannProps[i].radius,
          thickness: brockmannProps[i].thickness,
          duration: 1.2,
        });
      }
    }
  });

  const createSketch = (ref: HTMLDivElement) => {
    const sketch = (_p5: P5) => {
      _p5.setup = () => {
        const canvas = _p5.createCanvas(width(), useHeight());
        _p5.angleMode(_p5.DEGREES);
        _p5.background(colorGrayDarkest);
        canvas.parent(ref);

        const p = getFreshBrockmanProps();
        for (let i = 0; i < amountOfArcs; i++) {
          brockmanns.push(new VerticeArc2(_p5, p[i]));
        }
      };
    };

    // The sketch draw method
    const draw = () => {
      p5.clear();

      let timer = p5.cos(p5.millis() / 100);

      const radMax = Math.max(
        ...brockmannProps.map((b) => b.radius + b.thickness),
      );

      const radMin = Math.min(...brockmannProps.map((b) => b.radius));

      brockmanns.forEach((b, i) => {
        b.scale = 1; // scaleProxy.scale;

        b.rotate = rotateProxy.rotate;
        b.straightness = Math.min(progress() * 2, 1);
        b.props.outlineColor = theOutlineColorProxy;
        b.props.fillColor = theFillColorProxy;

        // const radMin = Math.max(
        //   ...brockmanns.map((b) => b._props.radius * b._scale),
        // );
        b.outerMax = radMax;
        b.innerMin = radMin;
        b.update(origin);

        b.draw();
      });
    };

    const p5 = new P5(sketch, ref);

    createEffect(() => {
      p5.resizeCanvas(width(), useHeight());
    });

    p5.draw = draw;
    p5Instance = p5;
  };

  onMount(() => {
    if (animationParent) {
      createSketch(animationParent);
    }
  });

  onCleanup(() => {
    if (p5Instance) {
      p5Instance.remove();
    }
  });

  return (
    <div class="absolute inset-0 pointer-events-none ">
      <div
        class="sticky inset-0 pointer-events-none "
        ref={(el) => (animationParent = el)}
      ></div>
    </div>
  );
}
