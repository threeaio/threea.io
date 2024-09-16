import { onMount, ParentComponent } from "solid-js";
import { fromLandingPageState } from "./landing-page-state";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { Footer } from "./content/Footer";

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

  onMount(() => {
    // lenis
    const lenis = new Lenis({
      syncTouch: false,
      autoResize: true,
      wheelMultiplier: 0.9,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenis.on(
      "scroll",
      (e: { velocity: number; progress: number; direction: -1 | 1 }) => {
        setVelocity(e.velocity);
        setProgress(e.progress);
        setScrollDirection(e.direction);
      },
    );

    lenis.on("scroll", window.scrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 5000);
    });

    gsap.ticker.lagSmoothing(0);
  });

  // lenis end

  const setupContentResizeObserver = (el: HTMLElement) => {
    new ResizeObserver((args) => {
      const cr = args[0].contentRect;
      setTotalContentHeight(cr.height);
      setTotalWidth(cr.width);
    }).observe(el);
  };

  const setupScreenResizeObserver = (el: HTMLElement) => {
    new ResizeObserver((args) => {
      const cr = args[0].contentRect;
      setScreenHeight(cr.height);
    }).observe(el);
  };

  return (
    <div
      ref={(el) => {
        setupScreenResizeObserver(el);
        setupContentResizeObserver(el);
      }}
    >
      {props.children}
      <Footer />
    </div>
  );
};
