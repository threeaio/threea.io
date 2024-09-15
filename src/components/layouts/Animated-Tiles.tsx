import {children, JSX, onMount, Show} from "solid-js";
import { gsap } from "gsap";

export const AnimatedTiles = (
  props: JSX.HTMLAttributes<HTMLDivElement> & {
    Header?: JSX.Element | undefined;
    SubHeading?: JSX.Element | undefined;
    Tile1: JSX.Element;
    Tile2: JSX.Element;
    Tile3?: JSX.Element | undefined;
  },
) => {

  const Header =  children(() => props.Header);
  const SubHeading =  children(() => props.SubHeading);
  const Tile1 = children(() => props.Tile1);
  const Tile2 = children(() => props.Tile2);
  const Tile3 = children(() => props.Tile3);

  let container: HTMLDivElement;

  onMount(() => {
    if (!container) {
      return;
    }
    const headingsHere = container.querySelectorAll(".tile-heading");
    const tilesHere = container.querySelectorAll(".tile");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        preventOverlaps: true,
        once: true,
        pin: false,
        start: "30% bottom",
        end: "bottom top ",
        scrub: false,
      },
    });

    tl.addLabel("tiles-heading").from(headingsHere, {
      y: 40,
      stagger: 0.1,
      autoAlpha: 0,
      duration: (Header() || SubHeading()) ? .3 : 0
    });
    tl.addLabel("tiles").from(tilesHere, {
      stagger: 0.2,
      scale: 0.8,
      y: -60,
      autoAlpha: 0,
    }, '>0');
  });

  return (
    <div class={"px-6 md:px-0 pb-1 " + props.class}>
      <div
        class="tile-container grid grid-cols-26"
        ref={(el) => (container = el)}
      >
        <Show
          when={!!Header()}
        >
          <div class="col-span-full md:col-span-22 md:col-start-3 2xl:col-span-18 2xl:col-start-5">
            <div class="tile-heading">{Header()}</div>
          </div>
        </Show>
        <div class=" col-span-full md:col-span-22 md:col-start-3 2xl:col-span-18 2xl:col-start-5">
          <Show
            when={!!SubHeading()}
          >
            <div class="tile-heading">{SubHeading()}</div>
          </Show>
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-1 "
            classList={{ "lg:grid-cols-3": !!Tile3() }}
          >
            <div class="tile p-8 bg-3a-gray-darker flex items-center">
              {Tile1()}
            </div>
            <div class="tile p-8 bg-3a-gray-darker flex items-center">
              {Tile2()}
            </div>
            <Show
              when={!!Tile3()}
            >
              <div class="tile p-8 md:col-span-2 lg:col-span-1 bg-3a-gray-darker flex items-center">
                {Tile3()}
              </div>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};
