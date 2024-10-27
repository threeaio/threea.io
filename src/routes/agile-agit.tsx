import { Divider } from "~/components/Divider";
import { HeaderSimple } from "~/content/Header-Simple";
import MainArticle from "~/components/Main-Article";
import { AgileAgit } from "~/content/Agile-Agit";
import { onMount } from "solid-js";

export default function PageAgileLeadership() {
  onMount(() => {});

  return (
    <div>
      <HeaderSimple />
      <MainArticle content={AgileAgit}></MainArticle>
      <div class="bg-gradient-to-t from-3a-gray-darkest to-transparent ">
        <Divider />
      </div>
    </div>
  );
}
