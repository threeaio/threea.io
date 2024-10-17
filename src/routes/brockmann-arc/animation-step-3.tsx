import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { BROCKMAN_ARC_SETTINGS } from "~/components/animation/brockmann-beethoven/Brockmann-Arcs-Config";
import { clientOnly } from "@solidjs/start";
const ANIMATION = clientOnly(
  () =>
    import(
      "~/components/animation/brockmann-beethoven/Canvas-Animation-arc-step-1"
    ),
);
import { COLORS_3A } from "~/_util-client-only";
import { AnimationTrigger, reMap, remapT } from "~/_util";
import { ParentProps } from "solid-js";
import { TW_BREAKPOINTS } from "~/_contants/contants";

/**
 * CLIENT-ONLY !
 */

export default function BrockmanAnimation03(
  props: {
    animateCommand: AnimationTrigger;
  } & ParentProps,
) {
  return (
    <CanvasAnimationWrapper
      start={"clamp(top top+=80%)"}
      end={"clamp(bottom bottom-=100%)"}
      animation={
        <ANIMATION
          animateCommand={props.animateCommand}
          animate={true}
          getStartRadius={(width, height) => Math.max(width / 12, 70)}
          bgColor={COLORS_3A.GRAY_DARKEST}
          fadeInOut={true}
          draw={(_p5, progress, arcs, center) => {
            const p = remapT(progress, 0, 0.7);
            for (let i = 0; i < arcs.length; i++) {
              arcs[i].setProgress(p);
              arcs[i].draw();
            }
          }}
          arcSettings={(width, height) => ({
            ...BROCKMAN_ARC_SETTINGS,
            arcRange: [5, 6, 7, 9, 11, 14, 17, 21],
            sizes: BROCKMAN_ARC_SETTINGS.sizes.map(
              (s) => s / reMap(300, 1600, 8, 6, width),
            ),
          })}
          arcConfig={{
            bgColor: COLORS_3A.GRAY_DARKEST,
            debug: false,
            stroke: false,
            fill: {
              color: COLORS_3A.PAPER,
            },
            randomizeStartPosition: true,
          }}
          setCenter={(width, height, progress) => {
            return {
              x: width > TW_BREAKPOINTS.md ? width * 0.75 : width / 2,
              y: height / 2,
            };
          }}
        />
      }
    >
      {props.children}
    </CanvasAnimationWrapper>
  );
}
