import { MainLogo } from "~/components/Logo";
import { SmallText } from "~/components/SmallText";
import { BleedRight } from "~/components/layouts/bleed-right/Bleed-Right";
import { onMount } from "solid-js";
import { gsap } from "gsap";

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
    <BleedRight
      Left={
        <div class="flex h-svh flex-col self-end">
          <div id="main-logo">
            <MainLogo size="normal" />
          </div>
          <div class="flex-1 flex">
            <div class="self-end py-16">
              <SmallText class="pr-12">
                <p class="mb-4">
                  Hello! I'm Nikolaj Sokolowski, a design engineer, Angular
                  developer, and detail-oriented problem-solver. Not Triple-A,
                  but threea here.
                </p>
                <p class="mb-4">
                  I focus on creating agile concepts and user interfaces. In the
                  past especially for scalable business applications.
                </p>
              </SmallText>
            </div>
          </div>
        </div>
      }
      Right={
        <div class="bg-3a-green h-full w-full">
          <div class="min-h-max h-full w-full bg-cover mix-blend-multiply">
            <img
              id="hero-graphic"
              alt="Nikolaj Sokolowksi photographing himself"
              class="object-cover h-full w-full object-top"
              src="/ich.webp"
            />
          </div>
        </div>
      }
    />
  );
};
