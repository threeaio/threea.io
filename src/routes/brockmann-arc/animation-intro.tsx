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
import { createEffect, createSignal, onMount, ParentProps } from "solid-js";
import { TW_BREAKPOINTS } from "~/_constants/constants";
import { reMap } from "~/_util";
import { createElementSize } from "@solid-primitives/resize-observer";

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
    if (firstLayoutOnPage) {
      const size = createElementSize(firstLayoutOnPage);

      createEffect(() => {
        const width = size.width;
        const left = firstLayoutOnPage?.getBoundingClientRect()?.left || 0;
        const _positionX = left + (width / 3) * 2;
        setPositionX(_positionX);
      });
    }
  });

  return (
    <CanvasScrollAnimationWrapper
      start={"top top+=80%"}
      end={"clamp(bottom bottom-=100%)"}
      animation={
        <ANIMATION
          setStartRadius={(width) => Math.max(width / 5, 80)}
          bgColor={COLORS_3A[props.bgColor]}
          forceContentHeight={true}
          fadeInOut={false}
          setCenter={(width, height, progress) => {
            return {
              x:
                width > TW_BREAKPOINTS.md
                  ? positionX() || (width / 3) * 2
                  : width / 2,
              y: width > TW_BREAKPOINTS.md ? height / 2 : height / 2.5,
            };
          }}
          draw={(p5, arcs, progress, center, dims) => {
            const p = 1;
            for (let i = 0; i < arcs.length; i++) {
              arcs[i].setProgress(p);
              arcs[i].draw();
            }
          }}
          // arcSettings={{
          //   ...BROCKMAN_ARC_SETTINGS,
          //   sizes: BROCKMAN_ARC_SETTINGS.sizes.map((s) => s / 1.5),
          //   gap: 3,
          // }}
          arcSettings={(width, height) => ({
            ...BROCKMAN_ARC_SETTINGS,
            sizes: BROCKMAN_ARC_SETTINGS.sizes.map(
              (s) => s / reMap(300, 1600, 6, 3, width),
            ),
            gap: 3,
          })}
          arcConfig={{
            debug: false,
            bgColor: COLORS_3A[props.bgColor],
            fill: {
              color: COLORS_3A.GRAY_DARKER,
            },
            stroke: false,
            randomizeStartPosition: true,
          }}
        />
      }
    ></CanvasScrollAnimationWrapper>
  );
}
