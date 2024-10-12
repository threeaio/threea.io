import { createSignal, onMount } from "solid-js";
import { gsap } from "gsap";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/HugeText";
import { SmallText } from "~/components/SmallText";
import { A } from "@solidjs/router";

export default function BlackBook() {
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
                <h2 data-animate-headline="" class="text-pretty max-w-[50rem]">
                  Blackbook
                  <br />
                  {/*<span class={"text-3a-green"}>Code</span>//*/}
                  {/*<span class={"text-3a-green"}>Skizzen</span>//*/}
                  {/*<span class={"text-3a-green"}>Foo</span>*/}
                  {/*<span class="headline-item text-3a-green inline-block ">*/}
                  <span class={"text-3a-green"}>Sketchbook</span>
                  <br />
                  <span class={""}>Poesiealbum</span>
                  {/*</span>*/}
                </h2>
              </HugeText>
            </div>
          </div>
        </FullWidth>
        <ol class={"pb-32"}>
          <BlackBookItem />
        </ol>
      </div>
    </div>
  );
}

function BlackBookItem() {
  return (
    <li data-animate-item="">
      <A
        class="block bg-3a-gray-darker/40 py-8 md:py-12 mb-1 relative group "
        href="/brockmann-arc"
        onClick={() =>
          window.lenis.scrollTo(0, {
            immediate: true,
          })
        }
      >
        <div class={"grid grid-cols-26 items-baseline"}>
          <div class={"col-span-2 md:col-span-4 p-3 2xl:px-3 2xl:text-right"}>
            <div class="md:text-2xl 2xl:text-3xl">01</div>
          </div>
          <div class={"text-3a-green col-span-8 md:col-span-6 p-3 "}>
            <div class="">Animation</div>
          </div>
          <div class={"col-span-14 xl:col-span-6 p-3"}>
            <div class={"text-sm "}>
              <h3 class="font-bold float-left mr-1.5  text-3a-green align-baseline">
                Brockmanns Beethoven
              </h3>
              <p>
                Meine erste Animations-Skizze hier ist inspiriert durch das
                ikonische Beethoven-Plakat von Joseph Müller-Brockmann.
              </p>
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
