import { Title } from "@solidjs/meta";
import { HeaderSimple } from "~/content/Header-Simple";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/typo/HugeText";
import { onMount, ParentProps } from "solid-js";
import { gsap } from "gsap";
import { Divider } from "~/components/Divider";
import { clientOnly } from "@solidjs/start";
import {
  NavigationConfiguration,
  useNavigationContext,
} from "~/Navigation-Context";

const ANIMATION = clientOnly(
  () => import("~/routes/lerped-randomness/cube-animation"),
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
      <Title>Threea.io - Lerped Randomness - Code-Experimente</Title>

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
      <PieceWrapper>
        <ANIMATION
          bgColor="PAPER"
          animateBpm={15}
          cubeConfig={{
            amountEdges: 4,
            amountItems: 4,
            padding: 200,
            maxGap: 40,
            addRandom: false,
            hideOutlinesWhenStable: true,
            outlineColor: "GRAY",
            fillColor: "PAPER",
            drawAs: "CUBE_ROTATE",
          }}
        />
      </PieceWrapper>
      <PieceWrapper>
        <ANIMATION
          bgColor="GRAY_DARKER"
          animateBpm={15}
          cubeConfig={{
            outlineColor: "PAPER",
          }}
        />
      </PieceWrapper>
      <PieceWrapper>
        <ANIMATION
          bgColor="GRAY_DARKER"
          animateBpm={7.5}
          cubeConfig={{
            amountEdges: 8,
            amountItems: 80,
            padding: 140,
            maxGap: 3,
            addRandom: false,
            overlap: 0.2,
            asGlobe: true,
            outlineColor: "GRAY_DARKER",
            fillColor: "PAPER",
            drawAs: "CUBE_ROTATE",
          }}
        />
      </PieceWrapper>
      <PieceWrapper>
        <ANIMATION
          bgColor="GRAY_DARKER"
          animateBpm={7.5}
          cubeConfig={{
            amountEdges: 4,
            amountItems: 40,
            padding: 140,
            maxGap: 4,
            asGlobe: true,
            addRandom: true,
            outlineColor: "PAPER",
            drawAs: "OTHER",
          }}
        />
      </PieceWrapper>
      <Divider />
    </main>
  );
}

function PieceWrapper(props: ParentProps) {
  return (
    <div class={` m-2 xl:m-24 2xl:m-32 `}>
      <div class="relative ">
        <div class={`xl:w-2/3 2xl:w-1/2 h-[200svh] relative  mx-auto `}>
          <div class="relative h-full w-full ">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
