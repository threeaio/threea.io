import { GridIndicator } from "~/components/Grid-Indicator";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import { Divider } from "~/components/Divider";
import { Introduction } from "~/routes/(index)/Introduction";
import { FullWidth } from "~/components/layouts/Full-Width";
import { Headline } from "~/components/Headline";
import { HugeText } from "~/components/HugeText";
import { SmallText } from "~/components/SmallText";
import { Button } from "~/components/Button";
import { onMount } from "solid-js";
import { gsap } from "gsap";
import { Title } from "@solidjs/meta";

export default function Home() {
  let container: HTMLElement;

  onMount(() => {
    let mm = gsap.matchMedia(),
      breakPoint = 800;
    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
        isMobile: `(max-width: ${breakPoint - 1}px) and (prefers-reduced-motion: no-preference)`,
      },
      (context) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            scrub: true,
            once: true,
            start: "top 60%",
            end: "120% 100% ",
          },
        });

        tl.addLabel("heading").from("#big-headline-index", {
          y: 80,
          autoAlpha: 0,
          duration: 1,
        });
        tl.addLabel("items").from(
          ".item",
          {
            autoAlpha: 0,
            stagger: 0.2,
            scale: 0.8,
            y: -60,
          },
          ">-.3s",
        );
      },
    );
  });
  return (
    <LandingPageLayout>
      <Title>Welcome to Threea.io</Title>
      <GridIndicator />
      <main>
        <Introduction />
        <Divider />
        <div ref={(el) => (container = el)}>
          <FullWidth>
            <HugeText>
              <div
                id="big-headline-index"
                class="flex items-center py-12 md:py-16 xl:py-20"
              >
                <h2 class="text-pretty">
                  From Experience to Concept{" "}
                  <span class="text-3a-green">and Back</span>
                </h2>
              </div>
            </HugeText>
          </FullWidth>
          <FullWidth>
            <div class="grid grid-cols-3 w-full">
              {/*Conduct*/}
              <div class="item col-span-3 md:col-span-1 py-12">
                <Headline>Anti-Agony</Headline>
                <SmallText class="md:pr-12">
                  <p class="text-3a-green !mb-6">
                    Improving daily interactions and creating tools for the
                    people through thoughtful, human-centred software is what
                    drives me
                  </p>
                  <Button href="/anti-agony" asA={true}>
                    More <span class="hidden lg:inline">on my Motivation</span>
                  </Button>
                </SmallText>
              </div>
              {/*Code*/}
              <div class="item col-span-3 md:col-span-1 py-12">
                <Headline>Async Action</Headline>
                <SmallText class="md:pr-12">
                  <p class="text-3a-green !mb-6">
                    As a developer, I deliver simple functional UI-solutions,
                    focused on maintainability, stability and user-friendliness
                  </p>
                  <Button href="/async-action" asA={true}>
                    More <span class="hidden lg:inline">on Coding</span>
                  </Button>
                </SmallText>
              </div>
              {/*Lead*/}
              <div class="item col-span-3 md:col-span-1 py-12">
                <Headline>Agile Leader</Headline>
                <SmallText class="md:pr-12">
                  <p class="text-3a-green !mb-6">
                    I have a special instinct for the right solution that fits
                    the skill and needs of team and convinces in terms of
                    results and costs
                  </p>
                  <Button href="/agile-leadership" asA={true}>
                    <span>
                      More <span class="hidden lg:inline">on Processes</span>
                    </span>
                  </Button>
                </SmallText>
              </div>
            </div>
          </FullWidth>
        </div>
      </main>
      <Divider />
    </LandingPageLayout>
  );
}
