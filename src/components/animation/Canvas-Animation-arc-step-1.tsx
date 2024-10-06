import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  ParentProps,
} from "solid-js";
import P5 from "p5";
import { useAnimationWrapperContext } from "~/components/animation/Canvas-Animation-Wrapper";
import { fromLandingPageState } from "~/landing-page-state";
import {
  Arc,
  ArcSettings,
  generateArcs,
  getBrockmannArcSettings,
} from "~/components/animation/Brockmann-Arcs-Config";
import { COLORS_3A } from "~/components/animation/COLORS_3A";
import VerticeArc, {
  VerticeArcConfig,
  VerticeArcType,
} from "~/components/animation/Primitives/Vertice-Arc";
import { ColorArray, hexToRgb } from "~/_util";

export default function ArcAnimationStep1(
  props: ParentProps & {
    draw: (
      p5: P5,
      progress: number,
      arcs: VerticeArcType[],
      center: { x: number; y: number },
    ) => void;
    setCenter: (
      width: number,
      height: number,
      progress: number,
    ) => { x: number; y: number };
    getStartRadius: (width: number, height: number) => number;
    arcSettings: ArcSettings;
    arcConfig: VerticeArcConfig;
  },
) {
  const { progress, width, height } = useAnimationWrapperContext();
  const [{ landingPageState }] = fromLandingPageState;

  const [animationParent, setAnimationParent] = createSignal<
    HTMLElement | undefined
  >();
  const useHeight = createMemo(() => landingPageState.screenHeight); // Memoized screen height
  const hasSize = createMemo(() => width() > 0 && useHeight() > 0); // Check if dimensions are valid
  const START_RAD = createMemo(() => props.getStartRadius(width(), height())); // the smallest radius

  let p5Instance: P5 | undefined;

  const COLOR_BG = hexToRgb(COLORS_3A.GRAY_DARKEST);
  const COLOR_OUTLINE = hexToRgb(COLORS_3A.GREEN);
  const COLOR_FILL = hexToRgb(COLORS_3A.PAPER);

  // Proxy objects to allow GSAP-Animation
  const animationProxies = {
    scale: 1,
    rotate: 0,
    outlineColor: [0, 0, 0, 0] as ColorArray,
    fillColor: [0, 0, 0, 0] as ColorArray,
    center: { x: 0, y: 0 },
  };

  const arcs: VerticeArcType[] = [];

  createEffect(() => {
    const newCenter = props.setCenter(width(), useHeight(), progress());
    animationProxies.center.x = newCenter.x;
    animationProxies.center.y = newCenter.y;
  });

  /**
   * P5 Starts here
   * ==============
   */
  const createSketch = (ref: HTMLElement) => {
    const sketch = (_p5: P5) => {
      _p5.setup = () => {
        const canvas = _p5.createCanvas(width(), useHeight());
        _p5.angleMode(_p5.DEGREES);
        canvas.parent(ref);

        const arcProps: Arc[] = generateArcs(START_RAD(), props.arcSettings);

        for (let i = 0; i < props.arcSettings.amountOfArcs; i++) {
          const arc = VerticeArc(_p5, props.arcConfig);
          const propForArc = arcProps[i];
          arc.setArcStartAngle(propForArc.startAngle);
          arc.setArcEndAngle(propForArc.endAngle);
          arc.setRadius(propForArc.radius);
          arc.setThickness(propForArc.thickness);
          arc.setCenterX(_p5.width);
          arc.setCenterX(animationProxies.center.y);
          arc.setDimension({ x: _p5.width, y: _p5.height });
          arc.setStrokeColor(COLOR_OUTLINE);
          arcs.push(arc);
        }
      };
    };

    const draw = () => {
      p5.background(COLOR_BG);
      props.draw(p5, progress(), arcs, animationProxies.center);
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
    createSketch(animationParent()!); // Create sketch
    onCleanup(() => p5Instance?.remove()); // Clean up P5 instance on unmount
  });

  /**
   * Render
   */
  return (
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="sticky inset-0 pointer-events-none"
        ref={setAnimationParent}
      ></div>
    </div>
  );
}
