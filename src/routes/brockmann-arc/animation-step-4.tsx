import CanvasScrollAnimationWrapper from "~/components/animation/CanvasScrollAnimationWrapper";
import { BROCKMAN_ARC_SETTINGS } from "~/components/animation/brockmann-beethoven/Brockmann-Arcs-Config";
import { clientOnly } from "@solidjs/start";
const ANIMATION = clientOnly(
  () =>
    import(
      "~/components/animation/brockmann-beethoven/Brockmann-Scene-Wrapper"
    ),
);
import { COLORS_3A } from "~/_util-client-only";
import { batch, ParentProps } from "solid-js";

/**
 * CLIENT-ONLY !
 */

export default function BrockmanAnimation04(
  props: {
    animateBpm?: number;
    animateOffsetMs?: number;
    animateCommand:
      | PointerEvent
      | MouseEvent
      | KeyboardEvent
      | number
      | undefined;
    bgColor: keyof typeof COLORS_3A;
  } & ParentProps,
) {
  return (
    <CanvasScrollAnimationWrapper
      start={"clamp(top top+=90%)"}
      end={"clamp(bottom bottom-=90%)"}
      animation={
        <ANIMATION
          animateCommand={props.animateCommand}
          animateOffsetMs={props.animateOffsetMs}
          animate={true}
          animateBpm={props.animateBpm}
          setStartRadius={(w) => w / 6}
          bgColor={COLORS_3A[props.bgColor]}
          fadeInOut={false}
          setCenter={(width, height, progress) => {
            return {
              x: width / 3,
              y: (height / 3) * 2,
            };
          }}
          draw={(p5, arcs, progress, center) => {
            const p = 1;
            for (let i = 0; i < arcs.length; i++) {
              batch(() => {
                arcs[i].setProgress(p);
              });
              arcs[i].draw();
            }
          }}
          arcSettings={(width, height) => ({
            ...BROCKMAN_ARC_SETTINGS,
            sizes: BROCKMAN_ARC_SETTINGS.sizes.map((s) => s / 2),
          })}
          arcConfig={{
            bgColor: COLORS_3A[props.bgColor],
            fill: {
              color: COLORS_3A.GRAY_DARKER,
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
