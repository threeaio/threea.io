import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { clamp, reMap, remapT } from "~/_util";
import { BROCKMAN_ARC_SETTINGS } from "~/components/animation/brockmann-beethoven/Brockmann-Arcs-Config";
import { clientOnly } from "@solidjs/start";
import { COLORS_3A } from "~/_util-client-only";
import { ParentProps } from "solid-js";
import { TW_BREAKPOINTS } from "~/_contants/contants";

const ANIMATION = clientOnly(
  () =>
    import(
      "~/components/animation/brockmann-beethoven/Canvas-Animation-arc-step-1"
    ),
);

/**
 * CLIENT-ONLY !
 */

export default function BrockmanAnimation01(props: ParentProps) {
  return (
    <CanvasAnimationWrapper
      start={"clamp(top top+=0%)"}
      end={"clamp(bottom bottom-=100%)"}
      animation={
        <ANIMATION
          getStartRadius={(width, height) => Math.max(width / 12, 120)}
          bgColor={COLORS_3A.GRAY_DARKEST}
          fadeInOut={true}
          draw={(p5, progress, arcs, center) => {
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
            debug: true,
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
    </CanvasAnimationWrapper>
  );
}
