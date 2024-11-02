import { createClampEntry } from "~/routes/simple-functions/functions/clamp";
import { createLerpEntry } from "~/routes/simple-functions/functions/lerp";
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
import { BleedRightSmall } from "~/components/layouts/bleed-right/Bleed-Right-Small";
import { Headline } from "~/components/typo/Headline";
import { SmallText } from "~/components/typo/SmallText";
import CodeBlock from "~/components/Code-Block";
import { Divider } from "~/components/Divider";
import { clientOnly } from "@solidjs/start";
import { gsap } from "gsap";
import { createRemapEntry } from "~/routes/simple-functions/functions/remap";
import { createSmoothstepEntry } from "~/routes/simple-functions/functions/smoothstep";
import { createNormalizeEntry } from "~/routes/simple-functions/functions/normalize";

const ANIMATION = clientOnly(
  () => import("~/routes/simple-functions/simple-function"),
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
      <Title>Threea.io - Simple Functions - Mein kleiner Werkzeugkasten</Title>
      <HeaderSimple class="absolute z-20 w-full" />

      {/* Header section */}
      <FullWidth class="" id="SIMPLE_FUNCTIONS_TOP">
        <div class="h-svh relative flex flex-col justify-center">
          <div class={"grid items-baseline grid-cols-3 gap-12"}>
            <HugeText>
              <h1 class="mb-24 text-left">Essentielle Funktionen</h1>
            </HugeText>
            <div>
              <SmallText>
                <p>
                  Das Abbilden von Werten auf einen normalisierten Bereich –
                  meist zwischen 0 und 1 – ist einer der wichtigsten
                  Grundbausteine für Animationen und generative Grafik. Hier
                  zeige ich ein paar nützliche Funktionen, die mir in letzter
                  Zeit geholfen haben, Bewegungen zu steuern und Grafiken zu
                  generieren und die in keinem Baukasten für diesen
                  Anwendungsbereich fehlen sollten.
                </p>
              </SmallText>
            </div>
            <div>
              <SmallText>
                <p>
                  Ein besonders interessanter Aspekt ist die Verkettung dieser
                  Funktionen: Durch die Normalisierung lassen sich Werte aus
                  völlig unterschiedlichen Kontexten – sei es Scrollposition,
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
              <BleedRightSmall
                Left={
                  <div class="mr-32">
                    <Headline>
                      <div class="mb-12">{entry.title}</div>
                    </Headline>
                    <SmallText class="mb-8">{entry.description()}</SmallText>
                    <CodeBlock code={entry.theFunctionText} />
                  </div>
                }
                Right={
                  <div class="h-full min-h-[500px] relative">
                    <ANIMATION
                      functionConfig={{}}
                      xRangeGetter={entry.getXRange}
                      theFunction={entry.theFunction}
                      bgColor="GRAY_DARKER"
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
