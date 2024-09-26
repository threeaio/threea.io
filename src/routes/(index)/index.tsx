import { GridIndicator } from "~/components/Grid-Indicator";
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

import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { clientOnly } from "@solidjs/start";
import { AgileAgit } from "~/content/Agile-Agit";
import { AsyncAction } from "~/content/Async-Action";
import { AntiAgony } from "~/content/Anti-Agony";
import { navigationBus } from "~/Navigation-Bus";
const CanvasAnimationRounded = clientOnly(
  () => import("~/components/animation/Canvas-Animation-swiss-1"),
);

export default function Home() {
  let container: HTMLElement;

  onMount(() => {
    navigationBus.emit({
      onThisPage: [],
      relatedToThisPage: [
        AntiAgony.moreLink,
        AsyncAction.moreLink,
        AgileAgit.moreLink,
      ],
    });

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
            scrub: 3,
            once: false,
            start: "top 60%",
            end: "120% 100% ",
          },
        });

        tl.addLabel("heading")
          .from("#big-headline-index", {
            y: 80,
            autoAlpha: 0,
          })
          .addLabel("items")
          .from(
            ".item",
            {
              autoAlpha: 0,
              stagger: 0.2,
              scale: 0.95,
              y: 90,
            },
            ">-.5s",
          );
      },
    );
  });
  return (
    <div>
      <Title>Welcome to Threea.io</Title>
      <GridIndicator />
      <main>
        <div>
          <Introduction />
        </div>

        <CanvasAnimationWrapper
          start="clamp(top bottom-=40%)"
          end="clamp(top+=50% top)"
          animation={<CanvasAnimationRounded />}
        >
          <div class="sm:bg-gradient-to-b from-3a-gray-darkest to-transparent ">
            <Divider />
          </div>
          <div ref={(el) => (container = el)}>
            <FullWidth>
              <HugeText>
                <div
                  id="big-headline-index"
                  class="flex items-center py-12 md:py-16 xl:py-20"
                >
                  <h2 class="text-pretty">
                    From Experience to Concept to Code{" "}
                    <span class="text-3a-green">to Experience</span>
                  </h2>
                </div>
              </HugeText>
            </FullWidth>
            <FullWidth>
              <div class="grid grid-cols-3 w-full">
                {/*Conduct*/}
                <div class="item col-span-3 md:col-span-1 py-6 md:py-12 ">
                  <Headline>{AntiAgony.headline}</Headline>
                  <SmallText class="md:pr-16 xl:pr-20">
                    <p class=" !mb-6">{AntiAgony.teaser}</p>
                    {/*<div class="">{AntiAgony.text}</div>*/}
                    <Button href="/anti-agony" asA={true}>
                      More{" "}
                      <span class="hidden lg:inline">on my Motivation</span>
                    </Button>
                  </SmallText>
                </div>
                {/*Code*/}
                <div class="item col-span-3 md:col-span-1 py-6 md:py-12">
                  <Headline>{AsyncAction.headline}</Headline>
                  <SmallText class="md:pr-16 xl:pr-20">
                    <p class="!mb-6">{AsyncAction.teaser}</p>
                    {/*<div class="">{AsyncAction.text}</div>*/}
                    <Button href="/async-action" asA={true}>
                      More <span class="hidden lg:inline">on Coding</span>
                    </Button>
                  </SmallText>
                </div>
                {/*Lead*/}
                <div class="item col-span-3 md:col-span-1 py-6 md:py-12 ">
                  <Headline>{AgileAgit.headline}</Headline>
                  <SmallText class="md:pr-16 xl:pr-20">
                    <p class="!mb-6">{AgileAgit.teaser}</p>
                    {/*<div class="">{AgileAgit.text}</div>*/}
                    <Button href="/agile-leadership" asA={true}>
                      More <span class="hidden lg:inline">on Agit</span>
                    </Button>
                  </SmallText>
                </div>
              </div>
            </FullWidth>
          </div>
          <div class="sm:bg-gradient-to-t from-3a-gray-darkest to-transparent ">
            <Divider />
          </div>
        </CanvasAnimationWrapper>
      </main>
    </div>
  );
}
