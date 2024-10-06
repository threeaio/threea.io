import { createEffect, createSignal, onMount, ParentComponent } from "solid-js";
import { fromLandingPageState } from "./landing-page-state";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { Footer } from "./content/Footer";
import { createElementSize } from "@solid-primitives/resize-observer";

export const LandingPageLayout: ParentComponent = (props) => {
  const [
    { landingPageState },
    {
      setTotalContentHeight,
      setScreenHeight,
      setProgress,
      setVelocity,
      setScrollDirection,
    },
  ] = fromLandingPageState;

  const [target, setTarget] = createSignal<HTMLElement | undefined>();

  onMount(() => {
    if (target()) {
      const size = createElementSize(target() as HTMLElement);
      createEffect(() => {
        setScreenHeight(window.visualViewport?.height || 0);
        setTotalContentHeight(size.height);
      });
    }

    // lenis
    window.lenis = new Lenis({
      autoResize: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    window.lenis.on(
      "scroll",
      (e: { velocity: number; progress: number; direction: -1 | 1 }) => {
        window.scrollTrigger.update();
        setVelocity(e.velocity);
        setProgress(e.progress);
        setScrollDirection(e.direction);
      },
    );

    // lenis.on("scroll", );
    //
    gsap.ticker.add((time) => {
      window.lenis.raf(time * 1000);
    });

    //
    gsap.ticker.lagSmoothing(0);
  });

  // lenis end

  return (
    <div class="bg-3a-gray-darkest mx-auto w-full" ref={setTarget}>
      {props.children}
      <Footer />
    </div>
  );
};
