import CanvasScrollAnimationWrapper from "~/components/animation/CanvasScrollAnimationWrapper";
import { clientOnly } from "@solidjs/start";
const ANIMATION = clientOnly(
  () =>
    import("~/components/animation/stacked-cube/Canvas-Animation-Rotated-Cube"),
);
import { COLORS_3A } from "~/_util-client-only";
import { batch, ParentProps } from "solid-js";

/**
 * CLIENT-ONLY !
 */

export default function CubeAnimation1(
  props: {
    bgColor: keyof typeof COLORS_3A;
  } & ParentProps,
) {
  return (
    <CanvasScrollAnimationWrapper
      start={"clamp(top top+=90%)"}
      end={"clamp(bottom bottom-=90%)"}
      animation={ANIMATION({
        bgColor: COLORS_3A[props.bgColor],
        cubeConfig: {
          amountItems: 4,
          amountEdges: 4,
          maxGap: 130,
          padding: 260,
          addRandom: false,
          hideOutlinesWhenStable: true,
          drawAs: "CUBE_ROTATE",
        },
        draw: (p5, cubes, progress, center, dims) => {
          const ms = p5.millis() / 3000;
          // const p = (Math.sin(ms) + 1) / 2;
          const p = ms % 1;

          // const p = progress;

          for (let i = 0; i < cubes.length; i++) {
            batch(() => {
              cubes[i].setProgress(p);
            });
            cubes[i].draw();
          }
        },
        fadeInOut: false,
        setCenter(
          width: number,
          height: number,
          progress: number,
        ): { x: number; y: number } {
          return { x: width / 2, y: height / 2 };
        },
      })}
    />
  );
}
