import { createSignal, onMount } from "solid-js";
import { gsap } from "gsap";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/typo/HugeText";
import { A } from "@solidjs/router";

export default function BlackBook() {
  const [target, setTarget] = createSignal<HTMLElement | undefined>();

  onMount(() => {
    let mm = gsap.matchMedia(),
      breakPoint = 800;
    const headline = target()!.querySelector('[data-animate-headline=""]');
    const headlineWords = headline!.querySelectorAll("span");
    const yDiffBetweenWords =
      headlineWords[1].getBoundingClientRect().y -
      headlineWords[0].getBoundingClientRect().y;
    const items = target()!.querySelectorAll('[data-animate-item=""]');

    const headlineWordsSequence = [
      [0, 1, 2],
      [0, 1, -1],
      [0, -2, -1],
    ];
    const headlineHighlightSequence = [1, 0, 2];

    let step = 0;

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
        isMobile: `(max-width: ${breakPoint - 1}px) and (prefers-reduced-motion: no-preference)`,
      },
      (context) => {
        const tlWords = gsap.timeline({
          scrollTrigger: {
            trigger: target(),
            scrub: false,
            start: "top top-+=90%",
            end: "bottom bottom+=100px",
          },
        });

        tlWords.to(headlineWords, {
          repeat: -1,
          repeatRefresh: true,
          repeatDelay: 4,
          y: (i) => {
            headlineWords.forEach((item, i) => {
              item.classList.toggle(
                "text-3a-green",
                i === headlineHighlightSequence[step],
              );
            });
            return headlineWordsSequence[i][step] * yDiffBetweenWords;
          },
          duration: 0.3,
          ease: "power2.inOut",
          onRepeat: () => {
            step = (step + 1) % 3;
          },
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: target(),
            scrub: 2,
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
    <div id="INDEX_BLACKBOOK" class={"relative"}>
      <div class="" ref={setTarget}>
        <FullWidth>
          <div class="grid grid-cols-3 pt-36 pb-32">
            <div class={"col-span-3 xl:col-span-2 xl:col-start-2"}>
              <HugeText>
                {/*xl:py-42 mb-[105rem]*/}
                <h2
                  data-animate-headline=""
                  class="text-pretty max-w-[50rem] grid grid-cols-1"
                >
                  <span>Blackbook</span>
                  <span class={"text-3a-green"}>Sketchbook</span>
                  <span>Poesiealbum</span>
                </h2>
              </HugeText>
            </div>
          </div>
        </FullWidth>
        <ol class={"pb-32"}>
          <BlackBookItem
            content={{
              num: "001",
              link: "/brockmann-arc",
              type: "Animation",
              title: "Brockmanns Beethoven",
              description:
                "Meine erste Animations-Skizze hier ist inspiriert durch das ikonische Beethoven-Plakat von Joseph Müller-Brockmann.",
            }}
          />
          <BlackBookItem
            content={{
              num: "002",
              link: "/lerped-randomness",
              type: "Animation",
              title: "Lerped Randomness",
              description:
                "Sammlung von Animations-Skizzen, Canvas-Experimenten und Schnellschüssen anderer Art ohne weiteren Zweck.",
            }}
          />
          <BlackBookItem
            content={{
              num: "003",
              link: "/essential-simplicity",
              type: "Typescript",
              title: "Essential Simplicity",
              description:
                "Sammlung von Funktionen, die ich für wichtig halte und irgendwie auch lieb gewonnen habe.",
            }}
          />
        </ol>
      </div>
    </div>
  );
}

function BlackBookItem(props: {
  content: {
    link: string;
    num: string;
    type: string;
    title: string;
    description: string;
  };
}) {
  return (
    <li data-animate-item="">
      <A
        class="block transition bg-3a-gray-darker/40 py-8 md:py-12 mb-1 relative group hover:bg-3a-gray-darker/60"
        href={props.content.link}
        onPointerUp={(e) => {
          const page = document.querySelector("#PAGE_3a")!;
          gsap.to(page, {
            opacity: 0,
            onComplete: () => {
              window.lenis.scrollTo(0, {
                immediate: true,
              });
              window.location.href = props.content.link;
            },
          });

          e.preventDefault();
          return false;
        }}
      >
        <div class={"grid grid-cols-26 items-baseline"}>
          <div class={"col-span-2 md:col-span-4 p-3 2xl:px-3 2xl:text-right"}>
            <div class="font-mono text-3a-white">{props.content.num}</div>
          </div>
          <div class={"text-3a-green col-span-8 md:col-span-6 p-3 "}>
            <div class="">{props.content.type}</div>
          </div>
          <div class={"col-span-13 xl:col-span-6 p-3"}>
            <div class={"text-sm "}>
              <h3 class="font-bold sm:float-left mr-1.5  text-3a-green align-baseline">
                {props.content.title}
              </h3>
              <p>{props.content.description}</p>
            </div>
          </div>
        </div>
        <div class="absolute right-12 transition top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-4">
          <span class={"text-4xl font-mono text-3a-green"}>→</span>
        </div>
      </A>
    </li>
  );
}
