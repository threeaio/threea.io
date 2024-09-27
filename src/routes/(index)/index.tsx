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
        {/*<FullWidth>*/}
        {/*  <HugeText>*/}
        {/*    <div*/}
        {/*      id="big-headline-index"*/}
        {/*      class=" flex items-center py-6 md:py-8 xl:py-12 "*/}
        {/*    >*/}
        {/*      <h2 class="text-pretty">*/}
        {/*        Some Things I did for the Food{" "}*/}
        {/*        <span class="headline-item text-3a-green ">*/}
        {/*          Some Things I did for the Fun*/}
        {/*        </span>*/}
        {/*      </h2>*/}
        {/*    </div>*/}
        {/*  </HugeText>*/}
        {/*</FullWidth>*/}
      </main>
    </div>
  );
}
