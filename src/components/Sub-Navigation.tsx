import { Button } from "~/components/Button";
import { createMemo, createSignal, onMount } from "solid-js";
import { fromLandingPageState } from "~/landing-page-state";
import styles from "./Sub-Navigation.module.css";
import { navigationBus } from "~/Navigation-Bus";

export default function SubNavigation() {
  let ref: HTMLDivElement | undefined;

  const [{ landingPageState }] = fromLandingPageState;
  const scrolled = createMemo(
    () => landingPageState.progress > 0.2,
    landingPageState.progress,
  );
  const [show, setShow] = createSignal(false);

  onMount(() => {
    navigationBus.listen((a) => console.log("received from bus", a));
  });

  return (
    <div
      class={`${styles.navOuter} ${show() ? styles.navOuterShow : ""}`}
      ref={(el) => (ref = el)}
    >
      <h3 class={`${styles.navHead}`}>
        <span
          class={`${styles.navHeadSymbol}`}
          onPointerUp={() => setShow(!show())}
        >
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span>Content</span>
      </h3>
      <div class={`${styles.nav}`}>
        <nav class="overflow-hidden">
          <div class={`${styles.navInner}`}>
            <ul>
              <li style="--i: 0" class="pl-4 sm:pl-8 pr-20">
                <Button href="/anti-agony" asA={true}>
                  More on my Motivation
                </Button>
              </li>
              <li style="--i: 1" class="pl-4 sm:pl-8 pr-20">
                <Button href="/async-action" asA={true}>
                  More on my Approach on Coding
                </Button>
              </li>
              <li style="--i: 2" class="pl-4 sm:pl-8 pr-20">
                <Button href="/agile-leadership" asA={true}>
                  About my other Agile Roles
                </Button>
              </li>
              <li
                style="--i: 3"
                class="border-t border-t-3a-gray border-dashed pt-2 mt-2 pl-4 sm:pl-8 pr-20"
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
