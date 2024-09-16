import { fromLandingPageState } from "~/landing-page-state";
import { onMount, ParentComponent, createEffect } from "solid-js";
import { Bound, CanvasSpace, Line, Num, Pt } from "pts";
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

  let randX1 = 0;
  let randX2 = 0;
  let randX3 = 0;
  let randX4 = 0;
  let randY1 = 0;
  let randY2 = 0;

  createEffect(() => {
    randX1 = Math.random() * landingPageState.totalWidth;
    randX2 = Math.random() * landingPageState.totalWidth;
    randY1 = Math.random() * landingPageState.screenHeight;
    randY2 = Math.random() * landingPageState.screenHeight;
  });

  onMount(() => {
    const space = new CanvasSpace("#canvas-animation").setup({
      bgcolor: "transparent",
      retina: true,
      resize: true,
    });

    let lineOrigin = new Pt(0, 0);
    let lineTarget = new Pt(0, 0);

    // window.scrollTrigger.create({
    //   trigger: "#anim-step-1",
    //   start: "top top",
    //   endTrigger: "#anim-step-2",
    //   end: "top 30%",
    //   onToggle: (self) => {
    //     console.log("STEP 1", self.isActive);
    //     setSection1({ ...section1, isActive: self.isActive });
    //   },
    //   onUpdate: (self) => {
    //     setSection1({
    //       ...section1,
    //       progress: self.progress,
    //       direction:
    //         self.direction as unknown as AnimationSectionState["direction"],
    //       velocity: self.getVelocity(),
    //     });
    //   },
    // });
    //
    // window.scrollTrigger.create({
    //   trigger: "#anim-step-2",
    //   start: "top 30%",
    //   endTrigger: "#anim-step-2",
    //   end: "bottom+=100px 50%+=100px",
    //   onToggle: (self) => {
    //     console.log("STEP 2", self.isActive);
    //     setSection2({ ...section2, isActive: self.isActive });
    //   },
    //   onUpdate: (self) => {
    //     setSection2({
    //       ...section2,
    //       progress: self.progress,
    //       direction:
    //         self.direction as unknown as AnimationSectionState["direction"],
    //       velocity: self.getVelocity(),
    //     });
    //   },
    // });

    createEffect(() => {
      // if (!section2.isActive && !section1.isActive) {
      //   return;
      // }
      const originPoint = new Pt(
        landingPageState.totalWidth / 2 +
          (Math.cos(landingPageState.progress * 8) *
            landingPageState.totalWidth) /
            3,
        landingPageState.screenHeight / 2 +
          (Math.sin(landingPageState.progress * 8) *
            landingPageState.screenHeight) /
            3,
      );
      // Math.abs(section2.isActive ? landingPageState.screenHeight : 0)

      // const targetPoint = new Pt(
      //   Math.abs(landingPageState.progress * landingPageState.totalWidth),
      //   Math.abs(landingPageState.progress * landingPageState.screenHeight),
      // );
      gsap.to(lineOrigin, {
        x: originPoint.x,
        y: originPoint.y,
        duration: 0.5,
      });
      // gsap.to(lineTarget, {
      //   x: targetPoint.x,
      //   y: targetPoint.y,
      //   duration: 1,
      // });
    }, [section1, section2]);

    space.add({
      start: (bound) => {},
      animate: (time, ftime) => {
        const numPoints = 12;
        const lineA = [lineOrigin, new Pt(randX1, 0)];
        const lineB = [
          lineOrigin,
          new Pt(randX2, landingPageState.screenHeight),
        ];
        const lineC = [lineOrigin, new Pt(0, randY1)];
        const lineD = [lineOrigin, new Pt(landingPageState.totalWidth, randY2)];

        const subPointsA = Line.subpoints(lineA, numPoints);
        const subPointsB = Line.subpoints(lineB, numPoints);
        const subPointsC = Line.subpoints(lineC, numPoints);
        const subPointsD = Line.subpoints(lineD, numPoints);

        for (let i = 0; i < numPoints; i++) {
          space
            .getForm()
            .stroke(`transparent`)
            .fill(`rgba(60,240,150,.02)`)
            .polygon([
              subPointsA[i],
              subPointsC[i],
              subPointsB[i],
              subPointsD[i],
            ]);
        }

        //
        // circle
        //   .stroke("transparent")
        //   .fill(green)
        //   .circle([lineOrigin, [3, 3]]);
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
        class="fixed inset-0 pointer-events-none "
        id="canvas-animation"
      ></canvas>
      <div class="relative">{props.children}</div>
    </div>
  );
};
