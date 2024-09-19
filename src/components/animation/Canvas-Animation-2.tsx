import { fromLandingPageState } from "~/landing-page-state";
import { onMount, createEffect, createMemo, ParentProps } from "solid-js";
import { Bound, CanvasSpace, Color, Line, Num, Pt, PtLikeIterable } from "pts";
import { gsap } from "gsap";
import P5 from "p5";

export default function CanvasAnimation2(props: ParentProps) {
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

  let lineOrigin = new Pt(0, 0);

  let animationParent: HTMLDivElement | undefined;

  const createSketch = (ref: HTMLDivElement) => {
    const sketch = (p5: P5) => {
      p5.setup = () => {
        const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        canvas.parent(ref);
        // p5.debugMode();
        // p5.rectMode(p5.CORNER);
      };
    };

    // The sketch draw method
    const draw = () => {
      p5.clear();

      const numPoints = 22;
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

      const subPointsA = Line.subpoints(lineA as PtLikeIterable, numPoints);
      const subPointsB = Line.subpoints(lineB as PtLikeIterable, numPoints);
      const subPointsC = Line.subpoints(lineC as PtLikeIterable, numPoints);
      const subPointsD = Line.subpoints(lineD as PtLikeIterable, numPoints);

      const violett = Color.from([240, 150, 240, 1]);
      for (let i = 0; i < numPoints - 1; i++) {
        const _violett = Color.RGBtoHSB(violett);
        const perc = (numPoints / (i + 1)) * 20;
        const hue = (perc + _violett.h) % 360;

        p5.blendMode(p5.ADD);
        p5.colorMode(p5.HSB);
        p5.stroke(p5.color(100, 0, 100, 0.003 * i));

        p5.fill(p5.color(hue, 90, 100, 0.015));
        // p5.noFill();
        p5.push();
        p5.beginShape();

        p5.vertex(subPointsA[i].x, subPointsA[i].y);
        p5.vertex(subPointsC[i].x, subPointsC[i].y);
        p5.vertex(subPointsB[i].x, subPointsB[i].y);
        p5.vertex(subPointsD[i].x, subPointsD[i].y);
        p5.endShape(p5.CLOSE);
        p5.pop();

        // polygon([subPointsA[i], subPointsC[i], subPointsB[i], subPointsD[i]]);
      }

      const connectAtIndex = (index: number) => {
        const base = 0.01;
        // space
        //   .getForm()
        //   .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
        //   .line([subPointsA[index], subPointsC[index]]);
        //
        // space
        //   .getForm()
        //   .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
        //   .line([subPointsB[index], subPointsC[index]]);
        //
        // space
        //   .getForm()
        //   .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
        //   .line([subPointsB[index], subPointsD[index]]);
        //
        // space
        //   .getForm()
        //   .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
        //   .line([subPointsC[index], subPointsD[index]]);
        //
        // space
        //   .getForm()
        //   .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
        //   .line([subPointsA[index], subPointsB[index]]);
        //
        // space
        //   .getForm()
        //   .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
        //   .line([subPointsA[index], subPointsD[index]]);
      };

      // connectAtIndex(0);
      // connectAtIndex(Math.round(numPoints / 2));
      // connectAtIndex(numPoints - 1);

      // space
      //   .getForm()
      //   .stroke("transparent")
      //   .fill("white")
      //   .circle([lineOrigin, [3, 3]]);
    };

    const p5 = new P5(sketch, ref);

    p5.windowResized = (ev) => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
    p5.draw = draw;
  };

  onMount(() => {
    // const space = new CanvasSpace("#canvas-animation").setup({
    //   bgcolor: "transparent",
    //   retina: true,
    //   resize: true,
    // });

    if (animationParent) {
      createSketch(animationParent);
    }

    createEffect(() => {
      if (!isMoving() || hasSize()) {
        randX1 = Math.random() * landingPageState.totalWidth;
        randX2 = Math.random() * landingPageState.totalWidth;
        randY1 = Math.random() * landingPageState.screenHeight;
        randY2 = Math.random() * landingPageState.screenHeight;
      }

      const originPoint = new Pt(
        landingPageState.totalWidth / 2 +
          (Math.cos(
            (landingPageState.progress /
              ((landingPageState.screenHeight * 4) /
                (landingPageState.totalContentHeight
                  ? landingPageState.totalContentHeight
                  : 1))) *
              6,
          ) *
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

    // space.add({
    //   start: (bound) => {},
    //   animate: (time, ftime) => {
    //     const numPoints = 22;
    //     const lineA = [lineOrigin, new Pt(rands.randX1, 0)];
    //     const lineB = [
    //       lineOrigin,
    //       new Pt(rands.randX2, landingPageState.screenHeight),
    //     ];
    //     const lineC = [lineOrigin, new Pt(0, rands.randY1)];
    //     const lineD = [
    //       lineOrigin,
    //       new Pt(landingPageState.totalWidth, rands.randY2),
    //     ];
    //
    //     const subPointsA = Line.subpoints(lineA, numPoints);
    //     const subPointsB = Line.subpoints(lineB, numPoints);
    //     const subPointsC = Line.subpoints(lineC, numPoints);
    //     const subPointsD = Line.subpoints(lineD, numPoints);
    //
    //     const green = [60, 240, 150];
    //     const violett = Color.from([240, 150, 240, 1]);
    //     for (let i = 0; i < numPoints - 1; i++) {
    //       const _violett = Color.RGBtoHSB(violett);
    //       const hue = (i * 4 + _violett.h) % 360;
    //       _violett.h = hue;
    //       _violett.s = 5 / (i === 0 ? 1 : i);
    //       // _violett.b = 70 / (i === 0 ? 1 : i);
    //       // _violett.s = i * 5;
    //       // _violett.b = i * 5;
    //       const finalColor = Color.HSBtoRGB(_violett);
    //       space
    //         .getForm()
    //         .stroke(`rgba(255,255,255, ${i * 0.003})`)
    //         .fill(`rgba(${finalColor.r},${finalColor.g},${finalColor.b},.01)`)
    //         .polygon([
    //           subPointsA[i],
    //           subPointsC[i],
    //           subPointsB[i],
    //           subPointsD[i],
    //         ]);
    //     }
    //
    //     const connectAtIndex = (index: number) => {
    //       const base = 0.01;
    //       space
    //         .getForm()
    //         .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
    //         .line([subPointsA[index], subPointsC[index]]);
    //
    //       space
    //         .getForm()
    //         .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
    //         .line([subPointsB[index], subPointsC[index]]);
    //
    //       space
    //         .getForm()
    //         .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
    //         .line([subPointsB[index], subPointsD[index]]);
    //
    //       space
    //         .getForm()
    //         .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
    //         .line([subPointsC[index], subPointsD[index]]);
    //
    //       space
    //         .getForm()
    //         .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
    //         .line([subPointsA[index], subPointsB[index]]);
    //
    //       space
    //         .getForm()
    //         .stroke(`rgba(255,255,255, ${base * (index + 1)})`)
    //         .line([subPointsA[index], subPointsD[index]]);
    //     };
    //
    //     // connectAtIndex(0);
    //     // connectAtIndex(Math.round(numPoints / 2));
    //     // connectAtIndex(numPoints - 1);
    //
    //     // space
    //     //   .getForm()
    //     //   .stroke("transparent")
    //     //   .fill("white")
    //     //   .circle([lineOrigin, [3, 3]]);
    //   },
    //   action: (type, x, y) => {},
    //   resize: (bound: Bound, evt?: Event) => {
    //     console.log("resize", bound, evt);
    //   },
    // });
    // space.ctx.globalCompositeOperation = "lighter";
    // space.play();
  });

  return (
    <div>
      <div
        class="fixed inset-0 pointer-events-none "
        ref={(el) => (animationParent = el)}
      ></div>
    </div>
  );
}
