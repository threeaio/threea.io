import { children, createRoot, createSignal, onMount } from "solid-js";
import { gsap } from "gsap";
import { AntiAgony } from "~/content/Anti-Agony";
import { AsyncAction } from "~/content/Async-Action";
import { AgileAgit } from "~/content/Agile-Agit";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/HugeText";
import { SmallText } from "~/components/SmallText";
import { BasicTextContent } from "~/content/content-type";
import { GridIndicator } from "~/components/Grid-Indicator";

export default function AboutWork() {
  const [target, setTarget] = createSignal<HTMLElement | undefined>();

  // const [asyncAction] = createSignal(AsyncAction);
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
                    Erfahrung und{" "}
                    <span class={"text-3a-green"}>Experience</span>
                  </h2>
                </div>
              </div>
            </HugeText>
          </div>
        </FullWidth>

        {/*<GridIndicator />*/}
        <FullWidth>
          <div class="grid grid-cols-1 gap-0 sm:grid-cols-6 pb-36">
            <div class="col-start-4 col-span-2">
              <SectionHere content={AntiAgony} />
              <SectionHere content={AsyncAction} />
              <SectionHere content={AgileAgit} />
            </div>
          </div>
        </FullWidth>
      </div>
    </div>
  );
}

function SectionHere(props: { content: BasicTextContent }) {
  return (
    <div data-animate-item="" class="mb-24">
      <SmallText></SmallText>
      <SmallText class="">
        <h2 class="font-bold float-left mr-1.5 leading-relaxed text-3a-green align-baseline">
          {props.content.headline()}
        </h2>
        <p>{props.content.teaser()}</p>
      </SmallText>
    </div>
  );
}
