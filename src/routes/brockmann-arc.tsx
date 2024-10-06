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
import { BleedRight } from "~/components/layouts/bleed-right/Bleed-Right";
import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { clientOnly } from "@solidjs/start";
import { remapT } from "~/_util/generic.functions";
import { getBrockmannArcSettings } from "~/components/animation/Brockmann-Arcs-Config";
const ANIMATION = clientOnly(
  () => import("~/components/animation/Canvas-Animation-arc-step-1"),
);

export default function Home() {
  return (
    <main>
      <Title>Threea - Der Brockmann-Arc</Title>

      <HeaderSimple class="snap-start absolute z-20 w-full" />

      <div class="">
        <FullWidth class="">
          <div class="h-svh relative flex flex-col justify-center">
            <HugeText>
              <h1>Der Brockmann-Arc</h1>
            </HugeText>
            <div class="mb-4 text-3a-paper max-w-96">
              Die Brockmann-Wurst ist inspiriert durch, bzw. verwurstet, das
              ikonische Beethoven-Plakat von Joseph Müller-Brockmann.{" "}
            </div>
          </div>
        </FullWidth>
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
          <div class="relative">
            <CanvasAnimationWrapper
              start={"clamp(top top+=80%)"}
              end={"clamp(bottom bottom-=100%)"}
              animation={
                <ANIMATION
                  draw={function (p5, progress, arcs, center) {
                    // Math.sin(p5.millis() / 800) + 1.2
                    const p = remapT(progress, 0, 0.5);
                    for (let i = 0; i < arcs.length; i++) {
                      arcs[i].setCenterX(center.x);
                      arcs[i].setCenterY(center.y);
                      arcs[i].setProgress(p);
                      arcs[i].draw();
                    }
                  }}
                  getStartRadius={(w, h) => h / 5}
                  arcSettings={{
                    ...getBrockmannArcSettings(),
                    arcRange: [12],
                    sizes: [60],
                    amountOfArcs: 1,
                  }}
                  arcConfig={{
                    debug: true,
                  }}
                  setCenter={(width, height, progress) => {
                    return {
                      x: width / 2 + width / 4,
                      y: height / 8 + height * progress,
                    };
                  }}
                />
              }
            >
              <BleedRightSmall
                class="h-svh "
                Left={<div class="h-svh "></div>}
                Right={<div class="h-svh "></div>}
              />
            </CanvasAnimationWrapper>
          </div>
        </div>

        {/*////x*/}
        <HeaderHere title={"Weiteres"} num={"03"}>
          <div class="h-full">
            <SmallText class="py-12 pr-12 grid grid-cols-4">
              <div class="">
                <p>
                  Die Brockmann-Wurst ist inspiriert durch, bzw. verwurstet, das
                  ikonische Beethoven-Plakat von Joseph Müller-Brockmann.{" "}
                </p>
              </div>
            </SmallText>
          </div>
        </HeaderHere>
        <div class="relative">
          <CanvasAnimationWrapper
            start={"clamp(top top+=30%)"}
            end={"clamp(bottom bottom-=100%)"}
            animation={
              <ANIMATION
                draw={function (p5, progress, arcs, center) {
                  // Math.sin(p5.millis() / 800) + 1.2
                  const p = progress;
                  for (let i = 0; i < arcs.length; i++) {
                    arcs[i].setCenterX(center.x);
                    arcs[i].setCenterY(center.y);
                    arcs[i].setProgress(p);
                    arcs[i].draw();
                  }
                }}
                getStartRadius={(w) => w / 8}
                arcSettings={{
                  ...getBrockmannArcSettings(),
                }}
                arcConfig={{
                  debug: false,
                }}
                setCenter={(width, height, _progress) => {
                  return {
                    x: width / 2 + width / 4,
                    y: height / 2,
                  };
                }}
              />
            }
          >
            <BleedRightSmall
              class="h-svh "
              Left={<div class="h-svh "></div>}
              Right={<div class="h-svh "></div>}
            />
          </CanvasAnimationWrapper>
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
        <h2 class="relative py-8 pr-8 text-3a-green bg-3a-gray-darkest transition-all  text-[.9em] group-[.is-sticky]:text-[length:inherit] group-[.is-sticky]:inline-block">
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
