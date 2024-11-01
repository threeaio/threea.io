import { Button } from "~/components/Button";
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { useNavigationContext } from "~/Navigation-Context";
import { gsap } from "gsap";

export default function SubNavigation() {
  const [target, setTarget] = createSignal<HTMLElement | undefined>();
  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = createSignal(false);

  const [{ onThisPage, pages }] = useNavigationContext();

  createEffect(() => {});

  onMount(() => {
    document.querySelector("#PAGE_3a")!.addEventListener("click", (e) => {
      setShow(false);
    });
  });

  return (
    <div ref={setTarget}>
      <div class={`navOuter  ${show() ? "navOuterShow" : ""}`}>
        <h3 class={`navHead`}>
          <span
            class={`navHeadSymbol`}
            onPointerUp={() => {
              setShow(!show());
            }}
          >
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
              {onThisPage().length && (
                <div style={`--inum-items:${onThisPage().length + 1}`}>
                  <h4
                    style={`--i:0`}
                    class="nav-section-heading text-sm text-3a-white px-4 sm:px-8"
                  >
                    Auf dieser Seite
                  </h4>
                  <ul>
                    <For each={onThisPage()}>
                      {(item, i) => (
                        <li
                          style={`--i:${i() + 1}`}
                          class={`pl-4 sm:pl-8 pr-20 ${i() === onThisPage().length - 1 ? "mb-4" : ""} `}
                        >
                          <Button target={item.linkProps.target}>
                            {item.title}
                          </Button>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              )}
              <div style={`--inum-items:${pages().length + 2}`}>
                <h4
                  style={`--i:0`}
                  class="nav-section-heading text-3a-white text-sm px-4 sm:px-8"
                >
                  Seiten
                </h4>
                <ul class={"mb-4"}>
                  <li style={`--i:1`} class={`pl-4 sm:pl-8 pr-20`}>
                    <Button
                      href="/"
                      asA={true}
                      active={location.pathname === "/"}
                      handleClick={(e) => {
                        const page = document.querySelector("#PAGE_3a")!;
                        gsap.to(page, {
                          opacity: 0,
                          onComplete: () => {
                            window.lenis.scrollTo(0, {
                              immediate: true,
                            });
                            navigate("/");
                          },
                        });

                        e.preventDefault();
                        return false;
                      }}
                    >
                      Startseite
                    </Button>
                  </li>
                  <For each={pages()}>
                    {(item, i) => (
                      <li style={`--i:${i() + 2}`} class={`pl-4 sm:pl-8 pr-20`}>
                        {item.linkProps.type === "link" && (
                          <Button
                            href={item.linkProps.href}
                            asA={true}
                            active={location.pathname === item.linkProps.href}
                            handleClick={(e) => {
                              const page = document.querySelector("#PAGE_3a")!;
                              gsap.to(page, {
                                opacity: 0,
                                onComplete: () => {
                                  window.lenis.scrollTo(0, {
                                    immediate: true,
                                  });
                                  if ("href" in item.linkProps) {
                                    navigate(item.linkProps.href);
                                  }
                                },
                              });

                              e.preventDefault();
                              return false;
                            }}
                          >
                            {item.title}
                          </Button>
                        )}
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
