import {
  Accessor,
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
} from "~/components/animation/Brockmann-Arcs-Config";
import VerticeArc, {
  VerticeArcConfig,
  VerticeArcType,
} from "~/components/animation/Primitives/Vertice-Arc";
import { ColorArray, getRandomFloat, remapT } from "~/_util";
import { gsap } from "gsap";

export default function ArcAnimationStep1(
  props: ParentProps & {
    bgColor: ColorArray;
    fadeInOut: boolean;
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
    animate?: boolean;
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
    return height() < landingPageState.screenHeight
      ? height()
      : landingPageState.screenHeight;
  }); // Memoized screen height

  const useAnimateCommand = createMemo(() => {
    console.log("props.animate", props.animateCommand);
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

        for (let i = 0; i < arcProps.length; i++) {
          const arc = VerticeArc(_p5, props.arcConfig);
          const propForArc = arcProps[i];
          arc.setDimension({ x: _p5.width, y: _p5.height });
          arc.setCenterX(_p5.width);
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
      props.draw(p5, progress(), arcs, animationProxies.center);

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

  const animateArcs = () => {
    for (let i = 0; i < arcs.length; i++) {
      // animate start
      const currentStartstart = { start: arcs[i].startOffset() };
      gsap.to(currentStartstart, {
        start: getRandomFloat(
          arcs[i].dimensions().x / -2,
          arcs[i].dimensions().x / 2,
          0,
        ),
        onUpdate: (...args) => {
          arcs[i].setStartOffset(currentStartstart.start);
        },
      });

      // animate angles
      const currentAngles = {
        startAngle: arcs[i].arcStartAngle(),
        endAngle: arcs[i].arcEndAngle(),
      };

      let { startAngle, endAngle } = getBrockmannAngles(props.arcSettings, i);

      gsap.to(currentAngles, {
        startAngle: startAngle,
        endAngle: endAngle,
        duration: 0.2,
        onUpdate: (...args) => {
          arcs[i].setArcStartAngle(currentAngles.startAngle);
          arcs[i].setArcEndAngle(currentAngles.endAngle);
        },
      });
    }
  };

  createEffect(
    on(useAnimateCommand, () => {
      if (useAnimateCommand()) {
        animateArcs();
      }
    }),
  );

  // init P5
  onMount(() => {
    createSketch(animationParent()!); // Create sketch
    onCleanup(() => p5Instance?.remove()); // Clean up P5 instance on unmount
    if (props.animate) {
      animateArcs();
    }
  });

  // trigger animation by pressing "a"
  // onMount(() => {
  //   if (props.arcConfig.randomizeStartPosition) {
  //     const handlerKey = (event: KeyboardEvent) => {
  //       if (event.key === "a" && active()) {
  //         animateArcs();
  //       }
  //     };
  //     const handlerPointer = (event: PointerEvent) => {
  //       if (active()) {
  //         animateArcs();
  //       }
  //     };
  //     document.addEventListener("keydown", handlerKey);
  //     if (animationParent()) {
  //       animationParent()!.addEventListener("pointerdown", handlerPointer);
  //     }
  //     onCleanup(() => {
  //       document.removeEventListener("keydown", handlerKey);
  //       document.removeEventListener("pointerdown", handlerPointer);
  //     });
  //   }
  // });

  /**
   * Render
   */
  return (
    <div class="sticky inset-0 max-h-full " ref={setAnimationParent}></div>
  );
}
