import { fromLandingPageState } from "~/landing-page-state";
import { onMount, ParentComponent, createEffect, createMemo } from "solid-js";
import { Bound, CanvasSpace, Line, Num, Pt } from "pts";
import { gsap } from "gsap";

export const CanvasAnimation2: ParentComponent = (props) => {
  const [{ landingPageState }] = fromLandingPageState;
  const isMoving = createMemo(() => landingPageState.velocity > -0.02);
  const hasSize = createMemo(
    () => landingPageState.totalWidth > 0 && landingPageState.screenHeight > 0,
  );

  let randX1 = 0;
  let randX2 = 0;
  let randY1 = 0;
  let randY2 = 0;

  const rands = {
    randX1: Math.random() * landingPageState.totalWidth,
    randX2: Math.random() * landingPageState.totalWidth,
    randY1: Math.random() * landingPageState.screenHeight,
    randY2: Math.random() * landingPageState.screenHeight,
  };

  onMount(() => {
    const space = new CanvasSpace("#canvas-animation-2").setup({
      bgcolor: "transparent",
      retina: true,
      resize: true,
    });

    let lineOrigin = new Pt(0, 0);

    createEffect(() => {
      if (!isMoving() || hasSize()) {
        randX1 = Math.random() * landingPageState.totalWidth;
        randX2 = Math.random() * landingPageState.totalWidth;
        randY1 = Math.random() * landingPageState.screenHeight;
        randY2 = Math.random() * landingPageState.screenHeight;
      }

      const originPoint = new Pt(
        landingPageState.totalWidth / 2 +
          (Math.cos(landingPageState.progress * 6) *
            landingPageState.totalWidth) /
            3,
        landingPageState.progress * landingPageState.screenHeight,
      );

      gsap.to(lineOrigin, {
        x: originPoint.x,
        y: originPoint.y,
        duration: 0.5,
      });

      gsap.to(rands, {
        randX1: randX1,
        randX2: randX2,
        randY1: randY1,
        randY2: randY2,
        duration: 1.5,
        ease: "power3.inOut",
      });
    });

    space.add({
      start: (bound) => {},
      animate: (time, ftime) => {
        const numPoints = 12;
        const lineA = [lineOrigin, new Pt(rands.randX1, 0)];
        const lineB = [
          lineOrigin,
          new Pt(rands.randX2, landingPageState.screenHeight),
        ];
        const lineC = [lineOrigin, new Pt(0, rands.randY1)];
        const lineD = [
          lineOrigin,
          new Pt(landingPageState.totalWidth, rands.randY2),
        ];

        const subPointsA = Line.subpoints(lineA, numPoints);
        const subPointsB = Line.subpoints(lineB, numPoints);
        const subPointsC = Line.subpoints(lineC, numPoints);
        const subPointsD = Line.subpoints(lineD, numPoints);

        const green = [60, 240, 150];
        const violett = [240, 150, 240];
        for (let i = 0; i < numPoints; i++) {
          space
            .getForm()
            .stroke(`rgba(255,255,255, 0.${0})`)
            .fill(`rgba(${green.join()},.02)`)
            .polygon([
              subPointsA[i],
              subPointsC[i],
              subPointsB[i],
              subPointsD[i],
            ]);
        }

        const connectAtIndex = (index: number) => {
          const base = 0.01;
          space
            .getForm()
            .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
            .line([subPointsA[index], subPointsC[index]]);

          space
            .getForm()
            .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
            .line([subPointsB[index], subPointsC[index]]);

          space
            .getForm()
            .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
            .line([subPointsB[index], subPointsD[index]]);

          space
            .getForm()
            .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
            .line([subPointsC[index], subPointsD[index]]);

          space
            .getForm()
            .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
            .line([subPointsA[index], subPointsB[index]]);

          space
            .getForm()
            .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
            .line([subPointsA[index], subPointsD[index]]);
        };

        // connectAtIndex(0);
        // connectAtIndex(Math.round(numPoints / 2));
        // connectAtIndex(numPoints - 1);

        // space
        //   .getForm()
        //   .stroke("transparent")
        //   .fill("white")
        //   .circle([lineOrigin, [3, 3]]);
      },
      action: (type, x, y) => {},
      resize: (bound: Bound, evt?: Event) => {
        console.log("resize", bound, evt);
      },
    });

    space.play();
  });

  return (
    <div>
      <canvas
        class="fixed inset-0 pointer-events-none "
        id="canvas-animation-2"
      ></canvas>
      <div class="relative">{props.children}</div>
    </div>
  );
};
