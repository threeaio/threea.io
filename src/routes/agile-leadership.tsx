import { Divider } from "~/components/Divider";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import { HeaderSimple } from "~/content/Header-Simple";
import MainArticle from "~/components/Main-Article";
import { AgileAgit } from "~/content/Agile-Agit";
import { clientOnly } from "@solidjs/start";
import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";

const CanvasAnimationRounded = clientOnly(
  () => import("~/components/animation/Canvas-Animation-rounded"),
);

export default function PageAgileLeadership() {
  return (
    <div>
      <HeaderSimple />
      <MainArticle content={AgileAgit}>
        <CanvasAnimationWrapper
          animation={<CanvasAnimationRounded hue={230} />}
        ></CanvasAnimationWrapper>
      </MainArticle>
      <div class="sm:bg-gradient-to-t from-3a-gray-darkest to-transparent ">
        <Divider />
      </div>
    </div>
  );
}
