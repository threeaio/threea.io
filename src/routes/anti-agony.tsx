import { Divider } from "~/components/Divider";
import { HeaderSimple } from "~/content/Header-Simple";
import { AntiAgony } from "~/content/Anti-Agony";
import MainArticle from "~/components/Main-Article";
import { clientOnly } from "@solidjs/start";
import { onMount } from "solid-js";
const CanvasAnimationRounded = clientOnly(
  () => import("~/components/animation/Canvas-Animation-rounded"),
);

export default function PageAntiAgony() {
  onMount(() => {});
  return (
    <div>
      <HeaderSimple />
      <MainArticle content={AntiAgony}>
        <div class="min-h-max h-full w-full bg-cover mix-blend-lighten">
          {/*<img*/}
          {/*  id="hero-graphic"*/}
          {/*  alt="Nikolaj Sokolowksi photographing himself"*/}
          {/*  class="object-cover h-full w-full object-top opacity-70"*/}
          {/*  src="/ich.webp"*/}
          {/*/>*/}
          {/*<CanvasAnimationWrapper*/}
          {/*  animation={<CanvasAnimationRounded hue={40} />}*/}
          {/*></CanvasAnimationWrapper>*/}
        </div>
      </MainArticle>
      <div class="bg-gradient-to-t from-3a-gray-darkest to-transparent ">
        <Divider />
      </div>
    </div>
  );
}
