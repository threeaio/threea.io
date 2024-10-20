import { AnimatedSceneProps } from "~/components/animation/animation-types";
import { Accessor, createEffect, createMemo } from "solid-js";
import { ColorArray } from "~/_util";
import P5 from "p5";

export const useHeightMemo = (
  props: AnimatedSceneProps,
  heightAccessor: Accessor<number>,
  screenHeight: number,
): Accessor<number> => {
  return createMemo(() => {
    if (props.forceContentHeight) {
      return heightAccessor();
    }
    return heightAccessor() < screenHeight ? heightAccessor() : screenHeight;
  });
};

export const useSetCenterMemo = (
  props: AnimatedSceneProps,
  width: Accessor<number>,
  height: Accessor<number>,
  progress: Accessor<number>,
) => {
  return createMemo(() => {
    const c = props.setCenter(width(), height(), progress());
    return c;
  });
};

/*
USELESS IN THIS FORM UNTIL IT IS USED IN DRAW!
 */
export const useSetCenterEffect = (
  props: AnimatedSceneProps,
  width: Accessor<number>,
  height: Accessor<number>,
  progress: Accessor<number>,
  animationProxies: AnimationProxies,
) => {
  createEffect(() => {
    const newCenter = props.setCenter(width(), height(), progress());
    animationProxies.center.x = newCenter.x;
    animationProxies.center.y = newCenter.y;
  });
};

export const useP5Effects = (
  p5: P5,
  width: Accessor<number>,
  height: Accessor<number>,
  animationActive: Accessor<boolean>,
) => {
  createEffect(() => {
    p5.resizeCanvas(width(), height());
  });

  createEffect(() => {
    if (animationActive() && !p5.isLooping()) {
      p5.loop();
    } else if (!animationActive() && p5.isLooping()) {
      p5.noLoop();
    }
  });
};

export const createAnimationProxies = () => ({
  scale: 1,
  rotate: 0,
  outlineColor: [0, 0, 0, 0] as ColorArray,
  fillColor: [0, 0, 0, 0] as ColorArray,
  center: { x: 0, y: 0 },
});

export type AnimationProxies = ReturnType<typeof createAnimationProxies>;
