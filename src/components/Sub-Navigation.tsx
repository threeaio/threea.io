import { Button } from "~/components/Button";
import { createEffect, createMemo, createSignal, onMount } from "solid-js";
import { fromLandingPageState } from "~/landing-page-state";
import { gsap } from "gsap";
import styles from "./Sub-Navigation.module.css";

export default function SubNavigation() {
  const [{ landingPageState }] = fromLandingPageState;
  const scrolled = createMemo(
    () => landingPageState.progress > 0.2,
    landingPageState.progress,
  );
  const [show, setShow] = createSignal(false);
  let hideNav: undefined | gsap.core.Timeline;
  let showNav: undefined | gsap.core.Timeline;

  onMount(() => {
    // hideNav = gsap
    //   .timeline({ paused: true })
    //   .to(".nav-list ul", {
    //     x: 500,
    //     opacity: 0,
    //     duration: 0.3,
    //   })
    //   .to(
    //     ".nav-list ul",
    //     {
    //       height: 0,
    //       duration: 0.3,
    //     },
    //     ">-.2s",
    //   );
    //
    // showNav = gsap
    //   .timeline({ paused: true })
    //   .to(".nav-list ul", {
    //     height: "auto",
    //     duration: 0.3,
    //   })
    //   .to(
    //     ".nav-list ul",
    //     {
    //       opacity: 1,
    //       x: 0,
    //       duration: 0.4,
    //     },
    //     ">-.2s",
    //   );

    createEffect(() => {
      // if (scrolled() && !show()) {
      //   showNav?.clear();
      //   hideNav?.restart();
      // } else if (!scrolled() || show()) {
      //   hideNav?.clear();
      //   showNav?.restart();
      // }
    });
  });

  return (
    <div class={`${styles.navOuter}`}>
      <h3 class={`${styles.navHead}`}>
        <span class={`${styles.navHeadSymbol}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span class="hidden">Content</span>
      </h3>
      <div class={`${styles.nav}`}>
        <nav class="overflow-hidden">
          <div class=" w-full py-8 sm:w-auto flex flex-col gap-3">
            <ul>
              <li style="--i: 0" class="px-4 sm:px-8">
                <Button href="/anti-agony" asA={true}>
                  More on my Motivation
                </Button>
              </li>
              <li style="--i: 1" class="px-4 sm:px-8">
                <Button href="/async-action" asA={true}>
                  More on my Approach on Coding
                </Button>
              </li>
              <li style="--i: 2" class="px-4 sm:px-8">
                <Button href="/agile-leadership" asA={true}>
                  About my other Agile Roles
                </Button>
              </li>
              <li
                style="--i: 3"
                class="border-t border-t-3a-gray border-dashed pt-2 mt-2 px-4 sm:px-8"
              >
                <Button isBack={true} href="/" asA={true}>
                  To Homepage
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
