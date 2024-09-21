import { Button } from "~/components/Button";
import { createEffect, onMount } from "solid-js";
import { gsap } from "gsap";
import { fromLandingPageState } from "~/landing-page-state";

export default function SubNavigation() {
  let ref: HTMLUListElement | undefined;
  const [{ landingPageState }] = fromLandingPageState;
  onMount(() => {
    let proxy = { y: 0 };
    const transformSetter = gsap.quickSetter(".nav-list", "y", "px");
    const yTo = gsap.quickTo(".nav-list", "y", {
      duration: 0.2,
      ease: "sine",
    });
    createEffect(() => {
      const v = landingPageState.velocity;
      console.log("v", v);
      yTo(v * -40);
    });
  });
  return (
    <ul
      ref={(el) => (ref = el)}
      class="nav-list fixed top-12 w-full sm:w-auto flex p-12 flex-col gap-4 transition-all bg-3a-gray-darkest translate-y-[var(--menu-y)]"
      classList={
        {
          // "opacity-20": Math.abs(landingPageState.velocity) > 0.1,
        }
      }
      style={{ "--menu-y": `0px` }}
    >
      <li>
        <Button href="/async-action" asA={true}>
          More on Coding
        </Button>
      </li>
      <li>
        <Button href="/anti-agony" asA={true}>
          More on my Motivation
        </Button>
      </li>
      <li>
        <Button href="/agile-leadership" asA={true}>
          More on Agit
        </Button>
      </li>
    </ul>
  );
}
