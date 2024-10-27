import { Divider } from "~/components/Divider";
import { HeaderSimple } from "~/content/Header-Simple";
import { clientOnly } from "@solidjs/start";
import MainArticle from "~/components/Main-Article";
import { AsyncAction } from "~/content/Async-Action";
import { onMount } from "solid-js";

export default function PageAsyncAction() {
  onMount(() => {});
  return (
    <div>
      <HeaderSimple />
      <MainArticle content={AsyncAction}>
        {/*<CanvasAnimationWrapper*/}
        {/*  animation={<CanvasAnimation2 hue={240} />}*/}
        {/*></CanvasAnimationWrapper>*/}
      </MainArticle>
      <div class="bg-gradient-to-t from-3a-gray-darkest to-transparent ">
        <Divider />
      </div>
    </div>
  );
}
