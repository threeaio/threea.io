import {
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  ParentProps,
} from "solid-js";
import P5 from "p5";
import { useAnimationWrapperContext } from "~/components/animation/Canvas-Animation-Wrapper";
import { fromLandingPageState } from "~/landing-page-state";
import { AnimatedSceneProps } from "~/components/animation/animation-types";
import { fadeInout } from "~/components/animation/animation-drawables";
import {
  AnimationProxies,
  createAnimationProxies,
  useHeightMemo,
  useP5Effects,
  useSetCenterEffect,
} from "~/components/animation/animation-factories";

export default function CanvasAnimationRotatedCube(
  props: ParentProps & AnimatedSceneProps,
) {
  const { progress, width, height, active } = useAnimationWrapperContext();

  const [{ landingPageState }] = fromLandingPageState;

  const [animationParent, setAnimationParent] = createSignal<
    HTMLElement | undefined
  >();
  const useHeight = useHeightMemo(props, height, landingPageState.screenHeight);

  const useAnimateCommand = createMemo(() => {
    return props.animateCommand || null;
  });

  let p5Instance: P5 | undefined;

  const animationProxies: AnimationProxies = createAnimationProxies();

  useSetCenterEffect(props, width, useHeight, progress, animationProxies);

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
      p5.background(props.bgColor);

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
    onCleanup(() => p5Instance?.remove()); // Clean up P5 instance on unmount
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
