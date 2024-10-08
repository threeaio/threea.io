import { createSignal, onMount } from "solid-js";
import { gsap } from "gsap";
import { AntiAgony } from "~/content/Anti-Agony";
import { AsyncAction } from "~/content/Async-Action";
import { AgileAgit } from "~/content/Agile-Agit";
import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { Divider } from "~/components/Divider";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/HugeText";
import { SmallText } from "~/components/SmallText";
import { clientOnly } from "@solidjs/start";
import { ContentType } from "~/content/content-type";
const ANIMATION = clientOnly(
  () => import("~/components/animation/Canvas-Animation-2"),
);

export default function AboutWork() {
  const [target, setTarget] = createSignal<HTMLElement | undefined>();

  onMount(() => {
    let mm = gsap.matchMedia(),
      breakPoint = 800;
    const headline = target()!.querySelector('[data-animate-headline=""]');
    const items = target()!.querySelectorAll('[data-animate-item=""]');

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
        isMobile: `(max-width: ${breakPoint - 1}px) and (prefers-reduced-motion: no-preference)`,
      },
      (context) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: target(),
            scrub: 3,
            // once: true,
            start: "top top-+=90%",
            end: "bottom bottom+=100px",
          },
        });

        tl.addLabel("heading")
          .from(headline, {
            y: 120,
            autoAlpha: 0,
            // delay: 1,
          })
          .from(items, {
            autoAlpha: 0,
            stagger: 0.4,
            y: 40,
          });
      },
    );
  });
  return (
    <div id="INDEX_ABOUT_WORK" class={"relative"}>
      <CanvasAnimationWrapper
        start={"clamp(top top+=80%)"}
        end={"clamp(bottom bottom-=100%)"}
        animation={<ANIMATION />}
      >
        <div class="bg-gradient-to-b from-3a-gray-darkest to-transparent ">
          <Divider />
        </div>
        <div class="" ref={setTarget}>
          <FullWidth>
            <div class="grid grid-cols-1 sm:grid-cols-2">
              <HugeText>
                <div class="sticky top-0 ">
                  {/*xl:py-42 mb-[105rem]*/}
                  <div class="flex items-center sm:justify-end py-16 md:py-32   sm:text-right">
                    <h2
                      data-animate-headline=""
                      class="text-pretty max-w-[50rem]"
                    >
                      Erfahrung und Experience
                      {/*<span class="headline-item text-3a-green inline-block ">*/}
                      {/*  Über Arbeit, Code und Konzepte*/}
                      {/*</span>*/}
                    </h2>
                  </div>{" "}
                </div>
              </HugeText>
            </div>
          </FullWidth>

          <FullWidth>
            <div class="grid grid-cols-1 sm:grid-cols-2 pb-[24rem]">
              <div></div>
              <div class="max-w-[400px]  ">
                <SectionHere content={AntiAgony} />
                <SectionHere content={AsyncAction} />
                <SectionHere content={AgileAgit} />
              </div>
            </div>
          </FullWidth>
        </div>

        <FullWidth>
          <div class="h-screen flex flex-col justify-center text-pretty">
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
      </CanvasAnimationWrapper>
    </div>
  );
}

function SectionHere(props: { content: ContentType }) {
  return (
    <div data-animate-item="" class=" col-span-3 md:col-span-1 py-6  ">
      <SmallText>
        <h2 class="text-3a-green mb-1">{props.content.headline}</h2>
      </SmallText>
      <SmallText class="md:pr-16 xl:pr-20">
        <p class="!mb-6">{props.content.teaser}</p>
        {/*<div class="">{AgileAgit.text}</div>*/}
        {/*<Button href={props.content.moreLink.href} asA={true}>*/}
        {/*  {props.content.moreLink.title}*/}
        {/*</Button>*/}
      </SmallText>
    </div>
  );
}
