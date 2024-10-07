import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { BROCKMAN_ARC_SETTINGS } from "~/components/animation/Brockmann-Arcs-Config";
import { clientOnly } from "@solidjs/start";
const ANIMATION = clientOnly(
  () => import("~/components/animation/Canvas-Animation-arc-step-1"),
);
import { COLORS_3A } from "~/_util-client-only";
import { hexToRgb, remapT } from "~/_util";

/**
 * CLIENT-ONLY !
 */

export default function BrockmanAnimation03() {
  return (
    <CanvasAnimationWrapper
      start={"clamp(top top+=80%)"}
      end={"clamp(bottom bottom-=100%)"}
      animation={
        <ANIMATION
          bgColor={hexToRgb(COLORS_3A.GRAY_DARKEST)}
          fadeInOut={true}
          draw={(p5, progress, arcs, center) => {
            const p = remapT(progress, 0, 0.6);
            for (let i = 0; i < arcs.length; i++) {
              arcs[i].setCenterX(center.x);
              arcs[i].setCenterY(center.y);
              arcs[i].setProgress(p);
              arcs[i].draw();
            }
          }}
          getStartRadius={(w) => w / 8}
          arcSettings={{
            ...BROCKMAN_ARC_SETTINGS,
            sizes: BROCKMAN_ARC_SETTINGS.sizes.map((s) => s / 6),
          }}
          arcConfig={{
            debug: false,
            stroke: false,
            fill: {
              color: hexToRgb(COLORS_3A.PAPER),
            },
            randomizeStartPosition: true,
          }}
          setCenter={(width, height, progress) => {
            return {
              x: width / 2 + width / 4,
              y: height / 2,
            };
          }}
        />
      }
    ></CanvasAnimationWrapper>
  );
}
