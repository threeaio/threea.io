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

export default function BrockmanAnimation04() {
  return (
    <CanvasAnimationWrapper
      start={"clamp(top top+=80%)"}
      end={"clamp(bottom bottom-=100%)"}
      animation={
        <ANIMATION
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
          getStartRadius={(w) => w / 3}
          arcSettings={{
            ...BROCKMAN_ARC_SETTINGS,
            sizes: BROCKMAN_ARC_SETTINGS.sizes.map((s) => s / 4),
          }}
          arcConfig={{
            debug: false,
            stroke: {
              color: hexToRgb(COLORS_3A.GREEN),
            },
            fill: false,
            randomizeStartPosition: true,
          }}
        />
      }
    ></CanvasAnimationWrapper>
  );
}
