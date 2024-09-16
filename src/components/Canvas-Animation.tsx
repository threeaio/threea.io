import { fromLandingPageState } from "~/landing-page-state";
import { onMount, ParentComponent, createEffect } from "solid-js";
import { Bound, CanvasSpace, Pt } from "pts";
import { gsap } from "gsap";

export const CanvasAnimation: ParentComponent = (props) => {
  const [{ landingPageState }] = fromLandingPageState;

  const green = "#3ef198";

  onMount(() => {
    const space = new CanvasSpace("#canvas-animation").setup({
      bgcolor: "transparent",
      retina: true,
      resize: true,
    });

    const form = space.getForm();
    let currentPoint = new Pt(0, 0);

    createEffect(() => {
      const targetPoint = new Pt(
        Math.abs(landingPageState.progress * 100),
        Math.abs(landingPageState.progress * 100),
      );
      gsap.to(currentPoint, {
        x: targetPoint.x,
        y: targetPoint.y,
        duration: 1,
      });
    });

    space.add({
      start: (bound) => {},
      animate: (time, ftime) => {
        form.stroke(green).line([[0, 0], currentPoint]);
      },
      action: (type, x, y) => {},
      resize: (bound: Bound, evt?: Event) => {
        console.log("resize", bound, evt);
      },
    });

    space.bindMouse().bindTouch().play();
  });

  return (
    <div>
      <canvas
        class="fixed inset-0 pointer-events-none"
        id="canvas-animation"
      ></canvas>
      <div class="relative">{props.children}</div>
    </div>
  );
};
