import { createEffect, onMount, ParentComponent } from "solid-js";
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
      setTotalWidth,
      setProgress,
      setVelocity,
      setScrollDirection,
    },
  ] = fromLandingPageState;

  // GsapBlur();

  let ref: Element | undefined;

  onMount(() => {
    if (ref) {
      const size = createElementSize(ref);
      createEffect(() => {
        setTotalContentHeight(size.height);
      });
    }

    // lenis
    const lenis = new Lenis({
      autoResize: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenis.on(
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
      lenis.raf(time * 1000);
    });

    //
    gsap.ticker.lagSmoothing(0);
  });

  // lenis end

  return (
    <div
      class="bg-3a-gray-darkest mx-auto w-full transform-gpu main-layout"
      ref={(el) => (ref = el)}
    >
      {props.children}
      <Footer />
    </div>
  );
};
