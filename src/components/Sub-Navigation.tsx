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
      <h3
        class={`${styles.navHead}`}
        onPointerUp={() => {
          setShow(!show());
          if (
            document.querySelector("body")!.classList.contains("preview-layout")
          ) {
            document.querySelector("body")!.classList.toggle("preview-layout");
            setTimeout(() => {
              window.scrollTrigger.refresh();
            }, 700);

            window.scrollTo(0, 0);
          }
        }}
      >
        <span class={`${styles.navHeadSymbol}`}>
          <span style="--is: 0"></span>
          <span style="--is: 1"></span>
          <span style="--is: 2"></span>
          <span style="--is: 3"></span>
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
                class="border-t border-t-3a-gray border-dashed py-3 mt-4 pl-4 sm:pl-8 pr-20"
              >
                <Button isBack={true} href="/" asA={true}>
                  To Homepage
                </Button>
              </li>
              <li
                style="--i: 4"
                class="border-t border-t-3a-gray border-dashed py-3 pl-4 sm:pl-8 pr-20"
              >
                <Button
                  handleClick={() => {
                    document
                      .querySelector("body")!
                      .classList.toggle("preview-layout");
                    setTimeout(() => {
                      window.scrollTrigger.refresh();
                    }, 700);

                    window.scrollTo(0, 0);
                  }}
                >
                  Alternative View
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
