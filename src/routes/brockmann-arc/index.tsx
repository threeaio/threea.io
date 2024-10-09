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
import Kbd from "~/components/typo/Kbd";
import Anf from "~/components/typo/Anf";

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

export default function BrockmannArc() {
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
                <div class="flex h-svh flex-col justify-end pb-8 2xl:pb-24">
                  <HugeText>
                    <h1 class={"mb-12"}>Brockmanns Beethoven</h1>
                  </HugeText>
                  <div class={"grid md:grid-cols-2 xl:grid-cols-3 "}>
                    <SmallText>
                      <div class="">
                        <p>
                          <strong>Meine erste Animations-Skizze.</strong> Ziel
                          hier ist es, ein paar Grundlagen in der Generierung
                          von Grafik (mit Canvas bzw. P5.js) zu verinnerlichen.
                        </p>
                        <p>
                          Natürlich soll am Ende auch etwas <Anf>Schönes</Anf>{" "}
                          dabei herauskommen. Jedoch ohne den genauen Zweck
                          hierfür schon zu kennen.
                        </p>
                        <p>
                          Das Projekt ist <Anf>Work in Progress</Anf> und so ist
                          es möglich, dass das hier Gezeigte laufender
                          Überarbeitung und Veränderung unterworfen ist.
                        </p>
                      </div>
                    </SmallText>
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

        <div class={""}>
          <HeaderHere title="Inspiration" num="01">
            <HeaderDescriptionDefaultHere>
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
                Müller-Brockmann wird hier wohl noch häufiger herhalten müssen,
                einerseites als Grundlage für grafische Arbeiten, aber auch als
                Stichwortgeber für theoretische Gedanken.
              </p>
              <p>
                Der humanistische Anspruch spiegelt sich in seinen Arbeiten
                ebenso wieder, wie die Erkenntnis, dass Ästhetik auch
                mathematischen Gesetzmäßigkeiten folgt.
              </p>
            </HeaderDescriptionDefaultHere>
          </HeaderHere>

          <BleedRightSmall
            class="h-svh "
            Left={<></>}
            Right={
              <div class="bg-3a-gray-darkest h-full">
                <div class="h-full w-full mix-blend-lighten">
                  <img
                    class="object-cover h-full w-full max-h-[100svh] opacity-70 mix-blend-lighten"
                    alt="Josef Müller-Brockmann. beethoven poster(1955)"
                    title="JOSEPH MÜLLER-BROCKMANN, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons"
                    src="/Josef_Müller-Brockmann._beethoven_poster_1955.jpg"
                  />
                </div>
              </div>
            }
          />
        </div>

        {/*////x*/}
        <div class={"relative"}>
          <HeaderHere title={"Idee zur Animation"} num={"02"}>
            <HeaderDescriptionDefaultHere>
              <p>
                Nach einigem Probieren und dem Aufrischen meines
                Trigonometrie-Wissens der 9. Klasse ;) habe ich mich
                entschieden, dass die Bögen als Rechtecke an einer Position
                außerhalb der Grafik starten und dann, in einer fließenden
                Bewegung, an ihre Zielposition im <Anf>Kreis</Anf> bewegen
                sollten.
              </p>
              <p>
                Grundlage der Umsetzung ist dann, dass ich von der Länge der
                Bögen an der Zielposition als <Anf>Strecke</Anf> ausgehe und
                anhand einer fixen Auflösung Punkte auf dieser zeichne. Diese{" "}
                <Anf>Strecke</Anf> wird dann Anhand eines Animationsparameters
                verschoben.
              </p>
              <p>
                Je nachdem, ob einer dieser Punkte an dem Mittelpunkt des
                Kreises vorbei ist oder nicht, werden die Koordination dieses
                Punktes entweder an ihrer Position belassen oder auf den Kreis{" "}
                <Anf>projiziert</Anf>.
              </p>
              <p>
                Für die Projektion auf den Kreis wird die Differenz des Punktes
                zum Mittelpunkt auf der X-Achse berechnet und dieser Wert dann
                als Bogenmaß verwendet, um den Winkel zu bekommen, welcher
                wiederum den Punkt auf dem Kreis definiert.
              </p>
            </HeaderDescriptionDefaultHere>
          </HeaderHere>

          <div style={"height: 200svh"}>
            <ANIMATION_01_IDEA></ANIMATION_01_IDEA>
          </div>
        </div>

        {/*////x*/}
        <div class={"relative"}>
          <HeaderHere title={"Weiteres"} num={"03"}>
            <HeaderDescriptionDefaultHere>
              <p>
                Auch ohne selbst Lineal und Zirkel anzulegen, lassen sich
                schnell ein paar Parameter zur Geometrie des Plakats finden.
              </p>
              <p>
                So liegen die Winkel selbst auf einem Raster, welches den Kreis
                in 32 Segmente unterteilt &ndash; also 11.25&deg;. Die{" "}
                <Anf>Dicke</Anf> der Bögen verdoppelt sich nach außen hin mit
                jedem Bogen.
              </p>
              <p>
                Ich habe mich hier entschieden eine leichte Zufälligkeit in den
                Start- und End-Winkel einzubauen, um das Ganze ein wenig
                interessanter zu gestalten.
              </p>
              <p>
                Da die Bögen auch links vom Mittelpunktes des Kreises aus{" "}
                <Anf>starten</Anf> können, wurde eine Extra-Drehung eingbaut, um
                dieses einfach abzubilden.
              </p>
              <p>
                Im Original gibt es außerdem teilweise zwei Segemente für
                bestimmte Radien. Das lässt das Ganze im Ergebnis noch{" "}
                <Anf>Runder</Anf> erscheinen. Ich hoffe, dieses in Kürze noch zu
                implementieren.
              </p>
            </HeaderDescriptionDefaultHere>
          </HeaderHere>
          <div class="" style={"height: 200svh"}>
            <ANIMATION_02 />
          </div>
        </div>

        {/*////x*/}
        <div class="relative">
          <HeaderHere title={"Zwischenergebnis"} num={"04"}>
            <HeaderDescriptionDefaultHere>
              <p>
                Hier ist ein weiterer Zufallsparameter eingabaut, der die
                Startposition der Bögen verschiebt.
              </p>
              <p>
                Durch Drücken der <Kbd>A</Kbd>-Taste kannst du sowohl
                Startposition, als auch die Zielwinkel auf neue Werte animieren
              </p>
              <h3>Zwischenfazit</h3>
              <p>Es gäbe noch einige Ideen.</p>
              <p>
                Neben den fehlenden Segmenten, wirkt das <Anf>Einfahren</Anf>{" "}
                von links und die damit verbundene <Anf>Extra-Umdrehung</Anf>{" "}
                noch nicht so, wie ich es mir ausgemalt hatte.
              </p>
              <p>
                Trotzdem lege ich hier erstmal eine Pause ein und schaue, was
                sich mit ein paar Parametern aus diesem Teil generieren lässt.
              </p>
            </HeaderDescriptionDefaultHere>
          </HeaderHere>

          <div style={"height: 200svh"}>
            <ANIMATION_03 />
          </div>
        </div>
        {/*////x*/}
        <div class={"mb-24"}>
          <HeaderHere title={"Galerie"} num={"05"} noStick={true}>
            <HeaderDescriptionDefaultHere>
              <p>
                Alle folgenden Grafiken lassen sich durch Drücken der{" "}
                <span class={"whitespace-nowrap"}>
                  <Kbd>A</Kbd>-Taste
                </span>{" "}
                variieren.
              </p>
            </HeaderDescriptionDefaultHere>
          </HeaderHere>
          <FullWidth>
            <div class={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
              <div class={"bg-3a-gray-darker p-2 xl:p-4"}>
                <div class="relative max-h-[100svh] aspect-[1/1.6] mx-auto ">
                  <ANIMATION_04 bgColor={"RED"} />
                  <PosterText>Iggy Pop</PosterText>
                </div>
              </div>
              <div class={"bg-3a-gray-darker p-2 xl:p-4"}>
                <div class="relative max-h-[100svh] aspect-[1/1.6] mx-auto">
                  <ANIMATION_04 bgColor={"WHITE"} />
                  <PosterText>Miles Davis</PosterText>
                </div>
              </div>
              <div class={"bg-3a-gray-darker p-2 xl:p-4"}>
                <div class="relative max-h-[100svh] aspect-[1/1.6] mx-auto">
                  <ANIMATION_04 bgColor={"GREEN"} />
                  <PosterText>Ice Cube</PosterText>
                </div>
              </div>
              <div class={"bg-3a-gray-darker p-2 xl:p-4 md:col-span-3"}>
                <div class="relative aspect-[4.8/1]">
                  <ANIMATION_05
                    bgColor={"RED"}
                    progress={0.2}
                    speed={2000}
                    ampl={3}
                  />
                  <span class="absolute right-1/3 bottom-1/3 scale-50 md:scale-75 xl:scale-100">
                    <PosterTextHeadline>
                      Anti
                      <br />
                      Agonie
                    </PosterTextHeadline>
                  </span>
                </div>
              </div>
              <div class={"bg-3a-gray-darker p-2 xl:p-4 md:col-span-3"}>
                <div class="relative aspect-[4.8/1]">
                  <ANIMATION_05
                    bgColor={"WHITE"}
                    progress={0.5}
                    speed={4000}
                    ampl={20}
                  />
                  <span class="absolute right-1/3 bottom-1/3 scale-50 md:scale-75 xl:scale-100">
                    <PosterTextHeadline>
                      Asynchrone
                      <br />
                      Aktion
                    </PosterTextHeadline>
                  </span>
                </div>
              </div>
              <div class={"bg-3a-gray-darker p-2 xl:p-4 md:col-span-3"}>
                <div class="relative aspect-[4.8/1]">
                  <ANIMATION_05
                    bgColor={"GREEN"}
                    progress={0.1}
                    speed={2000}
                    ampl={6}
                  />
                  <span class="absolute right-1/3 bottom-1/3 scale-50 md:scale-75 xl:scale-100">
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
  return (
    <div class="">
      <span class="absolute origin-bottom-right scale-100 md:scale-75 xl:scale-100 right-2/3 bottom-1/3  pb-4">
        <PosterTextHeadline>
          <span class={"whitespace-nowrap"}>{props.children}</span>
        </PosterTextHeadline>
      </span>
      <span class="absolute left-1/3 top-2/3 origin-top-left scale-100 md:scale-75 xl:scale-100">
        <span class={"grid gap-1"}>
          <span class={"bg-3a-gray-darker h-1 w-12"}></span>
          <span class={"bg-3a-gray-darker h-1 w-9"}></span>
          <span class={"bg-3a-gray-darker h-1 w-16"}></span>
          <span class={"bg-3a-gray-darker h-1 w-9"}></span>
          <span class={"bg-3a-gray-darker h-1 w-12"}></span>
          <span class={"bg-3a-gray-darker h-1 w-9"}></span>
          <span class={"bg-3a-gray-darker h-1 w-16"}></span>
          <span class={"bg-3a-gray-darker h-1 w-9"}></span>
        </span>
      </span>
    </div>
  );
}

function HeaderDescriptionDefaultHere(props: ParentProps) {
  return (
    <div class="h-full">
      <SmallText class="py-12 grid md:grid-cols-2 xl:grid-cols-3">
        <div class="">{props.children}</div>
      </SmallText>
    </div>
  );
}

function HeaderHere(
  props: { num: string; title: string; noStick?: boolean } & ParentProps,
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

  return (
    <FullWidth
      ref={(el) => setTargets((list) => [...list, el])}
      class={`group transition-all py-8 duration-300 relative z-20 ${!props.noStick ? "md:sticky md:top-[-1px]" : ""}`}
    >
      <Headline>
        <h2 class="relative  text-3a-green transition-all group-[.is-sticky]:inline-block">
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
