import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { hexToRgb, remapT } from "~/_util";
import { BROCKMAN_ARC_SETTINGS } from "~/components/animation/Brockmann-Arcs-Config";
import { clientOnly } from "@solidjs/start";
import { COLORS_3A } from "~/_util-client-only";
const ANIMATION = clientOnly(
  () => import("~/components/animation/Canvas-Animation-arc-step-1"),
);

/**
 * CLIENT-ONLY !
 */

export default function BrockmanAnimation01() {
  return (
    <CanvasAnimationWrapper
      start={"clamp(top top+=80%)"}
      end={"clamp(bottom bottom-=100%)"}
      animation={
        <ANIMATION
          bgColor={hexToRgb(COLORS_3A.GRAY_DARKEST)}
          fadeInOut={true}
          draw={function (p5, progress, arcs, center) {
            // Math.sin(p5.millis() / 800) + 1.2
            const p = remapT(progress, 0, 0.8);
            for (let i = 0; i < arcs.length; i++) {
              arcs[i].setCenterX(center.x);
              arcs[i].setCenterY(center.y);
              arcs[i].setProgress(p);
              arcs[i].draw();
            }
          }}
          getStartRadius={(w, h) => w / 10}
          arcSettings={{
            ...BROCKMAN_ARC_SETTINGS,
            arcRange: [12],
            sizes: [60],
            amountOfArcs: 1,
          }}
          arcConfig={{
            debug: true,
            fill: false,
            stroke: false,
            randomizeStartPosition: false,
          }}
          setCenter={(width, height, progress) => {
            return {
              x: width / 2 + width / 4,
              y: height / 8 + height * progress,
            };
          }}
        />
      }
    >
      <div style={"height: 100svh"}></div>
    </CanvasAnimationWrapper>
  );
}
