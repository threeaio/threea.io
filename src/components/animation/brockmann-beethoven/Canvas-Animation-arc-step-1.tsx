import {
  Accessor,
  batch,
  createEffect,
  createMemo,
  createSignal,
  on,
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
  getBrockmannAngles,
} from "~/components/animation/brockmann-beethoven/Brockmann-Arcs-Config";
import VerticeArc, {
  VerticeArcConfig,
  VerticeArcType,
} from "~/components/animation/brockmann-beethoven/Primitives/Vertice-Arc";
import { ColorArray, getRandomFloat, remapT } from "~/_util";
import { gsap } from "gsap";

export default function ArcAnimationStep1(
  props: ParentProps & {
    bgColor: ColorArray;
    fadeInOut: boolean;
    forceContentHeight?: true;
    draw: (
      p5: P5,
      progress: number,
      arcs: VerticeArcType[],
      center: { x: number; y: number },
      dims: { x: number; y: number },
    ) => void;
    setCenter: (
      width: number,
      height: number,
      progress: number,
    ) => { x: number; y: number };
    getStartRadius: (width: number, height: number) => number;
    arcSettings: (width: number, height: number) => ArcSettings;
    arcConfig: VerticeArcConfig;
    animate?: boolean;
    animateBpm?: number;
    animateOffsetMs?: number;
    animateCommand?:
      | PointerEvent
      | MouseEvent
      | KeyboardEvent
      | number
      | undefined;
  },
) {
  const { progress, width, height, active } = useAnimationWrapperContext();
  const [{ landingPageState }] = fromLandingPageState;

  const [animationParent, setAnimationParent] = createSignal<
    HTMLElement | undefined
  >();
  const useHeight = createMemo(() => {
    if (props.forceContentHeight) {
      return height();
    }
    return height() < landingPageState.screenHeight
      ? height()
      : landingPageState.screenHeight;
  }); // Memoized screen height

  const useAnimateCommand = createMemo(() => {
    return props.animateCommand || null;
  });

  const hasSize = createMemo(() => width() > 0 && useHeight() > 0); // Check if dimensions are valid
  const START_RAD = createMemo(() => props.getStartRadius(width(), height())); // the smallest radius

  let p5Instance: P5 | undefined;

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
    console.log("newCenter", newCenter);
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
        const canvas = _p5.createCanvas(width(), useHeight(), _p5.P2D);
        // _p5.noSmooth();
        _p5.angleMode(_p5.DEGREES);
        canvas.parent(ref);

        const arcProps: Arc[] = generateArcs(
          START_RAD(),
          props.arcSettings(width(), useHeight()),
        );

        for (let i = 0; i < arcProps.length; i++) {
          const arc = VerticeArc(_p5, props.arcConfig);
          const propForArc = arcProps[i];
          arc.setCvsWidth(_p5.width);
          arc.setCvsHeight(_p5.height);
          arc.setCenterX(animationProxies.center.x);
          arc.setCenterY(animationProxies.center.y);
          arc.setRadius(propForArc.radius);
          arc.setThickness(propForArc.thickness);
          arc.setArcStartAngle(propForArc.startAngle);
          arc.setArcEndAngle(propForArc.endAngle);

          arcs.push(arc);
        }
      };
    };

    const draw = () => {
      p5.background(props.bgColor);

      for (let i = 0; i < arcs.length; i++) {
        arcs[i].setCvsWidth(p5.width);
        arcs[i].setCvsHeight(p5.height);
        arcs[i].setCenterX(animationProxies.center.x);
        arcs[i].setCenterY(animationProxies.center.y);
      }

      props.draw(p5, progress(), arcs, animationProxies.center, {
        x: p5.width,
        y: p5.height,
      });

      if (props.fadeInOut) {
        p5.push();
        p5.noStroke();
        p5.fill(
          props.bgColor[0],
          props.bgColor[1],
          props.bgColor[2],
          (1 - remapT(progress(), 0, 0.1)) * 255,
        );
        p5.rect(0, 0, p5.width, p5.height);
        p5.pop();

        p5.push();
        p5.noStroke();
        p5.fill(
          props.bgColor[0],
          props.bgColor[1],
          props.bgColor[2],
          remapT(progress(), 0.9, 1) * 255,
        );
        p5.rect(0, 0, p5.width, p5.height);
        p5.pop();
      }
    };

    const p5 = new P5(sketch, ref);

    createEffect(() => {
      p5.resizeCanvas(width(), useHeight());
    });

    createEffect(() => {
      if (active() && !p5.isLooping()) {
        p5.loop();
      } else if (!active() && p5.isLooping()) {
        p5.noLoop();
      }
    });
    p5.draw = draw;
    p5Instance = p5;
  };

  /**
   * On Mount
   */

  // animate Arcs
  let timeoutsHere: Array<string | number | NodeJS.Timeout | undefined> = [];
  const animateArcs = (p5: P5) => {
    timeoutsHere.forEach(clearTimeout);
    timeoutsHere = [];
    for (let i = 0; i < arcs.length; i++) {
      const animatePartial = {
        start: arcs[i].startOffset(),
        startAngle: arcs[i].arcStartAngle(),
        endAngle: arcs[i].arcEndAngle(),
      };

      let { startAngle, endAngle } = getBrockmannAngles(
        props.arcSettings(width(), useHeight()),
        i,
      );

      timeoutsHere.push(
        setTimeout(() => {
          gsap.to(animatePartial, {
            start: getRandomFloat(p5.width / -2, p5.width / 2, 0),
            startAngle: startAngle,
            endAngle: endAngle,
            ease: "sine",
            duration: 0.5,
            onUpdate: (...args) => {
              batch(() => {
                arcs[i].setStartOffset(animatePartial.start);
                arcs[i].setArcStartAngle(animatePartial.startAngle);
                arcs[i].setArcEndAngle(animatePartial.endAngle);
              });
            },
          });
        }, i * 30),
      );
    }
  };

  let animationTimeoutRecursion: string | number | NodeJS.Timeout | undefined;

  const recursiveAnimate = (p5: P5) => {
    if (props.animateBpm && active()) {
      animateArcs(p5);
    }

    if (props.animateBpm && p5Instance) {
      const interval = 1000 / (props.animateBpm! / 60);
      const animationTimeoutRecursion = setTimeout(
        () => recursiveAnimate(p5Instance!),
        interval,
      ); //500ms => 120bpm
    }
  };

  onCleanup(() => {
    if (animationTimeoutRecursion) {
      clearTimeout(animationTimeoutRecursion);
    }
  });

  createEffect(
    on(useAnimateCommand, () => {
      // if (useAnimateCommand() && active()) {
      //   animateArcs();
      // }
    }),
  );

  // init P5
  onMount(() => {
    createSketch(animationParent()!); // Create sketch
    onCleanup(() => p5Instance?.remove()); // Clean up P5 instance on unmount
    if (props.animate && p5Instance) {
      animateArcs(p5Instance);
    }
    if (props.animateBpm && p5Instance) {
      setTimeout(() => {
        recursiveAnimate(p5Instance!);
      }, props.animateOffsetMs || 0);
    }
  });

  /**
   * Render
   */
  return (
    <div
      class="relative md:sticky inset-0 max-h-full "
      ref={setAnimationParent}
    ></div>
  );
}
