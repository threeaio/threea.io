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
import { fadeInout } from "~/components/animation/animation-drawables";
import {
  useHeightMemo,
  useP5Effects,
  useSetCenterMemo,
} from "~/components/animation/animation-factories";
import { Simple2D } from "~/_util";
import {
  OrganicGridType,
  OrganicGridConfig,
  OrganicGrid,
} from "./Oscillator-Grid";

export default function CanvasAnimationOscillator(
  props: ParentProps &
    AnimatedSceneProps &
    DrawCallbackProp<OrganicGridType> & {
      gridConfigs: OrganicGridConfig[];
    },
) {
  let p5Instance: P5 | undefined;

  const { progress, width, height, active } = useAnimationWrapperContext();

  const [{ landingPageState }] = fromLandingPageState;

  const [animationParent, setAnimationParent] = createSignal<
    HTMLElement | undefined
  >();

  const useHeight = useHeightMemo(props, height, landingPageState.screenHeight);

  const center = useSetCenterMemo(props, width, useHeight, progress);
  const dimensions = createMemo<Simple2D>(() => ({
    x: width(),
    y: useHeight(),
  }));

  const grids: OrganicGridType[] = [];

  const createSketch = (ref: HTMLElement) => {
    const sketch = (_p5: P5) => {
      _p5.setup = () => {
        const canvas = _p5.createCanvas(width(), useHeight(), _p5.P2D);
        _p5.smooth();
        canvas.parent(ref);

        // Create grid instances
        props.gridConfigs.forEach((config) => {
          const grid = OrganicGrid(_p5, config);
          batch(() => {
            grid.setDimensions(dimensions());
            grid.setCenter(center());
          });
          grids.push(grid);
        });
      };
    };

    const draw = () => {
      p5.background(props.bgColor);

      const currentTime = p5.millis();

      grids.forEach((grid) => {
        batch(() => {
          grid.setDimensions(dimensions());
          grid.setCenter(center());
        });
        props.draw(p5, grids, progress(), center(), dimensions());
        grid.draw();
      });

      if (props.fadeInOut) {
        fadeInout(p5, props.bgColor, progress());
      }
    };

    const p5 = new P5(sketch, ref);
    useP5Effects(p5, width, useHeight, active);
    p5.draw = draw;
    p5Instance = p5;
  };

  onMount(() => {
    createSketch(animationParent()!);
    onCleanup(() => p5Instance?.remove());
  });

  return <div class="sticky inset-0 max-h-full" ref={setAnimationParent}></div>;
}
