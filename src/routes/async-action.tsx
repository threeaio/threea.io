import { Divider } from "~/components/Divider";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import { HeaderSimple } from "~/content/Header-Simple";
import { clientOnly } from "@solidjs/start";
import MainArticle from "~/components/Main-Article";
import { AsyncAction } from "~/content/Async-Action";
import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { onMount } from "solid-js";
import { navigationBus } from "~/Navigation-Bus";
import { AgileAgit } from "~/content/Agile-Agit";
import { AntiAgony } from "~/content/Anti-Agony";
const CanvasAnimation2 = clientOnly(
  () => import("~/components/animation/Canvas-Animation-2"),
);

export default function PageAsyncAction() {
  onMount(() => {
    navigationBus.emit({
      isHomepage: false,
      onThisPage: [],
      relatedToThisPage: [AntiAgony.moreLink, AgileAgit.moreLink],
    });
  });
  return (
    <div>
      <HeaderSimple />
      <MainArticle content={AsyncAction}>
        <CanvasAnimationWrapper
          animation={<CanvasAnimation2 hue={240} />}
        ></CanvasAnimationWrapper>
      </MainArticle>
      <div class="sm:bg-gradient-to-t from-3a-gray-darkest to-transparent ">
        <Divider />
      </div>
    </div>
  );
}
