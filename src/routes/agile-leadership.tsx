import { Divider } from "~/components/Divider";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import { HeaderSimple } from "~/content/Header-Simple";
import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { clientOnly } from "@solidjs/start";
import MainArticle from "~/components/Main-Article";
import { AgileAgit } from "~/content/Agile-Agit";
const CanvasAnimation2 = clientOnly(
  () => import("~/components/animation/Canvas-Animation-2"),
);

export default function PageAgileLeadership() {
  return (
    <LandingPageLayout>
      <CanvasAnimationWrapper animation={<CanvasAnimation2 hue={170} />}>
        <HeaderSimple />
        <MainArticle content={AgileAgit} />
        <div class="sm:bg-gradient-to-t from-3a-gray-darkest to-transparent ">
          <Divider />
        </div>
      </CanvasAnimationWrapper>
    </LandingPageLayout>
  );
}
