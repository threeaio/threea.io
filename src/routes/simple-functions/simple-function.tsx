import CanvasScrollAnimationWrapper from "~/components/animation/CanvasScrollAnimationWrapper";
import { clientOnly } from "@solidjs/start";
const ANIMATION = clientOnly(
  () =>
    import(
      "~/components/animation/simple-functions/Canvas-Animation-Simple-Function"
    ),
);
import { COLORS_3A } from "~/_util-client-only";
import { batch, ParentProps } from "solid-js";
import { RotatableCubeConfig } from "~/components/animation/stacked-cube/Primitives/Rotatable-Cube";
import { doubleRange, smoothStep } from "~/_util";
import { getBpmOscillator, getRawWaveform } from "~/_util/oscillator";
import { SimpleFunctionConfig } from "~/components/animation/_skeleton/Simple-Function";

/**
 * CLIENT-ONLY !
 */

export default function SimpleFunction(props: {
  functionConfig: Partial<SimpleFunctionConfig>;
  bgColor: keyof typeof COLORS_3A;
}) {
  return (
    <CanvasScrollAnimationWrapper
      start={"clamp(top top+=90%)"}
      end={"clamp(bottom bottom-=90%)"}
      animation={ANIMATION({
        bgColor: COLORS_3A[props.bgColor],
        simpleFunctionsConfig: {
          ...props.functionConfig,
        },
        draw: (p5, simpleFunction, progress, center, dims) => {
          const p = smoothStep(doubleRange(progress));

          const ms = p5.millis();
          const progressHere = getBpmOscillator(ms, 30, "sawtooth");
          const getY = (x: number) => getRawWaveform("noise", x);
          // const p = getBpmOscillator(p5.millis(), 30, "sawtooth");

          for (let i = 0; i < simpleFunction.length; i++) {
            simpleFunction[i].draw(progressHere, getY);
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
