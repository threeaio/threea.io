import { Divider } from "~/components/Divider";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import { HeaderSimple } from "~/content/Header-Simple";
import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { clientOnly } from "@solidjs/start";
import { AntiAgony } from "~/content/Anti-Agony";
import MainArticle from "~/components/Main-Article";
const CanvasAnimation2 = clientOnly(
  () => import("~/components/animation/Canvas-Animation-2"),
);

export default function PageAntiAgony() {
  return (
    <LandingPageLayout>
      <CanvasAnimationWrapper animation={<CanvasAnimation2 hue={220} />}>
        <HeaderSimple />
        <MainArticle content={AntiAgony} />
        <div class="sm:bg-gradient-to-t from-3a-gray-darkest to-transparent ">
          <Divider />
        </div>
      </CanvasAnimationWrapper>
    </LandingPageLayout>
  );
}
