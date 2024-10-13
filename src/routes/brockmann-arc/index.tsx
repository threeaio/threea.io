import { Title } from "@solidjs/meta";
import { HugeText } from "~/components/HugeText";
import { SmallText } from "~/components/SmallText";
import { HeaderSimple } from "~/content/Header-Simple";
import { Headline } from "~/components/Headline";
import { FullWidth } from "~/components/layouts/Full-Width";
import { Divider } from "~/components/Divider";
import { BleedRightSmall } from "~/components/layouts/bleed-right/Bleed-Right-Small";
import { createSignal, JSX, onCleanup, onMount, ParentProps } from "solid-js";
import { createIntersectionObserver } from "@solid-primitives/intersection-observer";
import { clientOnly } from "@solidjs/start";
import Kbd from "~/components/typo/Kbd";
import Anf from "~/components/typo/Anf";
import { createArrayFromLength } from "~/_util";

const ANIMATION_00_INTRO = clientOnly(
  () => import("~/routes/brockmann-arc/animation-intro"),
);

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
const ANIMATION_05 = clientOnly(
  () => import("~/routes/brockmann-arc/animation-step-5"),
);

interface AnimatedSubSection {
  num: string;
  title: string;
  description: () => JSX.Element;
  animation: () => JSX.Element;
}

export default function BrockmannArc() {
  const [animateClick, setAnimateClick] = createSignal<
    PointerEvent | MouseEvent | KeyboardEvent | undefined
  >();
  onMount(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "A" || event.key === "a") {
        setAnimateClick(event);
      }
    };
    document.addEventListener("keydown", listener);
    onCleanup(() => {
      document.removeEventListener("keydown", listener);
    });
  });
  const step1: AnimatedSubSection = {
    title: "Idee zur Animation",
    num: "01",
    animation: () => <ANIMATION_01_IDEA />,
    description: () => (
      <>
        <p>
          Nach einigem Probieren und Aufrischen meines 9.
          Klasse-Trigonometrie-Wissens habe ich entschieden, dass die Bögen als
          Rechtecke an einer Position außerhalb der Grafik starten und sich
          dann, in einer fließenden Bewegung, an ihre Zielposition im{" "}
          <Anf>Kreis</Anf> bewegen sollten.
        </p>
        <p>
          Grundlage der Umsetzung ist dann, dass ich von der Länge der Bögen an
          der Zielposition als <Anf>Strecke</Anf> ausgehe und anhand einer fixen
          Auflösung Punkte auf dieser zeichne. Diese <Anf>Strecke</Anf> wird
          dann Anhand eines Animationsparameters verschoben.
        </p>
        <p>
          Je nachdem, ob einer dieser Punkte an dem Mittelpunkt des Kreises
          vorbei ist oder nicht, werden die Koordination dieses Punktes entweder
          an ihrer Position belassen oder auf den Kreis <Anf>projiziert</Anf>.
        </p>
      </>
    ),
  };

  const step2: AnimatedSubSection = {
    title: "Weiteres",
    num: "02",
    animation: () => <ANIMATION_02 />,
    description: () => (
      <>
        <p>
          Auch ohne selbst Lineal und Zirkel anzulegen, lassen sich schnell ein
          paar Parameter zur Geometrie des Plakats finden.
        </p>
        <p>
          So liegen die Winkel selbst auf einem Raster, welches den Kreis in 32
          Segmente unterteilt &ndash; also 11.25&deg;. Die <Anf>Dicke</Anf> der
          Bögen verdoppelt sich nach außen hin mit jedem Bogen.
        </p>
        <p>
          Ich habe mich hier entschieden eine leichte Zufälligkeit in den Start-
          und End-Winkel einzubauen, um das Ganze ein wenig interessanter zu
          gestalten.
        </p>
        <p>
          Da die Bögen auch links vom Mittelpunktes des Kreises aus{" "}
          <Anf>starten</Anf> können, wurde eine Extra-Drehung eingbaut, um
          dieses einfach abzubilden.
        </p>
      </>
    ),
  };

  const step3: AnimatedSubSection = {
    title: "Zwischenergebnis",
    num: "03",
    animation: () => <ANIMATION_03 animateCommand={animateClick()} />,
    description: () => (
      <>
        <p>
          Hier ist ein weiterer Zufallsparameter eingabaut, der die
          Startposition der Bögen verschiebt.
        </p>
        {/*<p>*/}
        {/*  Durch Drücken der <Kbd>A</Kbd>-Taste kannst du sowohl Startposition,*/}
        {/*  als auch die Zielwinkel auf neue Werte animieren*/}
        {/*</p>*/}
        {/*<h3>Zwischenfazit</h3>*/}
        <p>
          Es gäbe noch einige weitere Ideen. Trotzdem lege ich hier erstmal eine
          Pause ein und schaue, was sich mit ein paar Parametern aus diesem Teil
          generieren lässt.
        </p>
        {/*<p>*/}
        {/*  Neben den fehlenden Segmenten, wirkt das <Anf>Einfahren</Anf> von*/}
        {/*  links und die damit verbundene <Anf>Extra-Umdrehung</Anf> noch nicht*/}
        {/*  so, wie ich es mir ausgemalt hatte.*/}
        {/*</p>*/}
        {/*<p>*/}
        {/*  Trotzdem lege ich hier erstmal eine Pause ein und schaue, was sich mit*/}
        {/*  ein paar Parametern aus diesem Teil generieren lässt.*/}
        {/*</p>*/}
      </>
    ),
  };

  return (
    <main>
      <Title>Threea - Brockmanns Beethoven</Title>

      <HeaderSimple class="snap-start absolute z-20 w-full" />

      <div class="">
        <div class="relative">
          <div class="absolute inset-0">
            <ANIMATION_00_INTRO bgColor={"GRAY_DARKEST"}></ANIMATION_00_INTRO>
          </div>
          <div class="relative">
            <FullWidth>
              <div>
                <div class="flex h-svh flex-col justify-end pb-8 md:pb-12 xl:pb-20 2xl:pb-24 ">
                  <HugeText>
                    <div class={"grid  md:grid-cols-3"}>
                      <div class={"md:col-span-2 md:text-right"}>
                        <h1 class={"mb-12"}>
                          Brockmanns
                          <br /> Beethoven
                        </h1>
                      </div>
                    </div>
                  </HugeText>
                  <div class={"grid md:grid-cols-3 "}>
                    <div class={"md:col-start-3"}>
                      <SmallText>
                        <div class="text-sm xl:w-1/2">
                          <p>
                            Ziel hier ist es, ein paar Grundlagen in der
                            Generierung von Grafik (mit Canvas bzw. P5.js) zu
                            verinnerlichen und nebenbei etwas <Anf>Schönes</Anf>{" "}
                            zu erstellen
                          </p>
                          {/*<p>*/}
                          {/*  Natürlich soll am Ende auch etwas <Anf>Schönes</Anf>{" "}*/}
                          {/*  dabei herauskommen. Jedoch ohne den genauen Zweck*/}
                          {/*  hierfür schon zu kennen.*/}
                          {/*</p>*/}
                          <p>Das Projekt wird fortlaufend aktualisiert.</p>
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

        {/*////x*/}

        <div class={"relative py-32"}>
          <RotatedPageBg rotateClass={"rotate-2"} />
          <BleedRightSmall
            class="relative"
            Left={
              <HeaderHere addLayout={false} title="Inspiration" num="01">
                <HeaderDescriptionDefaultHere
                  class={"grid grid-cols-1 pr-8 xl:grid-cols-2 xl:pr-0"}
                >
                  <p>
                    Inspiriert ist dieser erste Wurf durch{" "}
                    <a
                      href="https://de.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann"
                      title={"Zum Wikipedia-Eintrag von Josef Müller-Brockmann"}
                      target={"_blank"}
                    >
                      Josef Müller-Brockmanns
                    </a>{" "}
                    Beethoven-Plakat von 1955.
                  </p>
                  <p>
                    Müller-Brockmann wird hier wohl noch häufiger herhalten
                    müssen, einerseites als Grundlage für grafische Arbeiten,
                    aber auch als Stichwortgeber für theoretische Gedanken.
                  </p>
                  <p>
                    Der humanistische Anspruch spiegelt sich in seinen Arbeiten
                    ebenso wieder, wie die Erkenntnis, dass Ästhetik auch
                    mathematischen Gesetzmäßigkeiten folgt.
                  </p>
                </HeaderDescriptionDefaultHere>
              </HeaderHere>
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

        {/*<FullAnimatedBg content={step1} withRotatedBg={false} />*/}
        {/*<FullAnimatedBg content={step2} withRotatedBg={"-rotate-2"} />*/}
        {/*<FullAnimatedBg content={step3} withRotatedBg={false} />*/}

        {/*////x*/}
        <div class={"mb-24"}>
          <ControllerHere>
            <div class="flex flex-row justify-center">
              <div class="flex flex-row rounded-lg bg-3a-gray-darker shadow-3a-black/30 shadow-lg font-mono text-sm">
                <button class={"p-3 text-3a-green"} onClick={setAnimateClick}>
                  Klicke hier oder drücke <Kbd>A</Kbd> für Variationen
                </button>
              </div>
            </div>
          </ControllerHere>
          <HeaderHere
            addLayout={true}
            title={"Galerie"}
            num={"05"}
            noStick={true}
          ></HeaderHere>

          <FullWidth class={"mt-12"}>
            <div class={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
              <div class={"bg-3a-gray-darker p-2 xl:p-4"}>
                <div class="relative max-h-[100svh] aspect-[1/1.6] mx-auto ">
                  <ANIMATION_04
                    bgColor={"RED"}
                    animateBpm={15}
                    animateCommand={animateClick()}
                  />
                  <PosterText>Iggy Pop</PosterText>
                </div>
              </div>
              <div class={"bg-3a-gray-darker p-2 xl:p-4"}>
                <div class="relative max-h-[100svh] aspect-[1/1.6] mx-auto">
                  <ANIMATION_04
                    bgColor={"WHITE"}
                    animateOffsetMs={100}
                    animateBpm={30}
                    animateCommand={animateClick()}
                  />
                  <PosterText>Miles Davis</PosterText>
                </div>
              </div>
              <div class={"bg-3a-gray-darker p-2 xl:p-4"}>
                <div class="relative max-h-[100svh] aspect-[1/1.6] mx-auto">
                  <ANIMATION_04
                    animateOffsetMs={200}
                    animateBpm={15}
                    bgColor={"GREEN"}
                    animateCommand={animateClick()}
                  />
                  <PosterText>Ice Cube</PosterText>
                </div>
              </div>
              <div
                class={
                  "bg-3a-gray-darker p-2 xl:p-32 md:col-start-2 md:col-span-2"
                }
              >
                <div class="relative aspect-[1/1]">
                  <ANIMATION_05
                    animateBpm={30}
                    bgColor={"WHITE"}
                    progress={0.2}
                    speed={2000}
                    ampl={3}
                    animateCommand={animateClick()}
                    arcSettingsPartial={{}}
                  />
                  <span class="absolute origin-bottom-right right-1/3 bottom-1/3 scale-75 xl:scale-100">
                    <PosterTextHeadline>
                      Anti
                      <br />
                      Agonie
                    </PosterTextHeadline>
                  </span>
                </div>
              </div>
              <div
                class={
                  "bg-3a-gray-darker p-2 xl:p-32 md:col-start-1 md:col-span-2"
                }
              >
                <div class="relative aspect-[1/1]">
                  <ANIMATION_05
                    animateBpm={30}
                    bgColor={"WHITE"}
                    progress={0.24}
                    speed={4000}
                    ampl={20}
                    animateCommand={animateClick()}
                    arcSettingsPartial={{
                      amountOfArcs: 12,
                      gap: 1,
                      arcRange: createArrayFromLength(12).map((i) => i * 1.5),
                      sizes: createArrayFromLength(12).map(
                        (i) => Math.pow(i, i) * 0.5,
                      ),
                    }}
                  />
                  <span class="absolute origin-bottom-right right-1/3 bottom-1/3 scale-75 xl:scale-100">
                    <PosterTextHeadline>
                      Asynchrone
                      <br />
                      Aktion
                    </PosterTextHeadline>
                  </span>
                </div>
              </div>
              <div
                class={
                  "bg-3a-gray-darker p-2 xl:p-32 md:col-start-2 md:col-span-2"
                }
              >
                <div class="relative aspect-[1/1]">
                  <ANIMATION_05
                    animateBpm={30}
                    bgColor={"WHITE"}
                    progress={0.1}
                    speed={2000}
                    ampl={2}
                    animateCommand={animateClick()}
                    arcSettingsPartial={{
                      amountOfArcs: 28,
                      gap: 1,
                      arcRange: createArrayFromLength(28).map((i) => 4),
                      sizes: createArrayFromLength(28).map((i) => 10),
                    }}
                  />
                  <span class="absolute origin-bottom-right right-1/3 bottom-1/3 scale-75 xl:scale-100">
                    <PosterTextHeadline>
                      Agile
                      <br />
                      Agit
                    </PosterTextHeadline>
                  </span>
                </div>
              </div>
            </div>
          </FullWidth>
        </div>
      </div>
      <Divider />
    </main>
  );
}

function PosterTextHeadline(props: ParentProps) {
  return (
    <span class="block text-sm 2xl:text-base text-3a-gray-darker font-display text-right !leading-tight lowercase">
      {props.children}
    </span>
  );
}
function PosterText(props: ParentProps) {
  // return <></>;
  return (
    <>
      <span class="absolute origin-bottom-right scale-100 md:scale-75 xl:scale-100 right-2/3 bottom-1/3  pb-4">
        <PosterTextHeadline>
          <span class={"whitespace-nowrap"}>{props.children}</span>
        </PosterTextHeadline>
      </span>
      <span class="absolute left-1/3 top-2/3 origin-top-left scale-100 md:scale-75 xl:scale-100">
        <span class={"grid gap-1 mix-blend-multiply opacity-20"}>
          <span class={"bg-3a-black h-1 w-12"}></span>
          <span class={"bg-3a-black h-1 w-9"}></span>
          <span class={"bg-3a-black h-1 w-16"}></span>
          <span class={"bg-3a-black h-1 w-9"}></span>
          <span class={"bg-3a-black h-1 w-12"}></span>
          <span class={"bg-3a-black h-1 w-9"}></span>
          <span class={"bg-3a-black h-1 w-16"}></span>
          <span class={"bg-3a-black h-1 w-9"}></span>
        </span>
      </span>
    </>
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
}) {
  return (
    <div class={`relative ${!!props.withRotatedBg && "py-24"}`}>
      {!!props.withRotatedBg && (
        <RotatedPageBg rotateClass={props.withRotatedBg} />
      )}
      <div class={"relative"}>
        <HeaderHere
          addLayout={true}
          title={props.content.title}
          num={props.content.num}
        >
          <HeaderDescriptionDefaultHere
            class={"grid grid-cols-2 xl:grid-cols-3"}
          >
            {props.content.description()}
          </HeaderDescriptionDefaultHere>
        </HeaderHere>
        <div style={"height: 200svh"}>{props.content.animation()}</div>
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
      class={`group transition-all duration-600 z-30 sticky top-[-1px]`}
    >
      <div
        class={`absolute w-full  pt-4 left-0 transition scale-75 opacity-0 group-[.is-sticky]:opacity-100 group-[.is-sticky]:scale-100  `}
      >
        {props.children}
      </div>
    </div>
  );
}

function HeaderHere(
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

  if (props.addLayout) {
    return (
      <FullWidth
        ref={(el) => setTargets((list) => [...list, el])}
        class={`group transition-all py-8 duration-300 relative z-20 ${!props.noStick ? "md:sticky md:top-[-1px]" : ""}`}
      >
        {content}
      </FullWidth>
    );
  } else {
    return (
      <div
        ref={(el) => setTargets((list) => [...list, el])}
        class={`group transition-all py-8 duration-300 relative z-20 ${!props.noStick ? "md:sticky md:top-[-1px]" : ""}`}
      >
        {content}
      </div>
    );
  }
}
