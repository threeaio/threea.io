import { Divider } from "~/components/Divider";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import { Title } from "@solidjs/meta";
import { HeaderSimple } from "~/content/Header-Simple";
import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { clientOnly } from "@solidjs/start";
import MainArticle from "~/components/Main-Article";
import { AsyncAction } from "~/content/Async-Action";
const CanvasAnimation2 = clientOnly(
  () => import("~/components/animation/Canvas-Animation-2"),
);

export default function PageAsyncAction() {
  return (
    <LandingPageLayout>
      <Title>Threea.io - About me as a Developer</Title>
      <CanvasAnimationWrapper animation={<CanvasAnimation2 hue={140} />}>
        <HeaderSimple />
        <MainArticle content={AsyncAction} />
        <div class="sm:bg-gradient-to-t from-3a-gray-darkest to-transparent ">
          <Divider />
        </div>
      </CanvasAnimationWrapper>
    </LandingPageLayout>
  );
}
