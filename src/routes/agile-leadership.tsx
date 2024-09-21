import { Divider } from "~/components/Divider";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import { HeaderSimple } from "~/content/Header-Simple";
import MainArticle from "~/components/Main-Article";
import { AgileAgit } from "~/content/Agile-Agit";
import { clientOnly } from "@solidjs/start";
import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";

const CanvasAnimation2 = clientOnly(
  () => import("~/components/animation/Canvas-Animation-2"),
);

export default function PageAgileLeadership() {
  return (
    <LandingPageLayout>
      <HeaderSimple />
      <MainArticle content={AgileAgit}>
        <CanvasAnimationWrapper
          animation={<CanvasAnimation2 />}
        ></CanvasAnimationWrapper>
      </MainArticle>
      <div class="sm:bg-gradient-to-t from-3a-gray-darkest to-transparent ">
        <Divider />
      </div>
    </LandingPageLayout>
  );
}
