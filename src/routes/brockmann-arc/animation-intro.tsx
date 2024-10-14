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
import { createSignal, onMount, ParentProps } from "solid-js";

/**
 * CLIENT-ONLY !
 */

export default function BrockmanAnimationIntro(
  props: {
    bgColor: keyof typeof COLORS_3A;
  } & ParentProps,
) {
  const [positionX, setPositionX] = createSignal(0);

  onMount(() => {
    const firstLayoutOnPage = document.querySelector(
      '[data-name="Layout/FullWidth"] > *',
    );
    const left = firstLayoutOnPage?.getBoundingClientRect()?.left || 0;
    const width = firstLayoutOnPage?.getBoundingClientRect()?.width || 0;
    const _positionX = left + (width / 3) * 2;
    setPositionX(_positionX);
  });

  return (
    <CanvasAnimationWrapper
      start={"clamp(top top+=80%)"}
      end={"clamp(bottom bottom-=100%)"}
      animation={
        <ANIMATION
          getStartRadius={(w) => w / 5}
          bgColor={COLORS_3A[props.bgColor]}
          fadeInOut={false}
          setCenter={(_width, height, progress) => {
            return {
              x: positionX() || (_width / 3) * 2,
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
            sizes: BROCKMAN_ARC_SETTINGS.sizes.map((s) => s / 1.5),
            // gap: 6,
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
    ></CanvasAnimationWrapper>
  );
}
