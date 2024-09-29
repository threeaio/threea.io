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
import { fromLandingPageState } from "~/landing-page-state";
import VerticeArc2, {
  VerticeArc2Type,
} from "~/components/animation/Primitives/Vertice-Arc-2";
import {
  Arc,
  generateArcs,
  getBrockmannArcSettings,
} from "~/components/animation/Brockmann-Arcs-Config";
import { COLORS_3A } from "~/components/animation/COLORS_3A";
import VerticeArc from "~/components/animation/Primitives/VerticeArc";
import { getRandomFloat } from "~/_util";

export default function CanvasAnimationSwiss2(
  props: ParentProps & { hue?: number },
) {
  const { progress, width } = useAnimationWrapperContext();
  const [{ landingPageState }] = fromLandingPageState;

  const useHeight = createMemo(() => landingPageState.screenHeight); // Memoized screen height
  const hasSize = createMemo(() => width() > 0 && useHeight() > 0); // Check if dimensions are valid
  const START_RAD = createMemo(() => width() / 4); // the smallest radius

  let animationParent: HTMLDivElement | undefined;
  let p5Instance: P5 | undefined;

  const COLOR_BG = COLORS_3A.GRAY_DARKEST;
  const COLOR_OUTLINE = COLORS_3A.PAPER;
  const COLOR_FILL = COLORS_3A.PAPER;

  // Proxy objects to allow GSAP-Animation
  const animationProxies = {
    scale: 1,
    rotate: 0,
    radius: 0,
    outlineColor: [0, 0, 0, 0] as BrockmanProps["outlineColor"],
    fillColor: [0, 0, 0, 0] as BrockmanProps["outlineColor"],
  };

  const brockmannArcSettings = getBrockmannArcSettings();

  const arcs: VerticeArc2Type[] = [];

  /**
   * P5 Starts here
   * ==============
   */

  /**
   * createSketch
   * @param ref
   */
  const createSketch = (ref: HTMLDivElement) => {
    const sketch = (_p5: P5) => {
      _p5.setup = () => {
        const canvas = _p5.createCanvas(width(), useHeight());
        _p5.angleMode(_p5.DEGREES);
        _p5.background(COLOR_BG);
        canvas.parent(ref);

        const arcProps: Arc[] = generateArcs(START_RAD(), brockmannArcSettings);

        for (let i = 0; i < brockmannArcSettings.amountOfArcs; i++) {
          const arc = VerticeArc2(_p5);
          const propForArc = arcProps[i];
          arc.setArcStartAngle(propForArc.startAngle);
          arc.setArcEndAngle(propForArc.endAngle);
          arc.setRadius(propForArc.radius);
          arc.setThickness(propForArc.thickness);
          arc.setCenter({ x: _p5.width / 2, y: _p5.height / 2 });
          arcs.push(arc);
        }
      };
    };

    const draw = () => {
      const p = progress();
      p5.clear();

      for (let i = 0; i < arcs.length; i++) {
        arcs[i].setRoundness(1 - p);
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
