import CanvasScrollAnimationWrapper from "~/components/animation/CanvasScrollAnimationWrapper";
import {
  ArcSettings,
  BROCKMAN_ARC_SETTINGS,
} from "~/components/animation/brockmann-beethoven/Brockmann-Arcs-Config";
import { clientOnly } from "@solidjs/start";
const ANIMATION = clientOnly(
  () =>
    import(
      "~/components/animation/brockmann-beethoven/Brockmann-Scene-Wrapper"
    ),
);
import { COLORS_3A } from "~/_util-client-only";
import { AnimationTrigger, reMap } from "~/_util";
import { batch, ParentProps } from "solid-js";

/**
 * CLIENT-ONLY !
 */

export default function BrockmanAnimation05(
  props: {
    bgColor: keyof typeof COLORS_3A;
    strokeColor?: keyof typeof COLORS_3A;
    progress: number;
    speed: number;
    ampl: number;
    arcSettingsPartial: Partial<ArcSettings>;
    animateBpm?: number;
    animateCommand: AnimationTrigger;
  } & ParentProps,
) {
  return (
    <CanvasScrollAnimationWrapper
      start={"clamp(top top+=90%)"}
      end={"clamp(bottom bottom-=90%)"}
      animation={
        <ANIMATION
          animateCommand={props.animateCommand}
          animateBpm={props.animateBpm}
          animate={true}
          setStartRadius={(w, h) => h / 5}
          bgColor={COLORS_3A[props.bgColor]}
          fadeInOut={false}
          setCenter={(width, height, progress) => {
            return {
              x: (width / 3) * 2,
              y: (height / 3) * 2,
            };
          }}
          draw={(p5, arcs, progress, center) => {
            const ms = p5.millis() || 0;
            const p =
              props.progress +
              Math.sin((ms / props.speed) % (Math.PI * 2)) / props.ampl;
            // const p = props.progress;
            for (let i = 0; i < arcs.length; i++) {
              batch(() => {
                arcs[i].setProgress(p);
              });
              arcs[i].draw();
            }
          }}
          arcSettings={(width, height) => ({
            ...BROCKMAN_ARC_SETTINGS,
            sizes: BROCKMAN_ARC_SETTINGS.sizes.map((s) => s / 3),
            ...props.arcSettingsPartial,
          })}
          arcConfig={{
            bgColor: COLORS_3A[props.bgColor],
            fill: {
              color: props.strokeColor
                ? COLORS_3A[props.strokeColor]
                : COLORS_3A.GRAY_DARKER,
            },
            stroke: false,
            randomizeStartPosition: true,
          }}
        />
      }
    >
      {props.children}
    </CanvasScrollAnimationWrapper>
  );
}
