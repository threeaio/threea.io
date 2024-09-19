import { onMount, ParentComponent } from "solid-js";
import { fromLandingPageState } from "./landing-page-state";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { Footer } from "./content/Footer";
import { clientOnly } from "@solidjs/start";
const CanvasAnimation2 = clientOnly(
  () => import("~/components/animation/Canvas-Animation-2"),
);

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
      setScreenHeight(window.innerHeight);
    }).observe(el);
  };

  return (
    <div
      ref={(el) => {
        setupScreenResizeObserver(el);
        setupContentResizeObserver(el);
      }}
    >
      <CanvasAnimation2 />
      <div class="relative">
        {props.children}
        <Footer />
      </div>
    </div>
  );
};
