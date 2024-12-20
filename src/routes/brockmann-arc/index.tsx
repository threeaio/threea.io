import { Title } from "@solidjs/meta";
import { HugeText } from "~/components/typo/HugeText";
import { SmallText } from "~/components/typo/SmallText";
import { HeaderSimple } from "~/content/Header-Simple";
import { FullWidth } from "~/components/layouts/Full-Width";
import { Divider } from "~/components/Divider";
import { BleedRightSmall } from "~/components/layouts/bleed-right/Bleed-Right-Small";
import {
  Accessor,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  ParentProps,
} from "solid-js";
import { createIntersectionObserver } from "@solid-primitives/intersection-observer";
import { clientOnly } from "@solidjs/start";
import { AnimationTrigger, createArrayFromLength, reMap } from "~/_util";
import {
  AnimatedSubSection,
  gallery,
  inspiration,
  intro,
  step1,
  step2,
  step3,
} from "~/routes/brockmann-arc/content";
import { PosterTextHeadline } from "~/components/animation-html-additions/Poster-Headline";
import { PosterContentBeethoven } from "~/components/animation-html-additions/Poster-Content";
import {
  useNavigationContext,
  NavigationConfiguration,
  NavigationItem,
  AnchorProps,
} from "~/Navigation-Context";
import { gsap } from "gsap";
import Kbd from "~/components/typo/Kbd";

const ANIMATION_04 = clientOnly(
  () => import("~/routes/brockmann-arc/animation-step-4"),
);
const ANIMATION_05 = clientOnly(
  () => import("~/routes/brockmann-arc/animation-step-5"),
);

export default function BrockmannArc() {
  const [animateClick, setAnimateClick] = createSignal<AnimationTrigger>();
  const [_, { setOnThisPage, setPages }] = useNavigationContext();
  onMount(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() === "A") {
        setAnimateClick(event);
      }
    };
    document.addEventListener("keydown", listener);
    onCleanup(() => {
      document.removeEventListener("keydown", listener);
    });
  });

  const navItems: NavigationItem<AnchorProps>[] = [
    {
      linkProps: { type: "anchor", target: "#BROCKMANN_TOP" },
      title: "Anfang",
    },
    {
      linkProps: { type: "anchor", target: "#BROCKMANN_001" },
      title: "Inspiration",
    },
    {
      linkProps: { type: "anchor", target: "#BROCKMANN_002" },
      title: "Idee zur Animation",
    },
    {
      linkProps: { type: "anchor", target: "#BROCKMANN_003" },
      title: "Weitere Parameter",
    },
    {
      linkProps: { type: "anchor", target: "#BROCKMANN_004" },
      title: "Ergebnis + Zwischenfazit",
    },
    {
      linkProps: { type: "anchor", target: "#BROCKMANN_GALLERY" },
      title: "Gallerie",
    },
  ];

  onMount(() => {
    setOnThisPage(navItems);
    const page = document.querySelector("#PAGE_3a")!;
    gsap.to(page, {
      opacity: 1,
      delay: 0.5,
    });
  });

  return (
    <main>
      <Title>Threea.io - Brockmanns Beethoven</Title>

      <HeaderSimple class="snap-start absolute z-20 w-full" />

      <div class="" id={"BROCKMANN_TOP"}>
        <div class="relative">
          <div class="absolute inset-0">{intro.animation()}</div>
          <div class="relative">
            <FullWidth>
              <div>
                <div class="flex h-svh flex-col justify-end pb-8 md:pb-12 xl:pb-20 2xl:pb-24 ">
                  <HugeText>
                    <div class={"grid  md:grid-cols-3"}>
                      <div class={"md:col-span-2 md:text-right"}>
                        <h1 class={"mb-12"}>{intro.headline()}</h1>
                      </div>
                    </div>
                  </HugeText>
                  <div class={"grid md:grid-cols-3 "}>
                    <div class={"md:col-start-3"}>
                      <SmallText>
                        <div class="text-sm xl:w-1/2 pr-8 xl:pr-0">
                          {intro.text()}
                        </div>
                      </SmallText>
                    </div>
                  </div>
                </div>
              </div>
            </FullWidth>
            <div class="bg-gradient-to-t from-3a-gray-darkest to-transparent ">
              <Divider />
            </div>
          </div>
        </div>

        {/* Inspiration */}

        <div class={"relative py-32"} id={"BROCKMANN_001"}>
          <RotatedPageBg rotateClass={"rotate-2"} />
          <BleedRightSmall
            class="relative"
            Left={
              <StickyStepDescription
                addLayout={false}
                title={inspiration.title}
                num={inspiration.num}
              >
                <HeaderDescriptionDefaultHere
                  class={"grid grid-cols-1 pr-8 xl:grid-cols-2 xl:pr-0"}
                >
                  {inspiration.text()}
                </HeaderDescriptionDefaultHere>
              </StickyStepDescription>
            }
            Right={
              <div class="w-full mix-blend-lighten">
                <img
                  class="object-contain w-full max-h-[100svh] opacity-70 mix-blend-lighten"
                  alt="Josef Müller-Brockmann. beethoven poster(1955)"
                  title="JOSEPH MÜLLER-BROCKMANN, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons"
                  src="/Josef_Müller-Brockmann._beethoven_poster_1955.jpg"
                />
              </div>
            }
          />
        </div>

        {/* Inspiration Ende */}

        <FullAnimatedBg content={step1} withRotatedBg={false} />
        <div>
          <ControllerHere>
            <ClickForAnimationControl setAnimateClick={setAnimateClick} />
          </ControllerHere>
          <FullAnimatedBg
            content={step2}
            withRotatedBg={"-rotate-2"}
            animationTrigger={animateClick}
          />
          <FullAnimatedBg
            content={step3}
            withRotatedBg={false}
            animationTrigger={animateClick}
          />
        </div>

        {/*////x*/}
        <div class={"mb-24"} id={"BROCKMANN_GALLERY"}>
          {/*<ControllerHere>*/}
          {/*  <div class="flex flex-row justify-center">*/}
          {/*    <div class="flex flex-row rounded-lg bg-3a-gray-darker shadow-3a-black/30 shadow-lg font-mono text-sm">*/}
          {/*      <button class={"p-3 text-3a-green"} onClick={setAnimateClick}>*/}
          {/*        Klicke hier oder drücke <Kbd>A</Kbd> für Variationen*/}
          {/*      </button>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</ControllerHere>*/}
          <StickyStepDescription
            addLayout={true}
            title={gallery.title}
            num={gallery.num}
            noStick={true}
          ></StickyStepDescription>

          <FullWidth class={"mt-12"}>
            <div class={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
              {/*Poster 1*/}
              <AnimationAsPoster>
                <ANIMATION_04
                  bgColor={"RED"}
                  animateBpm={15}
                  animateCommand={animateClick()}
                />
                <PosterContentBeethoven>Iggy Pop</PosterContentBeethoven>
              </AnimationAsPoster>

              {/*Poster 2*/}
              <AnimationAsPoster>
                <ANIMATION_04
                  bgColor={"WHITE"}
                  animateOffsetMs={250}
                  animateBpm={15}
                  animateCommand={animateClick()}
                />
                <PosterContentBeethoven>Miles Davis</PosterContentBeethoven>
              </AnimationAsPoster>

              {/*Poster 3*/}
              <AnimationAsPoster>
                <ANIMATION_04
                  animateOffsetMs={500}
                  animateBpm={15}
                  bgColor={"GREEN"}
                  animateCommand={animateClick()}
                />
                <PosterContentBeethoven>Ice Cube</PosterContentBeethoven>
              </AnimationAsPoster>

              {/*<div class={"col-span-3 py-64"}>*/}
              {/*  <HugeText>Da geht noch anderes</HugeText>*/}
              {/*</div>*/}

              {/*Cover 1*/}
              <AnimationAsSquare right={true}>
                <ANIMATION_05
                  animateBpm={7.5}
                  bgColor={"WHITE"}
                  progress={0.2}
                  speed={2000}
                  ampl={5}
                  animateCommand={animateClick()}
                  arcSettingsPartial={{ amountOfArcs: 7 }}
                />
                <AnimationTypoForSquare>
                  <PosterTextHeadline>
                    Anti
                    <br />
                    Agonie
                  </PosterTextHeadline>
                </AnimationTypoForSquare>
              </AnimationAsSquare>
              {/*Cover 2*/}
              <AnimationAsSquare>
                <ANIMATION_05
                  animateBpm={7.5}
                  bgColor={"WHITE"}
                  progress={0.24}
                  speed={4000}
                  ampl={3}
                  animateCommand={animateClick()}
                  arcSettingsPartial={{
                    amountOfArcs: 5,
                    gap: 3,
                    arcRange: createArrayFromLength(12).map(
                      (i) => i * 1.5 + 0.5,
                    ),
                    sizes: createArrayFromLength(12).map(
                      (i) => Math.pow(i, i) * 0.5,
                    ),
                  }}
                />
                <AnimationTypoForSquare>
                  <PosterTextHeadline>
                    Asynchrone
                    <br />
                    Aktion
                  </PosterTextHeadline>
                </AnimationTypoForSquare>
              </AnimationAsSquare>
              {/*Cover 3*/}
              <AnimationAsSquare right={true}>
                <ANIMATION_05
                  animateBpm={30}
                  bgColor={"WHITE"}
                  progress={0.27}
                  speed={2000}
                  ampl={2}
                  animateCommand={animateClick()}
                  arcSettingsPartial={{
                    amountOfArcs: 18,
                    gap: 20,
                    arcRange: createArrayFromLength(18).map((i) =>
                      reMap(0, 18, 4, 32, i),
                    ),
                    sizes: createArrayFromLength(18).map((i) => 1.6),
                  }}
                />
                <AnimationTypoForSquare>
                  <PosterTextHeadline>
                    Agile
                    <br />
                    Agit
                  </PosterTextHeadline>
                </AnimationTypoForSquare>
              </AnimationAsSquare>
              {/*Cover 4*/}
              <AnimationAsSquare>
                <ANIMATION_05
                  animateBpm={7.5}
                  bgColor={"GRAY_DARKER"}
                  strokeColor={"RED"}
                  progress={0.3}
                  speed={6000}
                  ampl={12}
                  animateCommand={animateClick()}
                  arcSettingsPartial={{
                    amountOfArcs: 18,
                    gap: 2,
                    arcRange: createArrayFromLength(18).map((i) =>
                      reMap(0, 18, 4, 32, i),
                    ),
                    sizes: createArrayFromLength(18).map((i) => i * i),
                  }}
                />
                <AnimationTypoForSquare>
                  <PosterTextHeadline>
                    <span class={"text-3a-green font-black uppercase"}>
                      Angle
                      <br />
                      Vector
                      <br />
                      Triangle
                    </span>
                  </PosterTextHeadline>
                </AnimationTypoForSquare>
              </AnimationAsSquare>
            </div>
          </FullWidth>
        </div>
      </div>
      <Divider />
    </main>
  );
}

function AnimationAsPoster(props: ParentProps) {
  return (
    <div class={""}>
      <div
        class={
          "bg-3a-gray-darker h-full w-full p-2 xl:p-4  max-h-[100svh] aspect-[1/1.414] mx-auto"
        }
      >
        <div class="relative h-full w-full ">{props.children}</div>
      </div>
    </div>
  );
}

function AnimationAsSquare(props: ParentProps & { right?: true }) {
  return (
    <div
      class={`bg-3a-gray-darker p-2 xl:p-12 2xl:p-32  md:col-span-2 ${props.right && "md:col-start-2"}`}
    >
      <div class="relative aspect-[1/1]">{props.children}</div>
    </div>
  );
}

function AnimationTypoForSquare(props: ParentProps) {
  return (
    <span class="absolute origin-bottom-right right-1/3 bottom-1/3 scale-75 xl:scale-100">
      {props.children}
    </span>
  );
}

function RotatedPageBg(props: { rotateClass: string }) {
  return (
    <div class={"absolute inset-0 overflow-hidden"}>
      <div
        class={`bg-3a-gray-darker absolute inset-x-0 inset-y-12 scale-x-150 ${props.rotateClass}`}
      ></div>
    </div>
  );
}

function FullAnimatedBg(props: {
  content: AnimatedSubSection;
  withRotatedBg: false | string;
  animationTrigger?: Accessor<AnimationTrigger>;
}) {
  return (
    <div
      class={`relative ${!!props.withRotatedBg && "py-24"}`}
      id={`BROCKMANN_${props.content.num}`}
    >
      {!!props.withRotatedBg && (
        <RotatedPageBg rotateClass={props.withRotatedBg} />
      )}
      <div class={"relative"}>
        <StickyStepDescription
          addLayout={true}
          title={props.content.title}
          num={props.content.num}
        >
          <HeaderDescriptionDefaultHere
            class={"grid md:grid-cols-2 xl:grid-cols-3 pr-8"}
          >
            {props.content.description()}
          </HeaderDescriptionDefaultHere>
        </StickyStepDescription>
        <div style={"height: 200svh"} class={"relative md:static"}>
          {props.content.animation(props.animationTrigger)}
        </div>
      </div>
    </div>
  );
}

function HeaderDescriptionDefaultHere(
  props: ParentProps & JSX.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div class={`h-full ${props.class}`}>
      <SmallText class="py-12">
        <div class="">{props.children}</div>
      </SmallText>
    </div>
  );
}

function ControllerHere(props: ParentProps) {
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
    <div
      ref={(el) => setTargets((list) => [...list, el])}
      class={`group transition-all duration-600 z-50 sticky  top-[-1px]`}
    >
      <div
        class={`absolute w-full left-0 transition scale-75 opacity-0 group-[.is-sticky]:opacity-100 group-[.is-sticky]:scale-100  `}
      >
        {props.children}
      </div>
    </div>
  );
}

function ClickForAnimationControl(props: { setAnimateClick: () => void }) {
  return (
    <div class="flex flex-row justify-center pt-2 pl-2  ">
      <div class="flex flex-row rounded-lg bg-3a-gray-darker shadow-3a-black/30 shadow-lg font-mono text-sm">
        <button
          class={"p-3 text-3a-green text-left sm:text-center"}
          onClick={props.setAnimateClick}
        >
          Klicke hier
          <span class={"hidden sm:inline"}>
            {" "}
            oder drücke <Kbd>A</Kbd>
          </span>{" "}
          für Variationen
        </button>
      </div>
    </div>
  );
}

function StickyStepDescription(
  props: {
    num: string;
    title: string;
    addLayout: boolean;
    noStick?: boolean;
  } & ParentProps,
) {
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

  const content = (
    <>
      {/*<Headline>*/}
      <h2 class="relative font-mono text-3a-green transition-all group-[.is-sticky]:inline-block">
        <span
          class={"inline-block pr-4 text-3a-white xl:absolute xl:right-full"}
        >
          {props.num}
        </span>
        {props.title}
      </h2>
      {/*</Headline>*/}
      {props.children}
    </>
  );

  const wrapperClasses = `group transition-all py-8 duration-300 relative z-20 ${!props.noStick ? "md:sticky md:top-[-1px]" : ""}`;

  if (props.addLayout) {
    return (
      <FullWidth
        ref={(el) => setTargets((list) => [...list, el])}
        class={wrapperClasses}
      >
        {content}
      </FullWidth>
    );
  } else {
    return (
      <div
        ref={(el) => setTargets((list) => [...list, el])}
        class={wrapperClasses}
      >
        {content}
      </div>
    );
  }
}
