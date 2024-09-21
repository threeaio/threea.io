import { Divider } from "~/components/Divider";
import { LandingPageLayout } from "~/Landing-Page-Layout";
import { HeaderSimple } from "~/content/Header-Simple";
import { AntiAgony } from "~/content/Anti-Agony";
import MainArticle from "~/components/Main-Article";
import CanvasAnimationWrapper from "~/components/animation/Canvas-Animation-Wrapper";
import { clientOnly } from "@solidjs/start";
const CanvasAnimationRounded = clientOnly(
  () => import("~/components/animation/Canvas-Animation-rounded"),
);

export default function PageAntiAgony() {
  return (
    <LandingPageLayout>
      <HeaderSimple />
      <MainArticle content={AntiAgony}>
        <div class="min-h-max h-full w-full bg-cover mix-blend-lighten">
          {/*<img*/}
          {/*  id="hero-graphic"*/}
          {/*  alt="Nikolaj Sokolowksi photographing himself"*/}
          {/*  class="object-cover h-full w-full object-top opacity-70"*/}
          {/*  src="/ich.webp"*/}
          {/*/>*/}
          <CanvasAnimationWrapper
            animation={<CanvasAnimationRounded hue={40} />}
          ></CanvasAnimationWrapper>
        </div>
      </MainArticle>
      <div class="sm:bg-gradient-to-t from-3a-gray-darkest to-transparent ">
        <Divider />
      </div>
    </LandingPageLayout>
  );
}
