import {
  batch,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  ParentProps,
} from "solid-js";
import P5 from "p5";
import { useAnimationWrapperContext } from "~/components/animation/CanvasScrollAnimationWrapper";
import { fromLandingPageState } from "~/landing-page-state";
import {
  AnimatedSceneProps,
  DrawCallbackProp,
} from "~/components/animation/animation-types";
import { dvtx, fadeInout } from "~/components/animation/animation-drawables";
import {
  useHeightMemo,
  useP5Effects,
  useSetCenterMemo,
} from "~/components/animation/animation-factories";
import { Simple2D } from "~/_util";
import SimpleFunction, {
  SimpleFunctionConfig,
  SimpleFunctionType,
} from "~/components/animation/simple-functions/Simple-Function";
import { GraphConfig } from "~/_util-client-only/draw-graph";

// TODO: should be return type of function

export default function CanvasAnimationSimpleFunction(
  props: ParentProps &
    AnimatedSceneProps &
    DrawCallbackProp<SimpleFunctionType> & {
      simpleFunctionsConfig: SimpleFunctionConfig;
      setXRange: () => GraphConfig["xRange"];
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

  let simpleFunctions: SimpleFunctionType[] = [];

  /**
   * Create Sketch
   */
  const createSketch = (ref: HTMLElement) => {
    const sketch = (_p5: P5) => {
      _p5.setup = () => {
        const canvas = _p5.createCanvas(width(), useHeight(), _p5.P2D);
        _p5.smooth();
        _p5.angleMode(_p5.DEGREES);
        canvas.parent(ref);

        simpleFunctions.push(SimpleFunction(_p5, props.simpleFunctionsConfig));
      };
    };

    const draw = () => {
      p5.background(props.bgColor);

      for (let i = 0; i < simpleFunctions.length; i++) {
        batch(() => {
          simpleFunctions[i].setXRange(props.setXRange);
          simpleFunctions[i].setDimensions(dimensions());
          simpleFunctions[i].setCenter(center());
        });
      }

      props.draw(p5, simpleFunctions, progress(), center(), dimensions());

      if (props.fadeInOut) {
        fadeInout(p5, props.bgColor, progress());
      }
    };

    const p5 = new P5(sketch, ref);

    useP5Effects(p5, width, useHeight, active);

    p5.draw = draw;
    p5Instance = p5;
  };

  /**
   * Init P5
   */
  onMount(() => {
    createSketch(animationParent()!); // Create sketch
    onCleanup(() => {
      p5Instance?.remove();
    });
  });

  /**
   * Render
   */
  return (
    <div class="sticky inset-0 max-h-full " ref={setAnimationParent}></div>
  );
}
