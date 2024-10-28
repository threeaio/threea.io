import CanvasScrollAnimationWrapper from "~/components/animation/CanvasScrollAnimationWrapper";
import { clientOnly } from "@solidjs/start";
const ANIMATION = clientOnly(
  () =>
    import("~/components/animation/stacked-cube/Canvas-Animation-Rotated-Cube"),
);
import { COLORS_3A } from "~/_util-client-only";
import { batch, ParentProps } from "solid-js";
import { RotatableCubeConfig } from "~/components/animation/stacked-cube/Primitives/Rotatable-Cube";
import { smoothStep } from "~/_util";

/**
 * CLIENT-ONLY !
 */

export default function CubeAnimation3(
  props: {
    bgColor: keyof typeof COLORS_3A;
  } & { cubeConfig: Partial<RotatableCubeConfig>; animateBpm: number },
) {
  return (
    <CanvasScrollAnimationWrapper
      start={"clamp(top top+=90%)"}
      end={"clamp(bottom bottom-=90%)"}
      animation={ANIMATION({
        bgColor: COLORS_3A[props.bgColor],
        cubeConfig: {
          amountItems: 60,
          amountEdges: 4,
          padding: 220,
          overlap: 0.2,
          maxGap: 4,
          addRandom: true,
          asGlobe: false,
          outlineColor: "RED",
          fillColor: props.bgColor,
          hideOutlinesWhenStable: false,
          drawAs: "OTHER",
          ...props.cubeConfig,
        },
        draw: (p5, cubes, progress, center, dims) => {
          const bpmInMillis = 1000 / (props.animateBpm / 60);
          const timePerSecond = (p5.millis() / bpmInMillis) % 1; //  % (props.animateBpm! / 60)

          // const p = Math.sin(ms / (500 / (props.animateBpm / 60))) / 2 + 0.5;
          const p = smoothStep(timePerSecond);

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
