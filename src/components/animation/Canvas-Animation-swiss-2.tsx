import {
  createEffect,
  createMemo,
  onCleanup,
  onMount,
  ParentProps,
} from "solid-js";
import P5 from "p5";
import { useAnimationWrapperContext } from "~/components/animation/Canvas-Animation-Wrapper";
import { fromLandingPageState } from "~/landing-page-state";
import {
  Arc,
  generateArcs,
  BROCKMAN_ARC_SETTINGS,
} from "~/components/animation/Brockmann-Arcs-Config";
import VerticeArc, {
  VerticeArcType,
} from "~/components/animation/Primitives/Vertice-Arc";
import { remapT, ColorArray, hexToRgb, lerp, normalize } from "~/_util";
import { gsap } from "gsap";
import { COLORS_3A } from "~/_util-client-only";

export default function CanvasAnimationSwiss2(
  props: ParentProps & { hue?: number },
) {
  const { progress, width, height } = useAnimationWrapperContext();
  const [{ landingPageState }] = fromLandingPageState;

  const useHeight = createMemo(() => landingPageState.screenHeight); // Memoized screen height
  const hasSize = createMemo(() => width() > 0 && useHeight() > 0); // Check if dimensions are valid
  const START_RAD = createMemo(() => width() / 4); // the smallest radius

  let animationParent: HTMLDivElement | undefined;
  let p5Instance: P5 | undefined;

  const COLOR_BG = hexToRgb(COLORS_3A.GRAY_DARKEST);
  const COLOR_OUTLINE = hexToRgb(COLORS_3A.GREEN);
  const COLOR_FILL = hexToRgb(COLORS_3A.PAPER);

  // Proxy objects to allow GSAP-Animation
  const animationProxies = {
    scale: 1,
    rotate: 0,
    radius: 0,
    outlineColor: [0, 0, 0, 0] as ColorArray,
    fillColor: [0, 0, 0, 0] as ColorArray,
  };

  const center = { x: 0, y: 0 };

  const arcs: VerticeArcType[] = [];

  createEffect(() => {
    center.x = (width() / 3) * 2;
    center.y = useHeight() - (useHeight() / 1.5) * progress();
  });

  /**
   * P5 Starts here
   * ==============
   */
  const createSketch = (ref: HTMLDivElement) => {
    const sketch = (_p5: P5) => {
      _p5.setup = () => {
        const canvas = _p5.createCanvas(width(), useHeight());
        _p5.angleMode(_p5.DEGREES);
        canvas.parent(ref);

        const arcProps: Arc[] = generateArcs(
          START_RAD(),
          BROCKMAN_ARC_SETTINGS,
        );

        for (let i = 0; i < BROCKMAN_ARC_SETTINGS.amountOfArcs; i++) {
          const arc = VerticeArc(_p5, {
            debug: false,
            fill: { color: COLOR_FILL },
            stroke: false,
            randomizeStartPosition: true,
          });
          const propForArc = arcProps[i];
          arc.setArcStartAngle(propForArc.startAngle);
          arc.setArcEndAngle(propForArc.endAngle);
          arc.setRadius(propForArc.radius);
          arc.setThickness(propForArc.thickness);
          arc.setCenterX(_p5.width);
          arc.setCenterX(center.y);
          arc.setDimension({ x: _p5.width, y: _p5.height });
          arc.setStrokeColor(COLOR_OUTLINE);
          arcs.push(arc);
        }
      };
    };

    const draw = () => {
      const p = remapT(progress(), 0.3, 0.5);
      p5.background(COLOR_BG);
      for (let i = 0; i < arcs.length; i++) {
        arcs[i].setCenterX(center.x);
        arcs[i].setCenterY(center.y);
        // Math.min(p + (normalizedI / 2) * p, 1)
        arcs[i].setProgress(p);
        arcs[i].draw();
      }
    };

    const p5 = new P5(sketch, ref);
    createEffect(() => {
      p5.resizeCanvas(width(), useHeight());
    });
    p5.draw = draw;
    p5Instance = p5;
  };

  /**
   * On Mount
   */
  onMount(() => {
    createSketch(animationParent!); // Create sketch
    onCleanup(() => p5Instance?.remove()); // Clean up P5 instance on unmount
  });

  /**
   * Render
   */
  return (
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="sticky inset-0 pointer-events-none"
        ref={(el) => (animationParent = el)}
      ></div>
    </div>
  );
}
