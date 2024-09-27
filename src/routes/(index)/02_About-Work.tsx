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
            once: true,
            start: "30rem 50%",
            end: "bottom bottom-=100px",
          },
        });

        tl.addLabel("heading")
          .from("#big-headline-index", {
            y: 80,
            autoAlpha: 0,
            duration: 1,
            delay: 0.4,
          })
          .from(
            ".headline-item",
            {
              autoAlpha: 0,
              duration: 2,
              y: 20,
            },
            ">+=0",
          )
          .from(".headline-item", {
            paddingLeft: "0%",
            duration: 2,
          })
          // .to(
          //   container,
          //   {
          //     position: "static",
          //   },
          //   ">-=0",
          // )
          .from(
            ".item",
            {
              autoAlpha: 0,
              stagger: 0.4,
              duration: 1,
              scale: 0.95,
              y: 100,
            },
            ">=-0.3",
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
        <div class="pb-64 sticky top-0" ref={(el) => (container = el)}>
          <FullWidth>
            <HugeText>
              <div
                id="big-headline-index"
                class=" flex items-center py-6 md:py-8 xl:py-12 pt-32 xl:pt-64  "
              >
                <h2 class="text-pretty">
                  From Experience to Concept to Code{" "}
                  <span class="headline-item text-3a-green inline-block xl:pl-[33.3%] xl:whitespace-nowrap">
                    to Experience
                  </span>
                </h2>
              </div>
            </HugeText>
          </FullWidth>
          <FullWidth>
            <div class="grid grid-cols-1 max-w-[400px] xl:ml-[33.3%] mt-12 pb-64">
              <SectionHere content={AntiAgony} />
              <SectionHere content={AsyncAction} />
              <SectionHere content={AgileAgit} />
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
