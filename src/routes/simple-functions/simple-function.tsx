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
import {
  clamp,
  doubleRange,
  lerp,
  mapToNewUnitRange,
  reMap,
  smoothStep,
} from "~/_util";
import { Easing, getBpmOscillator, getRawWaveform } from "~/_util/oscillator";
import { SimpleFunctionConfig } from "~/components/animation/_skeleton/Simple-Function";

/**
 * CLIENT-ONLY !
 */

export default function SimpleFunction(props: {
  functionConfig: Partial<SimpleFunctionConfig>;
  theFunction: (x: number) => number;
  rangeFunc?: () => [number, number];
  bgColor: keyof typeof COLORS_3A;
}) {
  return (
    <CanvasScrollAnimationWrapper
      start={"clamp(top top+=90%)"}
      end={"clamp(bottom bottom-=90%)"}
      animation={ANIMATION({
        bgColor: COLORS_3A[props.bgColor],
        setXRange: () => ({
          min: props.rangeFunc ? props.rangeFunc()[0] : 0,
          max: props.rangeFunc ? props.rangeFunc()[1] : 1,
          fixed: true,
        }),
        simpleFunctionsConfig: {
          ...props.functionConfig,
        },

        draw: (p5, simpleFunction, progress, center, dims) => {
          const range = props.rangeFunc ? props.rangeFunc() : [0, 1];

          const ms = p5.millis();
          const progressHere = reMap(
            0,
            1,
            range[0],
            range[1],
            getBpmOscillator(ms, 30, "sawtooth"),
          );
          const getY = props.theFunction;
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
