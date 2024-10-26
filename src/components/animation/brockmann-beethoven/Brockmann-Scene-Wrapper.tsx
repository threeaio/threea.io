import {
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
import { useAnimationWrapperContext } from "~/components/animation/CanvasScrollAnimationWrapper";
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
import {
  ColorArray,
  getPointOnEllipse,
  getRandomFloat,
  Simple2D,
  translate2D,
} from "~/_util";
import { gsap } from "gsap";
import {
  AnimatedSceneProps,
  DrawCallbackProp,
  SetStartRadius,
} from "~/components/animation/animation-types";
import { fadeInout } from "~/components/animation/animation-drawables";
import {
  useHeightMemo,
  useP5Effects,
  useSetCenterMemo,
} from "~/components/animation/animation-factories";
import { COLORS_3A } from "~/_util-client-only";

export default function BrockmannSceneWrapper(
  props: ParentProps &
    AnimatedSceneProps &
    DrawCallbackProp<VerticeArcType> & {
      setStartRadius: SetStartRadius;
      arcSettings: (width: number, height: number) => ArcSettings;
      arcConfig: VerticeArcConfig;
    },
) {
  let p5Instance: P5 | undefined;

  const { progress, width, height, active } = useAnimationWrapperContext();

  const [{ landingPageState }] = fromLandingPageState;

  const [animationParent, setAnimationParent] = createSignal<
    HTMLElement | undefined
  >();
  const useHeight = useHeightMemo(props, height, landingPageState.screenHeight);

  const useAnimateCommand = createMemo(() => {
    return props.animateCommand || null;
  });

  const center = useSetCenterMemo(props, width, useHeight, progress);
  const dimensions = createMemo<Simple2D>(() => ({
    x: width(),
    y: useHeight(),
  }));

  const START_RAD = createMemo(() => props.setStartRadius(width(), height())); // the smallest radius

  const arcs: VerticeArcType[] = [];

  /**
   * Create Sketch
   */
  const createSketch = (ref: HTMLElement) => {
    const sketch = (_p5: P5) => {
      _p5.setup = () => {
        const canvas = _p5.createCanvas(width(), useHeight(), _p5.P2D);

        _p5.frameRate(60);
        _p5.angleMode(_p5.DEGREES);
        canvas.parent(ref);

        const arcProps: Arc[] = generateArcs(
          START_RAD(),
          props.arcSettings(width(), useHeight()),
        );

        for (let i = 0; i < arcProps.length; i++) {
          const arc = VerticeArc(_p5, props.arcConfig);
          const propForArc = arcProps[i];
          batch(() => {
            arc.setDimensions(dimensions());
            arc.setCenter(center());
            arc.setRadius(propForArc.radius);
            arc.setThickness(propForArc.thickness);
            arc.setArcStartAngle(propForArc.startAngle);
            arc.setArcEndAngle(propForArc.endAngle);
          });

          arcs.push(arc);
        }
      };
    };

    let frame = 0;
    let frameAmount = 0;

    const draw = () => {
      p5.background(props.bgColor);

      for (let i = 0; i < arcs.length; i++) {
        batch(() => {
          arcs[i].setDimensions(dimensions());
          arcs[i].setCenter(center());
        });
      }

      const lastArc = arcs.at(-1);
      if (lastArc) {
        if (lastArc.debug && lastArc.debug === 2) {
          drawAngles(p5, lastArc, center(), 1);
        }
      }

      const firstArc = arcs.at(0);
      if (firstArc) {
        if (firstArc.debug && firstArc.debug === 2) {
          drawAngles(p5, firstArc, center(), -1);
        }
      }

      props.draw(p5, arcs, progress(), center(), dimensions());

      if (props.fadeInOut) {
        fadeInout(p5, props.bgColor, progress());
      }

      // DEBUG FPS
      // p5.fill(COLORS_3A.GREEN);
      // frame += p5.frameRate();
      // frameAmount++;
      // p5.text(frame / frameAmount, 20, 20);
      // p5.fill(COLORS_3A.RED);
      // p5.text(p5.frameRate(), 220, 20);
    };

    const p5 = new P5(sketch, ref);

    useP5Effects(p5, width, useHeight, active);

    p5.draw = draw;
    p5Instance = p5;
  };

  /**
   * Animation
   */
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
      );
    }
  };

  onCleanup(() => {
    if (animationTimeoutRecursion) {
      clearTimeout(animationTimeoutRecursion);
    }
  });

  createEffect(
    on(useAnimateCommand, () => {
      if (useAnimateCommand() && active() && p5Instance) {
        animateArcs(p5Instance);
      }
    }),
  );

  /**
   * Init P5
   */
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

function drawAngles(
  p5: P5,
  arc: VerticeArcType,
  center: Simple2D,
  position: 1 | -1,
) {
  const DEBUG2_LINE_SIZE = 12;
  p5.strokeWeight(0.5);
  p5.noFill();
  p5.stroke(COLORS_3A.WHITE);
  // p5.circle(center().x, center().y, outerRadius() * 2);

  const SEG = (2 * Math.PI) / 32;
  for (let i = 0; i < 32; i++) {
    // if (i > 28 || i < 20) {
    const targetOuter = translate2D(
      getPointOnEllipse(
        i * SEG - Math.PI / 2,
        arc.outerRadius() + DEBUG2_LINE_SIZE * position,
      ),
      center.x,
      center.y,
    );
    const targetInner = translate2D(
      getPointOnEllipse(i * SEG - Math.PI / 2, arc.outerRadius()),
      center.x,
      center.y,
    );
    p5.line(targetInner.x, targetInner.y, targetOuter.x, targetOuter.y);
    // }
  }
}
