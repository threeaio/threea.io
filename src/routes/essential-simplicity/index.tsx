import { createClampEntry } from "~/routes/essential-simplicity/functions/clamp";
import { createLerpEntry } from "~/routes/essential-simplicity/functions/lerp";
import {
  AnchorProps,
  NavigationItem,
  useNavigationContext,
} from "~/Navigation-Context";
import { For, onMount } from "solid-js";
import { Title } from "@solidjs/meta";
import { HeaderSimple } from "~/content/Header-Simple";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/typo/HugeText";
import { Headline } from "~/components/typo/Headline";
import { SmallText } from "~/components/typo/SmallText";
import CodeBlock from "~/components/Code-Block";
import { Divider } from "~/components/Divider";
import { clientOnly } from "@solidjs/start";
import { gsap } from "gsap";
import { createRemapEntry } from "~/routes/essential-simplicity/functions/remap";
import { createSmoothstepEntry } from "~/routes/essential-simplicity/functions/smoothstep";
import { createNormalizeEntry } from "~/routes/essential-simplicity/functions/normalize";
import { BleedRight } from "~/components/layouts/bleed-right/Bleed-Right";

const ANIMATION = clientOnly(
  () => import("~/routes/essential-simplicity/simple-function"),
);

export default function SimpleFunctions() {
  const [_, { setOnThisPage }] = useNavigationContext();

  const functionEntries = [
    createNormalizeEntry(),
    createLerpEntry(),
    createClampEntry(),
    createRemapEntry(),
    createSmoothstepEntry(),
    // Add more functions...
  ];

  // Navigation setup
  const onThisPageItems: NavigationItem<AnchorProps>[] = [
    {
      linkProps: { type: "anchor", target: "#SIMPLE_FUNCTIONS_TOP" },
      title: "Anfang",
    },
    ...functionEntries.map((entry) => ({
      linkProps: { type: "anchor" as "anchor", target: `#${entry.id}` },
      title: entry.title,
    })),
  ];

  onMount(() => {
    setOnThisPage(onThisPageItems);
    const page = document.querySelector("#PAGE_3a")!;
    gsap.to(page, { opacity: 1, delay: 0.5 });
  });

  return (
    <main>
      <Title>
        Threea.io - Essentielle Einfachheit - Basis-Funktionen für Animationen
      </Title>
      <HeaderSimple class=" z-20 w-full" />

      {/* Header section */}
      <FullWidth class="" id="SIMPLE_FUNCTIONS_TOP">
        <div class="py-32 relative flex flex-col justify-center">
          <div
            class={
              "grid items-baseline grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-6 xl:gap-12"
            }
          >
            <div class={"sm:col-span-2"}>
              <HugeText>
                <h1 class="text-left">Essentielle Einfachheit</h1>
              </HugeText>
            </div>
            <div class={"xl:col-start-3 xl:col-span-2"}>
              <SmallText>
                <p>
                  Ich möchte hier ein paar Funktionen darstellen, die sich bei
                  meinem Start in die Welt der generativen Grafik und Animation
                  schon fast wie von selbst in meinen Baukasten geschlichen
                  haben. So ist es dann auch kein Zufall, dass sich diese in so
                  ziemlich jeder Bibliothek zum Thema wiederfinden &ndash; mal
                  unter anderen Namen, mal mit leichten Variationen. Das
                  wirklich Schöne an Ihnen ist ihre Einfachheit und vermutlich
                  daher rührend ihre unfassbar vielseitigen
                  Anwendungsmöglichkeiten.
                </p>
              </SmallText>
            </div>
            <div class={"xl:col-span-2"}>
              <SmallText>
                <p>
                  Es geht hier um mehr als um Helfer für einen simplen Dreisatz,
                  denn ein besonders interessanter Aspekt ist die
                  Verkettungsmöglichkeit dieser Funktionen: Durch Normalisierung
                  auf den Raum zwischen 0 und 1 lassen sich Werte aus völlig
                  unterschiedlichen Kontexten – sei es Scrollposition,
                  Mausbewegung oder Zeit – einheitlich verarbeiten und dann
                  wieder in den gewünschten Zielbereich transformieren. So
                  entstehen komplexe Animationen oft aus der Kombination
                  einfacher mathematischer Transformationen.
                </p>
              </SmallText>
            </div>
          </div>
        </div>
      </FullWidth>

      {/* Function sections */}
      <For each={functionEntries}>
        {(entry) => (
          <>
            <section id={entry.id} class={""}>
              <FullWidth>
                <Headline>
                  <div class="mb-12">{entry.title}</div>
                </Headline>
                <CodeBlock
                  class="mb-12"
                  code={entry.theFunctionText}
                  showCopyButton={true}
                />
              </FullWidth>
              <BleedRight
                Left={
                  <div class="sm:mr-12 xl:mr-20">
                    <SmallText class="mb-8">{entry.description()}</SmallText>
                  </div>
                }
                Right={
                  <div class="h-full min-h-[500px] relative">
                    <ANIMATION
                      functionConfig={{}}
                      xRangeGetter={entry.getXRange}
                      yRangeGetter={entry.getYRange}
                      theFunction={entry.theFunction}
                      bgColor="GRAY_DARKEST"
                    />
                  </div>
                }
              />
            </section>
            <Divider />
          </>
        )}
      </For>
    </main>
  );
}
