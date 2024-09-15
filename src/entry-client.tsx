// @refresh reload
import "cal-sans";
import { mount, StartClient } from "@solidjs/start/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    scrollTrigger: typeof ScrollTrigger;
  }
}

window.scrollTrigger = window.scrollTrigger || {};
window.scrollTrigger = ScrollTrigger;

mount(() => <StartClient />, document.getElementById("app")!);
