import { Title } from "@solidjs/meta";
import { HeaderSimple } from "~/content/Header-Simple";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/typo/HugeText";
import { onMount } from "solid-js";
import { gsap } from "gsap";
import { Divider } from "~/components/Divider";
import { clientOnly } from "@solidjs/start";

const ANIMATION = clientOnly(
  () => import("~/routes/lerped-randomness/cube-animation-1"),
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
          <div class="mb-4 text-3a-green">
            Bewegungs-Sammlung &ndash; Animationen und Dinge ohne weiteren Zweck
          </div>
          <HugeText>
            <h1 class="mb-4">Lerped Randomness</h1>
          </HugeText>
        </div>
      </FullWidth>
      <Divider />
      <div class={` p-2 xl:p-24 2xl:p-32 `}>
        <div class="relative ">
          <div class={` w-1/2 h-[400svh] relative  mx-auto `}>
            <div class="relative h-full w-full ">
              <ANIMATION bgColor="PAPER" />
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </main>
  );
}
