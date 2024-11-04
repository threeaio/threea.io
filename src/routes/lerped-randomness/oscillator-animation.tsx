import CanvasScrollAnimationWrapper from "~/components/animation/CanvasScrollAnimationWrapper";
import { COLORS_3A } from "~/_util-client-only";
import { clientOnly } from "@solidjs/start";
import { OrganicGridConfig } from "~/components/animation/oscillator/Oscillator-Grid";
import { batch } from "solid-js";

const ANIMATION = clientOnly(
  () => import("~/components/animation/oscillator/Canvas-Animation-Oscillator"),
);

export default function OrganicGridAnimation() {
  const gridConfigs: OrganicGridConfig[] = [
    {
      bpm: 5,
    },
    // {
    //   baseSize: 40,
    //   color: COLORS_3A.WHITE,
    //   shape: "bounce",
    //   bpm: 120,
    //   opacity: 0.1,
    //   fallofFactor: 0.5,
    //   noiseScale: 10,
    // },
    // {
    //   baseSize: 320,
    //   color: COLORS_3A.WHITE,
    //   shape: "sine",
    //   bpm: 15,
    //   opacity: 0.2,
    //   maxDistortion: 60,
    //   noiseScale: 4,
    // },
  ];

  return (
    <CanvasScrollAnimationWrapper
      start={"clamp(top top+=90%)"}
      end={"clamp(bottom bottom-=90%)"}
      animation={
        <ANIMATION
          bgColor={COLORS_3A.GRAY_DARKEST}
          gridConfigs={gridConfigs}
          fadeInOut={false}
          draw={(p5, els, progress, center, dims) => {
            for (let i = 0; i < els.length; i++) {
              batch(() => {
                els[i].setProgress(progress);
              });
              els[i].draw();
            }
          }}
          setCenter={(width, height) => ({
            x: width / 2,
            y: height / 2,
          })}
        />
      }
    />
  );
}
