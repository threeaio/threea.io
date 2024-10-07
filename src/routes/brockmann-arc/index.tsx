import { Title } from "@solidjs/meta";
import { HugeText } from "~/components/HugeText";
import { SmallText } from "~/components/SmallText";
import { HeaderSimple } from "~/content/Header-Simple";
import { Headline } from "~/components/Headline";
import { FullWidth } from "~/components/layouts/Full-Width";
import { Divider } from "~/components/Divider";
import { BleedRightSmall } from "~/components/layouts/bleed-right/Bleed-Right-Small";
import { createSignal, onMount, ParentProps } from "solid-js";
import { createIntersectionObserver } from "@solid-primitives/intersection-observer";
import { clientOnly } from "@solidjs/start";
import { MainLogo } from "~/components/Logo";
import { Button } from "~/components/Button";
const ANIMATION_01_IDEA = clientOnly(
  () => import("~/routes/brockmann-arc/animation-step-1"),
);
const ANIMATION_02 = clientOnly(
  () => import("~/routes/brockmann-arc/animation-step-2"),
);
const ANIMATION_03 = clientOnly(
  () => import("~/routes/brockmann-arc/animation-step-3"),
);
const ANIMATION_04 = clientOnly(
  () => import("~/routes/brockmann-arc/animation-step-4"),
);

export default function Home() {
  return (
    <main>
      <Title>Threea - Der Brockmann-Arc</Title>

      <HeaderSimple class="snap-start absolute z-20 w-full" />

      <div class="">
        <BleedRightSmall
          Left={
            <div class="flex h-svh flex-col justify-end pb-24 ">
              <HugeText>
                <h1>Der Brockmann-Arc</h1>
              </HugeText>
              <div class="mb-4 text-3a-paper max-w-96">
                Die Brockmann-Wurst ist inspiriert durch, bzw. verwurstet, das
                ikonische Beethoven-Plakat von Joseph Müller-Brockmann.{" "}
              </div>
            </div>
          }
          Right={
            <div class="bg-3a-gray-darkest h-full">
              <div class="min-h-max h-full w-full mix-blend-lighten">
                <ANIMATION_04 bgColor={"GRAY_DARKEST"} />
              </div>
            </div>
          }
        />

        {/*<FullWidth class="">*/}
        {/*  <div class="h-svh relative flex flex-col justify-center">*/}
        {/*    <HugeText>*/}
        {/*      <h1>Der Brockmann-Arc</h1>*/}
        {/*    </HugeText>*/}
        {/*    <div class="mb-4 text-3a-paper max-w-96">*/}
        {/*      Die Brockmann-Wurst ist inspiriert durch, bzw. verwurstet, das*/}
        {/*      ikonische Beethoven-Plakat von Joseph Müller-Brockmann.{" "}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</FullWidth>*/}
        <Divider />

        {/*////x*/}

        <div>
          <HeaderHere title="Inspiration" num="01">
            <div class="h-full">
              <SmallText class="py-12 pr-12 grid grid-cols-4">
                <div class="">
                  <p>
                    Die Brockmann-Wurst ist inspiriert durch, bzw. verwurstet,
                    das ikonische Beethoven-Plakat von Joseph Müller-Brockmann.{" "}
                  </p>
                </div>
              </SmallText>
            </div>
          </HeaderHere>

          <BleedRightSmall
            class="h-svh "
            Left={<></>}
            Right={
              <div class="bg-3a-gray-darkest h-full overflow-hidden ">
                <div class="h-full w-full mix-blend-lighten overflow-hidden  sticky top-0 ">
                  <img
                    class="object-cover h-full w-full max-h-[100svh] opacity-70 mix-blend-lighten"
                    alt="Josef Müller-Brockmann. beethoven poster(1955)"
                    title="JOSEPH MÜLLER-BROCKMANN, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons"
                    src="/Josef_Müller-Brockmann._beethoven_poster(1955).jpg"
                  />
                </div>
              </div>
            }
          />
        </div>

        {/*////x*/}
        <div>
          <HeaderHere title={"Basis"} num={"02"}>
            <div class="h-full">
              <SmallText class="py-12 pr-12 grid grid-cols-4">
                <div class="">
                  <p>
                    Die Brockmann-Wurst ist inspiriert durch, bzw. verwurstet,
                    das ikonische Beethoven-Plakat von Joseph Müller-Brockmann.{" "}
                  </p>
                </div>
              </SmallText>
            </div>
          </HeaderHere>
          <div style={"height: 200svh"}>
            <ANIMATION_01_IDEA />
          </div>
        </div>

        {/*////x*/}
        <div>
          <HeaderHere title={"Weiteres"} num={"03"}>
            <div class="h-full">
              <SmallText class="py-12 pr-12 grid grid-cols-4">
                <div class="">
                  <p>
                    Die Brockmann-Wurst ist inspiriert durch, bzw. verwurstet,
                    das ikonische Beethoven-Plakat von Joseph Müller-Brockmann.{" "}
                  </p>
                </div>
              </SmallText>
            </div>
          </HeaderHere>
          <div style={"height: 200svh"}>
            <ANIMATION_02 />
          </div>
        </div>
        {/*////x*/}
        <div>
          <HeaderHere title={"Ergebnis"} num={"04"}>
            <div class="h-full">
              <SmallText class="py-12 pr-12 grid grid-cols-4">
                <div class="">
                  <p>
                    Die Brockmann-Wurst ist inspiriert durch, bzw. verwurstet,
                    das ikonische Beethoven-Plakat von Joseph Müller-Brockmann.{" "}
                  </p>
                </div>
              </SmallText>
            </div>
          </HeaderHere>
          <div style={"height: 200svh"}>
            <ANIMATION_03 />
          </div>
        </div>
        {/*////x*/}
        <div class={"mb-24"}>
          <HeaderHere title={"Variationen"} num={"05"}></HeaderHere>
          <FullWidth>
            <div class={"flex flex-row justify-center"}>
              <div class={"bg-3a-gray-darker p-1 mx-1"}>
                <div class="h-[40svh] 2xl:h-[80svh] aspect-[1/1.6] mx-auto ">
                  {/*Der Wrapper kann aktuell nur 100svh, da das Canvas via JS auf diese Höhe gezohgen wird. Konfigurierbar machen!*/}
                  <ANIMATION_04 bgColor={"RED"} />
                </div>
              </div>

              <div class={"bg-3a-gray-darker p-1 mx-1"}>
                <div class="h-[40svh] 2xl:h-[80svh] aspect-[1/1.6] mx-auto ">
                  {/*Der Wrapper kann aktuell nur 100svh, da das Canvas via JS auf diese Höhe gezohgen wird. Konfigurierbar machen!*/}
                  <ANIMATION_04 bgColor={"GREEN"} />
                </div>
              </div>

              <div class={"bg-3a-gray-darker p-1 mx-1"}>
                <div class="h-[40svh] 2xl:h-[80svh] aspect-[1/1.6] mx-auto ">
                  {/*Der Wrapper kann aktuell nur 100svh, da das Canvas via JS auf diese Höhe gezohgen wird. Konfigurierbar machen!*/}
                  <ANIMATION_04 bgColor={"WHITE"} />
                </div>
              </div>
            </div>
          </FullWidth>
        </div>
      </div>
    </main>
  );
}

function HeaderHere(props: { num: string; title: string } & ParentProps) {
  const [targets, setTargets] = createSignal<HTMLElement[]>([]);

  onMount(() => {
    createIntersectionObserver(
      targets,
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle("is-sticky", e.boundingClientRect.y < 0);
        });
      },
      { threshold: [1] },
    );
  });

  return (
    <FullWidth
      ref={(el) => setTargets((list) => [...list, el])}
      class="group transition-all  py-8   duration-300  sticky top-[-1px] z-10"
    >
      <Headline>
        <h2 class="relative py-8 text-3a-green transition-all  text-[.9em] group-[.is-sticky]:text-[length:inherit] group-[.is-sticky]:inline-block">
          <span
            class={"inline-block pr-4 text-3a-white xl:absolute xl:right-full"}
          >
            {props.num}
          </span>
          {props.title}
        </h2>
      </Headline>
      {props.children}
    </FullWidth>
  );
}
