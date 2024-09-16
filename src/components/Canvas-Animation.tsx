import { fromLandingPageState } from "~/landing-page-state";
import { onMount, ParentComponent, createEffect } from "solid-js";
import { Bound, CanvasSpace, Pt } from "pts";
import { gsap } from "gsap";
import { createStore } from "solid-js/store";

type AnimationSectionState = {
  isActive: boolean;
  progress: number;
  direction: -1 | 1;
  velocity: number;
};

export const CanvasAnimation: ParentComponent = (props) => {
  const [{ landingPageState }] = fromLandingPageState;

  const [section1, setSection1] = createStore<AnimationSectionState>({
    isActive: false,
    progress: 0,
    direction: 1,
    velocity: 0,
  });

  const [section2, setSection2] = createStore<AnimationSectionState>({
    isActive: false,
    progress: 0,
    direction: 1,
    velocity: 0,
  });

  const green = "#3ef198";

  onMount(() => {
    const space = new CanvasSpace("#canvas-animation").setup({
      bgcolor: "transparent",
      retina: true,
      resize: true,
    });

    const form = space.getForm();

    let lineOrigin = new Pt(0, 0);
    let lineTarget = new Pt(0, 0);

    window.scrollTrigger.create({
      trigger: "#anim-step-1",
      start: "top top",
      endTrigger: "#anim-step-2",
      end: "top 30%",
      onToggle: (self) => {
        console.log("STEP 1", self.isActive);
        setSection1({ ...section1, isActive: self.isActive });
      },
      onUpdate: (self) => {
        setSection1({
          ...section1,
          progress: self.progress,
          direction:
            self.direction as unknown as AnimationSectionState["direction"],
          velocity: self.getVelocity(),
        });
      },
    });

    window.scrollTrigger.create({
      trigger: "#anim-step-2",
      start: "top 30%",
      endTrigger: "#anim-step-2",
      end: "bottom+=100px 50%+=100px",
      onToggle: (self) => {
        console.log("STEP 2", self.isActive);
        setSection2({ ...section2, isActive: self.isActive });
      },
      onUpdate: (self) => {
        setSection2({
          ...section2,
          progress: self.progress,
          direction:
            self.direction as unknown as AnimationSectionState["direction"],
          velocity: self.getVelocity(),
        });
      },
    });

    createEffect(() => {
      if (!section2.isActive && !section1.isActive) {
        return;
      }
      const originPoint = new Pt(
        Math.abs(section2.isActive ? landingPageState.totalWidth : 0),
        0,
      );
      // Math.abs(section2.isActive ? landingPageState.screenHeight : 0)

      const targetPoint = new Pt(
        Math.abs(
          section1.isActive ? section1.progress * 500 : section2.progress * 500,
        ),
        Math.abs(
          section1.isActive ? section1.progress * 500 : section2.progress * 500,
        ),
      );
      gsap.to(lineOrigin, {
        x: originPoint.x,
        y: originPoint.y,
        duration: 1,
      });
      gsap.to(lineTarget, {
        x: targetPoint.x,
        y: targetPoint.y,
        duration: 1,
      });
    }, [section1, section2]);

    space.add({
      start: (bound) => {},
      animate: (time, ftime) => {
        form.stroke(green).line([lineOrigin, lineTarget]);
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
