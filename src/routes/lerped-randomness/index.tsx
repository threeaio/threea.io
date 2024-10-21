import { BleedRight } from "~/components/layouts/bleed-right/Bleed-Right";
import { Title } from "@solidjs/meta";
import { HeaderSimple } from "~/content/Header-Simple";
import CanvasScrollAnimationWrapper from "~/components/animation/CanvasScrollAnimationWrapper";
import { clientOnly } from "@solidjs/start";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/typo/HugeText";
import { onMount } from "solid-js";
import { gsap } from "gsap";
import { Divider } from "~/components/Divider";
const CanvasAnimationRotatedCube = clientOnly(
  () =>
    import("~/components/animation/stacked-cube/Canvas-Animation-Rotated-Cube"),
);
export default function LerpedRandomness() {
  onMount(() => {
    // setPages(navItems.pages);
    // setOnThisPage(navItems.onThisPage);
    const page = document.querySelector("#PAGE_3a")!;
    gsap.to(page, {
      opacity: 1,
      delay: 0.5,
    });
  });

  return (
    <main>
      <Title>Threea - Lerped Randomness - Experimentet</Title>

      <HeaderSimple class="absolute z-20 w-full" />

      <FullWidth class="">
        <div class="h-svh relative flex flex-col justify-center">
          <div class="mb-4 text-3a-green">Über threea.io</div>
          <HugeText>
            <h1 class="mb-4">
              Mein Raum für kreatives Arbeiten und Einladung zur Kollaboration
            </h1>
          </HugeText>
        </div>
      </FullWidth>
      <Divider />
      <div class={`bg-3a-paper p-2 xl:p-24 2xl:p-32 `}>
        <div class="relative ">
          <div class={` w-[800px] relative aspect-[1/1] mx-auto `}>
            <div class="relative h-full w-full">
              <CanvasScrollAnimationWrapper
                start={"clamp(top top+=80%)"}
                end={"clamp(bottom bottom-=100%)"}
                animation={CanvasAnimationRotatedCube({
                  bgColor: [0, 0, 0, 0],
                  fadeInOut: false,
                  setCenter(
                    width: number,
                    height: number,
                    progress: number,
                  ): { x: number; y: number } {
                    return { x: width / 2, y: height / 2 };
                  },
                  setStartRadius(width: number, height: number): number {
                    return width / 4;
                  },
                })}
              />
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </main>
  );
}
