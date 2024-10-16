import { Divider } from "~/components/Divider";
import { HeaderSimple } from "~/content/Header-Simple";
import MainArticle from "~/components/Main-Article";
import { AgileAgit } from "~/content/Agile-Agit";
import { clientOnly } from "@solidjs/start";
import { onMount } from "solid-js";

const CanvasAnimationRounded = clientOnly(
  () => import("~/components/animation/Canvas-Animation-rounded"),
);

export default function PageAgileLeadership() {
  onMount(() => {});

  return (
    <div>
      <HeaderSimple />
      <MainArticle content={AgileAgit}>
        {/*<CanvasAnimationWrapper*/}
        {/*  animation={<CanvasAnimationRounded hue={230} />}*/}
        {/*></CanvasAnimationWrapper>*/}
      </MainArticle>
      <div class="bg-gradient-to-t from-3a-gray-darkest to-transparent ">
        <Divider />
      </div>
    </div>
  );
}
