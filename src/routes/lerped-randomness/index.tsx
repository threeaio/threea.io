import { Title } from "@solidjs/meta";
import { HeaderSimple } from "~/content/Header-Simple";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/typo/HugeText";
import { onMount } from "solid-js";
import { gsap } from "gsap";
import { Divider } from "~/components/Divider";
import { clientOnly } from "@solidjs/start";
import {
  NavigationConfiguration,
  useNavigationContext,
} from "~/Navigation-Context";

const ANIMATION_1 = clientOnly(
  () => import("~/routes/lerped-randomness/cube-animation-1"),
);
const ANIMATION_2 = clientOnly(
  () => import("~/routes/lerped-randomness/cube-animation-2"),
);
const ANIMATION_3 = clientOnly(
  () => import("~/routes/lerped-randomness/cube-animation-3"),
);

export default function LerpedRandomness() {
  const [_, { setOnThisPage, setPages }] = useNavigationContext();

  const navItems: NavigationConfiguration = {
    onThisPage: [
      {
        linkProps: { type: "anchor", target: "#LERPED_RANDOMNESS_TOP" },
        title: "Anfang",
      },
    ],
    pages: [
      {
        linkProps: { type: "link", href: "/brockmann-arc" },
        title: "Brockmanns Beethoven",
      },
      {
        linkProps: { type: "link", href: "/lerped-randomness" },
        title: "Lerped Randomness",
      },
    ],
  };

  onMount(() => {
    setPages(navItems.pages);
    setOnThisPage(navItems.onThisPage);
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

      <FullWidth class="" id={"LERPED_RANDOMNESS_TOP"}>
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
          <div class={` w-1/2 h-[200svh] relative  mx-auto `}>
            <div class="relative h-full w-full ">
              <ANIMATION_1 bgColor="PAPER" />
            </div>
          </div>
        </div>
      </div>
      <div class={` m-2 xl:m-24 2xl:m-32 `}>
        <div class="relative ">
          <div class={` w-1/2 h-[200svh] relative  mx-auto `}>
            <div class="relative h-full w-full ">
              <ANIMATION_2 bgColor="GRAY_DARKER" cubeConfig={{}} />
            </div>
          </div>
        </div>
      </div>
      <div class={` m-2 xl:m-24 2xl:m-32 `}>
        <div class="relative ">
          <div class={` w-1/2 h-[200svh] relative  mx-auto `}>
            <div class="relative h-full w-full ">
              <ANIMATION_2
                bgColor="GRAY_DARKER"
                cubeConfig={{
                  amountEdges: 12,
                  amountItems: 42,
                  padding: 260,
                  maxGap: 12,
                  addRandom: true,
                  drawAs: "COLORED",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div class={` m-2 xl:m-24 2xl:m-32 `}>
        <div class="relative ">
          <div class={` w-1/2 h-[200svh] relative  mx-auto `}>
            <div class="relative h-full w-full ">
              <ANIMATION_3 bgColor="GRAY_DARKER" />
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </main>
  );
}
