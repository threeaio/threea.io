import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { BROCKMAN_ARC_SETTINGS } from "~/components/animation/Brockmann-Arcs-Config";
import { clientOnly } from "@solidjs/start";
const ANIMATION = clientOnly(
  () => import("~/components/animation/Canvas-Animation-arc-step-1"),
);
import { COLORS_3A } from "~/_util-client-only";
import { ArrayElement, ColorArray, hexToRgb, remapT } from "~/_util";
import { ParentProps } from "solid-js";

/**
 * CLIENT-ONLY !
 */

export default function BrockmanAnimation04(
  props: {
    animateCommand: PointerEvent | MouseEvent | number | undefined;
    bgColor: keyof typeof COLORS_3A;
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
          getStartRadius={(w) => w / 4}
          bgColor={COLORS_3A[props.bgColor]}
          fadeInOut={false}
          setCenter={(width, height, progress) => {
            return {
              x: width / 3,
              y: (height / 3) * 2,
            };
          }}
          draw={(p5, progress, arcs, center) => {
            const p = 1;
            for (let i = 0; i < arcs.length; i++) {
              arcs[i].setCenterX(center.x);
              arcs[i].setCenterY(center.y);
              arcs[i].setProgress(p);
              arcs[i].draw();
            }
          }}
          arcSettings={{
            ...BROCKMAN_ARC_SETTINGS,
            sizes: BROCKMAN_ARC_SETTINGS.sizes.map((s) => s / 3),
          }}
          arcConfig={{
            debug: false,
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
    </CanvasAnimationWrapper>
  );
}
