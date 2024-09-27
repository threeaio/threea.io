import { Button } from "~/components/Button";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
import { fromLandingPageState } from "~/landing-page-state";
import styles from "./Sub-Navigation.module.css";
import { navigationBus, NavigationConfiguration } from "~/Navigation-Bus";
import { useHref, useLocation } from "@solidjs/router";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";

export default function SubNavigation() {
  let ref: HTMLDivElement | undefined;
  const location = useLocation();

  const [{ landingPageState }] = fromLandingPageState;
  const scrolled = createMemo(
    () => landingPageState.progress > 0.2,
    landingPageState.progress,
  );
  const [show, setShow] = createSignal(false);
  const [navigationConfig, setNavigationConfig] =
    createSignal<NavigationConfiguration>({
      relatedToThisPage: [],
      onThisPage: [],
    });

  navigationBus.listen((a) => setNavigationConfig(a));
  onMount(() => {});

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
              <For each={navigationConfig().relatedToThisPage}>
                {(item, i) => (
                  <li
                    style={`--i:${i()}`}
                    class={`pl-4 sm:pl-8 pr-20 ${i() === navigationConfig().relatedToThisPage.length - 1 ? "mb-4" : ""} `}
                  >
                    <Button
                      href={item.href}
                      asA={true}
                      active={location.pathname === item.href}
                    >
                      {item.title}
                    </Button>
                  </li>
                )}
              </For>

              <li
                style={`--i:${navigationConfig().relatedToThisPage.length + 1}`}
                class="hidden border-t border-t-3a-gray border-dashed py-3 pl-4 sm:pl-8 pr-20"
              >
                <Button
                  handleClick={() => {
                    document
                      .querySelector("body")!
                      .classList.toggle("preview-layout");
                    window.lenis.scrollTo(0, { duration: 0 });
                    setTimeout(() => {
                      window.scrollTrigger.refresh();
                    }, 700);
                  }}
                >
                  Poster-View
                </Button>
              </li>
              <Show when={location.pathname !== "/"}>
                <li
                  style={`--i:${navigationConfig().relatedToThisPage.length}`}
                  class="border-t border-t-3a-gray border-dashed py-3 pl-4 sm:pl-8 pr-20"
                >
                  <Button href="/" asA={true} isBack={true}>
                    To Homepage
                  </Button>
                </li>
              </Show>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
