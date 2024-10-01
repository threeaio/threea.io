import { GridIndicator } from "~/components/Grid-Indicator";
import { Introduction } from "~/routes/(index)/01_Introduction";
import AboutWork from "~/routes/(index)/02_About-Work";
import { onMount } from "solid-js";
import { Title } from "@solidjs/meta";
import { AgileAgit } from "~/content/Agile-Agit";
import { AsyncAction } from "~/content/Async-Action";
import { AntiAgony } from "~/content/Anti-Agony";
import { navigationBus } from "~/Navigation-Bus";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/HugeText";

export default function Home() {
  onMount(() => {
    navigationBus.emit({
      onThisPage: [],
      relatedToThisPage: [
        AntiAgony.moreLink,
        AsyncAction.moreLink,
        AgileAgit.moreLink,
      ],
    });
  });
  return (
    <div>
      <Title>Welcome to Threea.io</Title>
      <GridIndicator />
      <main>
        <div>
          <Introduction />
        </div>
        <AboutWork />
        <FullWidth>
          <div class="h-screen flex flex-col justify-center text-pretty">
            <HugeText>
              <div class="max-w-[72rem]">
                Dieses ist nicht das Ende, sondern ein Anfang von etwas.
              </div>
            </HugeText>
          </div>
        </FullWidth>
      </main>
    </div>
  );
}
