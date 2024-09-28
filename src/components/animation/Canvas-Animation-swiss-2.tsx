import {
  createEffect,
  createMemo,
  onCleanup,
  onMount,
  ParentProps,
} from "solid-js";
import { gsap } from "gsap";
import P5 from "p5";
import { useAnimationWrapperContext } from "~/components/animation/Canvas-Animation-Wrapper";
import { BrockmanProps } from "~/components/animation/Primitives/Arc-Props";
import VerticeArc2 from "~/components/animation/Primitives/Vertice-Arc-2";
import { getRandomFloat, hexToRgb, lerp } from "~/_util";
import { fromLandingPageState } from "~/landing-page-state";

type ArcSettings = {
  minArc: number;
  arcSeg: number;
  arcRange: number[];
  maxArc: number;
  dist: number;
  sizes: number[];
  amountOfArcs: number;
};

// Function to generate properties for Brockmann arcs based on parameters
function getBrockMannProps(
  startRad: number,
  origin: P5.Vector,
  numPoints: number,
  arcSettings: ArcSettings,
): BrockmanProps[] {
  const brockmannProps: BrockmanProps[] = [];
  let lastRad = startRad; // Initialize last radius to start radius
  const { dist, sizes, amountOfArcs, minArc, arcSeg, arcRange, maxArc } =
    arcSettings;

  // Loop to create arc properties based on the settings
  for (let i = 0; i < amountOfArcs; i++) {
    const distHere = dist;
    const sizeHere = sizes[i % sizes.length]; // Use sizes array cyclically
    const newRad = lastRad + distHere + sizeHere;

    // Calculate start and end arc angles
    const startArc =
      minArc + Math.floor(getRandomFloat(1, 2 + (i % 4) * 3, 0)) * arcSeg;
    const endArc = Math.min(startArc + arcRange[i] * arcSeg, maxArc * 2);

    // Push properties for the current arc
    brockmannProps[i] = {
      pos: origin,
      arcStart: startArc + 70, // Offset to start angle
      arcEnd: endArc + 70, // Offset to end angle
      radius: lastRad + distHere,
      thickness: sizeHere,
      numPoints,
      outlineColor: [0, 0, 0, 0], // Initial outline color (transparent)
      fillColor: [0, 0, 0, 0], // Initial fill color (transparent)
    };
    lastRad = newRad; // Update last radius for the next iteration
  }
  return brockmannProps; // Return generated properties
}

export default function CanvasAnimationSwiss1(
  props: ParentProps & { hue?: number },
) {
  const { progress, width } = useAnimationWrapperContext();
  const [{ landingPageState }] = fromLandingPageState;

  const useHeight = createMemo(() => landingPageState.screenHeight); // Memoized screen height
  const hasSize = createMemo(() => width() > 0 && useHeight() > 0); // Check if dimensions are valid

  let p5Instance: P5; // Store P5 instance
  let animationParent: HTMLDivElement | undefined; // Reference for the animation container
  const numPoints = 100; // Number of points for arc resolution

  const style = getComputedStyle(document.body);
  const colorGrayDarkest = style.getPropertyValue("--color-3a-gray-darkest");
  const colorPaper = style.getPropertyValue("--color-3a-paper");

  const useBGColor = colorGrayDarkest;
  const useOutlineColor = colorPaper;
  const useFillColor = colorPaper;

  // Proxy objects to allow GSAP-Animation
  const animationProxies = {
    scale: 1,
    rotate: 0,
    radius: 0,
    outlineColor: [0, 0, 0, 0] as BrockmanProps["outlineColor"],
    fillColor: [0, 0, 0, 0] as BrockmanProps["outlineColor"],
  };

  const arcSeg = 90 / 8;
  const arcSettings: ArcSettings = {
    maxArc: arcSeg * 24,
    minArc: -arcSeg,
    arcSeg,
    arcRange: [5, 6, 7, 8, 10, 13, 18, 24],
    dist: 3,
    sizes: [10, 20, 40, 80, 160, 320, 640, 1280],
    amountOfArcs: 7,
  };

  const brockmanns: VerticeArc2[] = [];
  const brockmannProps: BrockmanProps[] = [];
  const startRad = width() / 3.5;
  let origin = new P5.Vector(width() / 1.2, useHeight() / 2);

  const getFreshBrockmanProps = () =>
    getBrockMannProps(startRad, origin, numPoints, arcSettings);

  // Function to animate outline color based on progress
  const animateOutlineColor = () => {
    const factorOutline = 1 - progress() * 2;
    const rgbOutline = hexToRgb(useOutlineColor);
    const rgbBg = hexToRgb(useBGColor);
    const lerpedOutlineColor = rgbOutline.map((c, i) =>
      lerp(rgbBg[i], c, Math.max(factorOutline, 1)),
    );

    gsap.to(animationProxies.outlineColor, {
      0: lerpedOutlineColor[0],
      1: lerpedOutlineColor[1],
      2: lerpedOutlineColor[2],
      3: factorOutline * 255,
      duration: 0.4,
    });
  };

  // Function to animate fill color based on progress
  const animateFillColor = () => {
    const fadeOut = progress() === 0 ? 0 : Math.pow(2, 10 * progress() - 10);
    const rgbFill = hexToRgb(useFillColor);
    const rgbBg = hexToRgb(useBGColor);
    const lerpedFillColor = rgbFill.map((c, i) =>
      lerp(rgbBg[i], c, Math.max(-0.5 + progress() * 1.5, 0)),
    );

    gsap.to(animationProxies.fillColor, {
      0: lerpedFillColor[0],
      1: lerpedFillColor[1],
      2: lerpedFillColor[2],
      3: 255 * (1 - fadeOut),
      duration: 0.2,
    });
  };

  createEffect(() => {
    const newRotate = -180 + progress() * 180;
    gsap.to(animationProxies, { scale: 0.5 + progress() / 2, duration: 0.3 });
    gsap.to(animationProxies, { rotate: newRotate, duration: 0.8 });
    gsap.to(animationProxies, { radius: progress(), duration: 2 });
    animateOutlineColor();
    animateFillColor();
  });

  createEffect(() => {
    const wTarget = width() / 3;
    const rest = wTarget - width() / 2;
    const newOriginPoint = new P5.Vector(
      Math.min(width() / 2 + rest * progress() * 4, wTarget),
      useHeight() / 4 + (useHeight() / 2) * progress(),
    );
    gsap.to(origin, { x: width() / 1.8, y: newOriginPoint.y, duration: 0.3 });
  });

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
          delay: i / 10,
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
        for (let i = 0; i < arcSettings.amountOfArcs; i++) {
          brockmanns.push(new VerticeArc2(_p5, p[i]));
        }
      };
    };

    const draw = () => {
      const p = progress();

      p5.clear();
      const radMax = Math.max(
        ...brockmannProps.map((b) => b.radius + b.thickness),
      );
      const radMin = Math.min(...brockmannProps.map((b) => b.radius));

      brockmanns.forEach((b, i) => {
        b.rotate = animationProxies.rotate;
        b.straightness = Math.min(
          p * (1.8 + (0.2 * (i + 1)) / brockmanns.length),
          1,
        );
        b.props.outlineColor = animationProxies.outlineColor;
        b.props.fillColor = animationProxies.fillColor;
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

  // Mounting effect to create the sketch and clean up when unmounted
  onMount(() => {
    createSketch(animationParent!); // Create sketch
    onCleanup(() => p5Instance.remove()); // Clean up P5 instance on unmount
  });

  return (
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="sticky inset-0 pointer-events-none"
        ref={(el) => (animationParent = el)}
      ></div>
    </div>
  );
}
