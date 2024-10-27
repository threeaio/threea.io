import { AnimatedSceneProps } from "~/components/animation/animation-types";
import { Accessor, createEffect, createMemo } from "solid-js";
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
    return props.setCenter(width(), height(), progress());
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
