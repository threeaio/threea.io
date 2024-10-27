import CanvasScrollAnimationWrapper from "~/components/animation/CanvasScrollAnimationWrapper";
import { clientOnly } from "@solidjs/start";
const ANIMATION = clientOnly(
  () =>
    import("~/components/animation/stacked-cube/Canvas-Animation-Rotated-Cube"),
);
import { COLORS_3A } from "~/_util-client-only";
import { batch, ParentProps } from "solid-js";
import { RotatableCubeConfig } from "~/components/animation/stacked-cube/Primitives/Rotatable-Cube";

/**
 * CLIENT-ONLY !
 */

export default function CubeAnimation2(
  props: {
    bgColor: keyof typeof COLORS_3A;
  } & ParentProps & { cubeConfig: Partial<RotatableCubeConfig> },
) {
  return (
    <CanvasScrollAnimationWrapper
      start={"clamp(top top+=90%)"}
      end={"clamp(bottom bottom-=90%)"}
      animation={ANIMATION({
        bgColor: COLORS_3A[props.bgColor],
        cubeConfig: {
          amountItems: 5,
          amountEdges: 4,
          padding: 240,
          maxGap: 100,
          addRandom: true,
          hideOutlinesWhenStable: false,
          drawAs: "COLORED",
          ...props.cubeConfig,
        },
        draw: (p5, cubes, progress, center, dims) => {
          const ms = p5.millis() / 8000;
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
