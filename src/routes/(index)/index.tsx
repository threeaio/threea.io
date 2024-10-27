import { GridIndicator } from "~/components/Grid-Indicator";
import { Introduction } from "~/routes/(index)/01_Introduction";
import AboutWork from "~/routes/(index)/02_About-Work";
import { onMount } from "solid-js";
import { Title } from "@solidjs/meta";
import BlackBook from "~/routes/(index)/03_Black-Book";
import CanvasScrollAnimationWrapper from "~/components/animation/CanvasScrollAnimationWrapper";
import { clientOnly } from "@solidjs/start";
import { Divider } from "~/components/Divider";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/typo/HugeText";
import {
  NavigationConfiguration,
  useNavigationContext,
} from "~/Navigation-Context";
const ANIMATION = clientOnly(
  () => import("~/components/animation/floating-edges/Canvas-Animation-2"),
);

import { gsap } from "gsap";
export default function Home() {
  const [_, { setOnThisPage, setPages }] = useNavigationContext();
  // onMount(() => {
  const navItems: NavigationConfiguration = {
    onThisPage: [
      {
        linkProps: { type: "anchor", target: "#INDEX_START" },
        title: "Anfang",
      },
      {
        linkProps: { type: "anchor", target: "#INDEX_ABOUT_WORK" },
        title: "Über mich",
      },
      {
        linkProps: { type: "anchor", target: "#INDEX_BLACKBOOK" },
        title: "Blackbook",
      },
      {
        linkProps: { type: "anchor", target: "#INDEX_THE_END" },
        title: "Ende",
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
    });
  });

  return (
    <div>
      <Title>Threea.io - Nikolaj Sokolowksis Entwickler-Blackbook</Title>
      <GridIndicator />
      <main>
        <div id={"INDEX_START"}>
          <Introduction />
        </div>
        <div class={"relative"}>
          <CanvasScrollAnimationWrapper
            start={"clamp(top top+=80%)"}
            end={"clamp(bottom bottom-=100%)"}
            animation={<ANIMATION />}
          >
            <div class="bg-gradient-to-b from-3a-gray-darkest to-transparent ">
              <Divider />
            </div>
            <AboutWork />
            <Divider />
            <BlackBook />
            <Divider />
            <FullWidth>
              <div
                id={"INDEX_THE_END"}
                class="h-screen flex flex-col justify-center text-pretty"
              >
                <HugeText>
                  <figure class="max-w-[72rem]">
                    Dieses ist nicht das Ende, sondern ein Anfang von etwas.
                  </figure>
                </HugeText>
              </div>
            </FullWidth>
            <div class="bg-gradient-to-t from-3a-gray-darkest to-transparent ">
              <Divider />
            </div>
          </CanvasScrollAnimationWrapper>
        </div>

        {/*<Contact />*/}
      </main>
    </div>
  );
}
