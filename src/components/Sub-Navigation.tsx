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
        <span class={`navHeadSymbol`}>
          <span style="--is: 0"></span>
          <span style="--is: 1"></span>
          <span style="--is: 2"></span>
          <span style="--is: 3"></span>
        </span>
        <span>Content</span>
      </h3>
      <div class={`nav`}>
        <nav class="overflow-hidden">
          <div class={`navInner`}>
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

              {/*<li*/}
              {/*  style={`--i:${navigationConfig().relatedToThisPage.length + 1}`}*/}
              {/*  class="hidden border-t border-t-3a-gray border-dashed py-3 pl-4 sm:pl-8 pr-20"*/}
              {/*>*/}
              {/*  <Button*/}
              {/*    handleClick={() => {*/}
              {/*      document*/}
              {/*        .querySelector("body")!*/}
              {/*        .classList.toggle("preview-layout");*/}
              {/*      window.lenis.scrollTo(0, { duration: 0 });*/}
              {/*      setTimeout(() => {*/}
              {/*        window.scrollTrigger.refresh();*/}
              {/*      }, 700);*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    Poster-View*/}
              {/*  </Button>*/}
              {/*</li>*/}
              <li
                style={`--i:${navigationConfig().relatedToThisPage.length}`}
                class={`border-t border-t-3a-gray border-dashed py-3 pl-4 sm:pl-8 pr-20 ${location.pathname === "/" ? "hidden" : ""}`}
              >
                <Button href="/" asA={true} isBack={true}>
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
