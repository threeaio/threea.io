import { Button } from "~/components/Button";
import { createSignal, For, onMount, Show } from "solid-js";
import { navigationBus, NavigationConfiguration } from "~/Navigation-Bus";
import { useLocation } from "@solidjs/router";
import useClickOutside from "solid-click-outside";

export default function SubNavigation() {
  const [target, setTarget] = createSignal<HTMLElement | undefined>();
  const location = useLocation();

  const [show, setShow] = createSignal(false);
  const [navigationConfig, setNavigationConfig] =
    createSignal<NavigationConfiguration>({
      relatedToThisPage: [],
      onThisPage: [],
    });

  navigationBus.listen((a) => setNavigationConfig(a));
  onMount(() => {
    useClickOutside(target, () => {
      setShow(false);
    });
  });

  return (
    <div class={`navOuter  ${show() ? "navOuterShow" : ""}`} ref={setTarget}>
      <h3
        class={`navHead`}
        onPointerUp={() => {
          setShow(!show());
          // if (
          //   document.querySelector("body")!.classList.contains("preview-layout")
          // ) {
          //   document.querySelector("body")!.classList.toggle("preview-layout");
          //   setTimeout(() => {
          //     window.scrollTrigger.refresh();
          //   }, 700);
          //
          //   window.scrollTo(0, 0);
          // }
        }}
      >
        <span class={`navHeadSymbol`}>
          <span style="--is: 0"></span>
          <span style="--is: 1"></span>
          <span style="--is: 2"></span>
          <span style="--is: 3"></span>
        </span>
        <span>Inhalt</span>
      </h3>
      <div class={`nav`}>
        <nav class="overflow-hidden">
          <div class={`navInner`}>
            <Show when={navigationConfig().onThisPage.length}>
              <h4 class="class={`px-4 sm:px-8">Diese Seite</h4>
              <ul>
                <For each={navigationConfig().onThisPage}>
                  {(item, i) => (
                    <li
                      style={`--i:${i()}`}
                      class={`pl-4 sm:pl-8 pr-20 ${i() === navigationConfig().onThisPage.length - 1 ? "mb-4" : ""} `}
                    >
                      {item.linkProps.type === "link" && (
                        <Button
                          href={item.linkProps.href}
                          asA={true}
                          active={location.pathname === item.linkProps.href}
                        >
                          {item.title}
                        </Button>
                      )}
                      {item.linkProps.type === "anchor" && (
                        <Button target={item.linkProps.target}>
                          {item.title}
                        </Button>
                      )}
                    </li>
                  )}
                </For>

                <li
                  style={`--i:${navigationConfig().relatedToThisPage.length}`}
                  class={`border-t border-t-3a-gray border-dashed py-3 pl-4 sm:pl-8 pr-20 ${location.pathname === "/" ? "hidden" : ""}`}
                >
                  <Button href="/" asA={true} isBack={true}>
                    Zur Startseite
                  </Button>
                </li>
              </ul>
            </Show>

            <Show when={navigationConfig().relatedToThisPage.length}>
              <h4 class="class={`px-4 sm:px-8">Weitere Seiten</h4>
              <ul>
                <For each={navigationConfig().relatedToThisPage}>
                  {(item, i) => (
                    <li
                      style={`--i:${i()}`}
                      class={`pl-4 sm:pl-8 pr-20 ${i() === navigationConfig().relatedToThisPage.length - 1 ? "mb-4" : ""} `}
                    >
                      {item.linkProps.type === "link" && (
                        <Button
                          href={item.linkProps.href}
                          asA={true}
                          active={location.pathname === item.linkProps.href}
                        >
                          {item.title}
                        </Button>
                      )}
                      {item.linkProps.type === "anchor" && (
                        <Button target={item.linkProps.target}>
                          {item.title}
                        </Button>
                      )}
                    </li>
                  )}
                </For>

                <li
                  style={`--i:${navigationConfig().relatedToThisPage.length}`}
                  class={`border-t border-t-3a-gray border-dashed py-3 pl-4 sm:pl-8 pr-20 ${location.pathname === "/" ? "hidden" : ""}`}
                >
                  <Button href="/" asA={true} isBack={true}>
                    Zur Startseite
                  </Button>
                </li>
              </ul>
            </Show>
          </div>
        </nav>
      </div>
    </div>
  );
}
