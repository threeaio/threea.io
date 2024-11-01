import { Title } from "@solidjs/meta";
import { HeaderSimple } from "~/content/Header-Simple";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/typo/HugeText";
import { onMount, ParentProps } from "solid-js";
import { gsap } from "gsap";
import { Divider } from "~/components/Divider";
import { clientOnly } from "@solidjs/start";
import {
  AnchorProps,
  NavigationConfiguration,
  NavigationItem,
  useNavigationContext,
} from "~/Navigation-Context";

const ANIMATION = clientOnly(
  () => import("~/routes/simple-functions/simple-function"),
);

export default function SimpleFunctions() {
  const [_, { setOnThisPage }] = useNavigationContext();

  const onThisPageItems: NavigationItem<AnchorProps>[] = [
    {
      linkProps: { type: "anchor", target: "#SIMPLE_FUNCTIONS_TOP" },
      title: "Anfang",
    },
  ];

  onMount(() => {
    setOnThisPage(onThisPageItems);
    const page = document.querySelector("#PAGE_3a")!;
    gsap.to(page, {
      opacity: 1,
      delay: 0.5,
    });
  });

  return (
    <main>
      <Title>Threea.io - Simple Function - Mein kleiner Werkzeugkasten</Title>

      <HeaderSimple class="absolute z-20 w-full" />

      <FullWidth class="" id={"SIMPLE_FUNCTIONS_TOP"}>
        <div class="h-svh relative flex flex-col justify-center">
          <HugeText>
            <h1 class="mb-4">Simple Function</h1>
          </HugeText>
        </div>
      </FullWidth>
      <Divider />
      <div class={` m-2 xl:m-24 2xl:m-32 `}>
        <div class="relative ">
          <div class={`xl:w-2/3 2xl:w-1/2 h-[400svh] relative  mx-auto `}>
            <div class="relative h-full w-full ">
              <ANIMATION bgColor={"GRAY_DARKER"} functionConfig={{}} />
            </div>
          </div>
        </div>
      </div>

      <Divider />
    </main>
  );
}
