import { onMount } from "solid-js";
import { gsap } from "gsap";
import { AntiAgony } from "~/content/Anti-Agony";
import { AsyncAction } from "~/content/Async-Action";
import { AgileAgit } from "~/content/Agile-Agit";
import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { Divider } from "~/components/Divider";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/HugeText";
import { Headline } from "~/components/Headline";
import { SmallText } from "~/components/SmallText";
import { Button } from "~/components/Button";
import { clientOnly } from "@solidjs/start";
import { ContentType } from "~/content/content-type";
const ANIMATION = clientOnly(
  () => import("~/components/animation/Canvas-Animation-swiss-2"),
);

export default function AboutWork() {
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
            scrub: 3,
            // once: true,
            start: "30rem 50%",
            end: "bottom bottom+=100px",
          },
        });

        tl.addLabel("heading")
          .from("#big-headline-index", {
            y: 120,
            autoAlpha: 0,
            // delay: 1,
          })
          .from(
            ".headline-item",
            {
              autoAlpha: 0,
              y: 20,
            },
            "<=+.2",
          )
          .from(".item", {
            autoAlpha: 0,
            stagger: 0.4,
            y: 40,
          })
          .to(
            "#big-headline-index",
            {
              // y: 140,
              // autoAlpha: 0,
            },
            ">-=0.7",
          );
      },
    );
  });
  return (
    <div>
      <CanvasAnimationWrapper animation={<ANIMATION />}>
        <div class="bg-gradient-to-b from-3a-gray-darkest to-transparent ">
          <Divider />
        </div>
        <div class="opacity-0" ref={(el) => (container = el)}>
          {/*<div class="h-[500px]">*/}
          {/*  <div class="sticky top-0">*/}
          {/*    <FullWidth></FullWidth>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <FullWidth>
            <div class="grid grid-cols-1 sm:grid-cols-2">
              <Headline>
                <div class="sticky top-0 ">
                  <div
                    id="big-headline-index"
                    class="flex items-center sm:justify-end py-16 md:py-32 xl:py-42 mb-[24rem]  sm:text-right"
                  >
                    <h2 class="text-pretty max-w-96">
                      Aus Erfahrung Für Experience{" "}
                      <span class="headline-item text-3a-green inline-block ">
                        Über Arbeit, Code und Konzepte
                      </span>
                    </h2>
                  </div>{" "}
                </div>
              </Headline>
            </div>
          </FullWidth>

          <FullWidth>
            <div class="grid grid-cols-1 sm:grid-cols-2">
              <div></div>
              <div class="max-w-[400px]  ">
                <SectionHere content={AntiAgony} />
                <SectionHere content={AsyncAction} />
                <SectionHere content={AgileAgit} />
              </div>
            </div>
          </FullWidth>
        </div>
        <div class="bg-gradient-to-t from-3a-gray-darkest to-transparent ">
          <Divider />
        </div>
      </CanvasAnimationWrapper>
    </div>
  );
}

function SectionHere(props: { content: ContentType }) {
  return (
    <div class="item col-span-3 md:col-span-1 py-6  ">
      <SmallText>
        <h2 class="text-3a-green mb-1">{props.content.headline}</h2>
      </SmallText>
      <SmallText class="md:pr-16 xl:pr-20">
        <p class="!mb-6">{props.content.teaser}</p>
        {/*<div class="">{AgileAgit.text}</div>*/}
        <Button href={props.content.moreLink.href} asA={true}>
          {props.content.moreLink.title}
        </Button>
      </SmallText>
    </div>
  );
}
