import CanvasScrollAnimationWrapper from "~/components/animation/CanvasScrollAnimationWrapper";
import { clamp, reMap, remapT } from "~/_util";
import { BROCKMAN_ARC_SETTINGS } from "~/components/animation/brockmann-beethoven/Brockmann-Arcs-Config";
import { clientOnly } from "@solidjs/start";
import { COLORS_3A } from "~/_util-client-only";
import { ParentProps } from "solid-js";
import { TW_BREAKPOINTS } from "~/_constants/constants";

const ANIMATION = clientOnly(
  () =>
    import(
      "~/components/animation/brockmann-beethoven/Brockmann-Scene-Wrapper"
    ),
);

/**
 * CLIENT-ONLY !
 */

export default function BrockmanAnimation01(props: ParentProps) {
  return (
    <CanvasScrollAnimationWrapper
      start={"clamp(top top+=0%)"}
      end={"clamp(bottom bottom-=100%)"}
      animation={
        <ANIMATION
          setStartRadius={(width, height) => Math.max(width / 12, 120)}
          bgColor={COLORS_3A.GRAY_DARKEST}
          fadeInOut={true}
          draw={(_p5, arcs, progress, center) => {
            // Math.sin(p5.millis() / 800) + 1.2
            const p = remapT(progress, 0, 0.6);
            for (let i = 0; i < arcs.length; i++) {
              arcs[i].setProgress(p);
              arcs[i].draw();
            }
          }}
          // arcSettings={{
          //   ...BROCKMAN_ARC_SETTINGS,
          //   arcRange: [12],
          //   sizes: [60],
          //   amountOfArcs: 1,
          // }}
          arcSettings={(width, height) => ({
            ...BROCKMAN_ARC_SETTINGS,
            arcRange: [12],
            sizes: [60],
            amountOfArcs: 1,
          })}
          arcConfig={{
            bgColor: COLORS_3A.GRAY_DARKEST,
            debug: 1,
            fill: false,
            stroke: false,
            randomizeStartPosition: false,
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
    </CanvasScrollAnimationWrapper>
  );
}
