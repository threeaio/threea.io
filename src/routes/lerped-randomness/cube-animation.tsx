import CanvasScrollAnimationWrapper from "~/components/animation/CanvasScrollAnimationWrapper";
import { clientOnly } from "@solidjs/start";
const ANIMATION = clientOnly(
  () =>
    import("~/components/animation/stacked-cube/Canvas-Animation-Rotated-Cube"),
);
import { COLORS_3A } from "~/_util-client-only";
import { batch, ParentProps } from "solid-js";
import { RotatableCubeConfig } from "~/components/animation/stacked-cube/Primitives/Rotatable-Cube";
import { doubleRange, smoothStep } from "~/_util";
import { getBpmOscillator } from "~/_util/oscillator";

/**
 * CLIENT-ONLY !
 */

export default function CubeAnimation(props: {
  cubeConfig: Partial<RotatableCubeConfig>;
  bgColor: keyof typeof COLORS_3A;
}) {
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
          const p = smoothStep(doubleRange(progress));

          // const p = getBpmOscillator(p5.millis(), 30, "sawtooth");

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
