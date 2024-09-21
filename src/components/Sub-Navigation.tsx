import { Button } from "~/components/Button";
import { createEffect, onMount } from "solid-js";
import { gsap } from "gsap";
import { fromLandingPageState } from "~/landing-page-state";

export default function SubNavigation() {
  // let ref: HTMLUListElement | undefined;
  // const [{ landingPageState }] = fromLandingPageState;
  // onMount(() => {
  //   let proxy = { y: 0 };
  //   const transformSetter = gsap.quickSetter(".nav-list", "y", "px");
  //   const yTo = gsap.quickTo(".nav-list", "y", {
  //     duration: 0.2,
  //     ease: "sine",
  //   });
  //   createEffect(() => {
  //     const v = landingPageState.velocity;
  //     console.log("v", v);
  //     yTo(v * -40);
  //   });
  // });
  return (
    <nav class="sm:py-4 md:py-8 lg:py-12 w-full sm:w-auto flex flex-col gap-3 transition-all bg-3a-gray-darkest">
      <h3 class="px-8 pb-8 text-3a-green">Content</h3>
      <ul style={{ "--menu-y": `0px` }}>
        <li class="px-8">
          <Button href="/anti-agony" asA={true}>
            More on my Motivation
          </Button>
        </li>
        <li class="px-8">
          <Button href="/async-action" asA={true}>
            More on my Approach on Coding
          </Button>
        </li>
        <li class="px-8">
          <Button href="/agile-leadership" asA={true}>
            About my other Agile Roles
          </Button>
        </li>
        <li class="border-t border-t-3a-gray border-dashed pt-2 mt-2 px-8">
          <Button isBack={true} href="/" asA={true}>
            To Homepage
          </Button>
        </li>
      </ul>
    </nav>
  );
}
