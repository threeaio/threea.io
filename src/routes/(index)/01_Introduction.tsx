import { MainLogo } from "~/components/Logo";
import { SmallText } from "~/components/SmallText";
import { BleedRight } from "~/components/layouts/bleed-right/Bleed-Right";
import { onMount } from "solid-js";
import { gsap } from "gsap";
import { BleedRightHalf } from "~/components/layouts/bleed-right/Bleed-Right-Half";
import { Button } from "~/components/Button";
import { BleedRightSmall } from "~/components/layouts/bleed-right/Bleed-Right-Small";

export const Introduction = () => {
  onMount(() => {
    let mm = gsap.matchMedia(),
      breakPoint = 800;

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
        isMobile: `(max-width: ${breakPoint - 1}px) and (prefers-reduced-motion: no-preference)`,
      },
      (context) => {
        if (context.conditions && context.conditions["isDesktop"]) {
          gsap.to("#hero-graphic", {
            objectPosition: "50% 400px",
            scrollTrigger: {
              start: "top",
              end: "bottom",
              invalidateOnRefresh: true,
              scrub: true,
            },
          });
        }

        gsap.to("#main-logo", {
          y: 400,
          scrollTrigger: {
            start: "top 0px",
            end: "bottom 800px",
            invalidateOnRefresh: true,
            scrub: 0.3,
          },
        });
      },
    );
  });
  return (
    <div class="sm:bg-3a-gray-darkest">
      {/*sm:bg-3a-gray-darkest*/}
      <BleedRightSmall
        Left={
          <div class="flex h-svh flex-col self-end ">
            <div id="main-logo">
              <MainLogo size="normal" />
            </div>
            <div class="flex-1 flex">
              <div class="self-end py-16">
                <SmallText>
                  <div class="grid xl:grid-cols-2 mr-8 xl:mr-0 mb-4">
                    <div>
                      <p>
                        Môi, Môi! Ich bin Nikolaj Sokolowski,
                        Gestaltungs-Techniker (Design Engineer),
                        Angular-Entwickler und Feinschliffmensch mit Überblick.
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div>
                      <Button
                        handleClick={() => {
                          const el: HTMLElement =
                            document.querySelector("#INDEX_ABOUT_WORK")!;
                          if (el) {
                            window.lenis.scrollTo(el, {
                              duration: 6,
                              offset: 1800,
                            });
                          }
                        }}
                      >
                        Berufliches
                      </Button>
                    </div>
                  </div>
                </SmallText>
              </div>
            </div>
          </div>
        }
        Right={
          <div class="bg-3a-gray-darkest h-full">
            <div class="min-h-max h-full w-full mix-blend-lighten">
              <img
                id="hero-graphic"
                alt="Nikolaj Sokolowksi photographing himself"
                class="object-cover h-full w-full object-top opacity-70"
                src="/ich.webp"
              />
            </div>
          </div>
        }
      />
    </div>
  );
};
