// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    scrollTrigger: typeof ScrollTrigger;
    lenis: Lenis;
  }
}

window.scrollTrigger = window.scrollTrigger || {};
window.scrollTrigger = ScrollTrigger;

mount(() => <StartClient />, document.getElementById("app")!);
