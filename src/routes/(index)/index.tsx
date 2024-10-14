import { GridIndicator } from "~/components/Grid-Indicator";
import { Introduction } from "~/routes/(index)/01_Introduction";
import AboutWork from "~/routes/(index)/02_About-Work";
import { onMount } from "solid-js";
import { Title } from "@solidjs/meta";
import { AgileAgit } from "~/content/Agile-Agit";
import { AsyncAction } from "~/content/Async-Action";
import { AntiAgony } from "~/content/Anti-Agony";
import { navigationBus } from "~/Navigation-Bus";
import BlackBook from "~/routes/(index)/03_Black-Book";
import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { clientOnly } from "@solidjs/start";
import { Divider } from "~/components/Divider";
import { FullWidth } from "~/components/layouts/Full-Width";
import { HugeText } from "~/components/typo/HugeText";
const ANIMATION = clientOnly(
  () => import("~/components/animation/Canvas-Animation-2"),
);

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
        <div class={"relative"}>
          <CanvasAnimationWrapper
            start={"clamp(top top+=80%)"}
            end={"clamp(bottom bottom-=100%)"}
            animation={<ANIMATION />}
          >
            <div class="bg-gradient-to-b from-3a-gray-darkest to-transparent ">
              <Divider />
            </div>
            <AboutWork />
            <Divider />
            <BlackBook />
            <Divider />
            <FullWidth>
              <div class="h-screen flex flex-col justify-center text-pretty">
                <HugeText>
                  <figure class="max-w-[72rem]">
                    Dieses ist nicht das Ende, sondern ein Anfang von etwas.
                  </figure>
                </HugeText>
              </div>
            </FullWidth>
            <div class="bg-gradient-to-t from-3a-gray-darkest to-transparent ">
              <Divider />
            </div>
          </CanvasAnimationWrapper>
        </div>

        {/*<Contact />*/}
      </main>
    </div>
  );
}
