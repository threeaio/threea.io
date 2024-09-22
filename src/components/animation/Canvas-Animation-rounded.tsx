import {
  onMount,
  createEffect,
  createMemo,
  ParentProps,
  onCleanup,
} from "solid-js";
import { gsap } from "gsap";
import P5 from "p5";
import { BEZIER_CIRCLE, P5Line, subpoints } from "~/_util";
import { useAnimationWrapperContext } from "~/components/animation/Canvas-Animation-Wrapper";

export default function CanvasAnimation2(
  props: ParentProps & { hue?: number },
) {
  const { progress, active, velocity, width, height } =
    useAnimationWrapperContext();
  const isMoving = createMemo(() => velocity() > -0.02);
  const hasSize = createMemo(() => width() > 0 && height() > 0);

  const numPoints = 32;

  let randX1 = 0;
  let randX2 = 0;
  let randY1 = 0;
  let randY2 = 0;

  let p5Instance: P5;

  const rands = {
    randX1: Math.random() * width(),
    randX2: Math.random() * width(),
    randY1: Math.random() * height(),
    randY2: Math.random() * height(),
  };

  let lineOrigin = new P5.Vector(width() / 2, height() / 2);

  let animationParent: HTMLDivElement | undefined;

  createEffect(() => {
    if (!isMoving() || hasSize()) {
      const offsetX = width() / 4;
      const offsetY = height() / 4;
      randX1 = Math.random() * (width() - 2 * offsetX) + offsetX;
      randX2 = Math.random() * (width() - 2 * offsetX) + offsetX;
      randY1 = Math.random() * (height() - 2 * offsetY) + offsetY;
      randY2 = Math.random() * (height() - 2 * offsetY) + offsetY;
    }

    const originPoint = new P5.Vector(
      width() / 2 + (Math.cos(progress() * 4) * width()) / 2.5,
      progress() * height(),
    );

    gsap.to(lineOrigin, {
      x: originPoint.x,
      y: originPoint.y,
      duration: 1.2,
    });

    gsap.to(rands, {
      randX1: randX1,
      randX2: randX2,
      randY1: randY1,
      randY2: randY2,
      duration: 2.5,
      ease: "power3.inOut",
    });
  });

  const createSketch = (ref: HTMLDivElement) => {
    const sketch = (_p5: P5) => {
      _p5.setup = () => {
        const canvas = _p5.createCanvas(width(), height());
        canvas.parent(ref);
      };
    };

    // The sketch draw method
    const draw = () => {
      p5.clear();

      const lineA: P5Line = [lineOrigin, new P5.Vector(rands.randX1, 0)];
      const lineB: P5Line = [
        lineOrigin,
        new P5.Vector(rands.randX2, height() - 40),
      ];
      const lineC: P5Line = [lineOrigin, new P5.Vector(0, rands.randY1)];
      const lineD: P5Line = [
        lineOrigin,
        new P5.Vector(width() - 40, rands.randY2),
      ];

      const subPointsA = subpoints(lineA, numPoints);
      const subPointsB = subpoints(lineB, numPoints);
      const subPointsC = subpoints(lineC, numPoints);
      const subPointsD = subpoints(lineD, numPoints);

      for (let i = 0; i < numPoints; i++) {
        if (true) {
          const pzAD1: [number, number] = [
            subPointsA[i].x +
              (subPointsD[i].x - subPointsA[i].x) * BEZIER_CIRCLE,
            subPointsA[i].y,
          ];

          const pzAD2: [number, number] = [
            subPointsD[i].x,
            subPointsD[i].y -
              (subPointsD[i].y - subPointsA[i].y) * BEZIER_CIRCLE,
          ];

          const pzDB1: [number, number] = [
            subPointsD[i].x,
            subPointsD[i].y +
              (subPointsB[i].y - subPointsD[i].y) * BEZIER_CIRCLE,
          ];
          const pzDB2: [number, number] = [
            subPointsB[i].x -
              (subPointsB[i].x - subPointsD[i].x) * BEZIER_CIRCLE,
            subPointsB[i].y,
          ];

          const pzBC1: [number, number] = [
            subPointsC[i].x +
              (subPointsB[i].x - subPointsC[i].x) * BEZIER_CIRCLE,
            subPointsB[i].y,
          ];
          const pzBC2: [number, number] = [
            subPointsC[i].x,
            subPointsC[i].y +
              (subPointsB[i].y - subPointsC[i].y) * BEZIER_CIRCLE,
          ];

          const pzCA1: [number, number] = [
            subPointsC[i].x,
            subPointsA[i].y +
              (subPointsC[i].y - subPointsA[i].y) * BEZIER_CIRCLE,
          ];
          const pzCA2: [number, number] = [
            subPointsA[i].x +
              (subPointsC[i].x - subPointsA[i].x) * BEZIER_CIRCLE,
            subPointsA[i].y,
          ];
          //
          // p5.push();
          // p5.strokeWeight(3);
          // p5.stroke("red");
          // p5.point(subPointsA[i].x, subPointsA[i].y);
          // p5.stroke("yellow");
          // p5.point(subPointsD[i].x, subPointsD[i].y);
          // p5.stroke("green");
          // p5.point(subPointsB[i].x, subPointsB[i].y);
          // p5.stroke("blue");
          // p5.point(subPointsC[i].x, subPointsC[i].y);
          // p5.stroke("white");
          // p5.point(...pzAD1);
          // p5.point(...pzAD2);
          // p5.point(...pzDB1);
          // p5.point(...pzDB2);
          // p5.point(...pzBC1);
          // p5.point(...pzBC2);
          // p5.point(...pzCA1);
          // p5.point(...pzCA2);
          // p5.pop();

          p5.blendMode(p5.ADD);
          p5.colorMode(p5.HSB);
          // p5.stroke(p5.color(0, 0, 100, 1));
          p5.stroke(p5.color(0, 0, 100, 0.005 * i));

          const diff = (i / numPoints) * 110;
          let hue = props.hue || 270;
          hue = (hue - diff) % 360;

          // p5.fill(p5.color(hue, 70, 15, 0.0003 * i));
          p5.fill(p5.color(100, 0, 100, 0));
          // p5.noFill();
          // p5.push();
          p5.beginShape();

          // p5.curveVertex(subPointsA[i].x, subPointsA[i].y);
          // p5.curveVertex(subPointsD[i].x, subPointsD[i].y);
          // p5.curveVertex(subPointsB[i].x, subPointsB[i].y);
          // p5.curveVertex(subPointsC[i].x, subPointsC[i].y);
          // p5.curveVertex(subPointsA[i].x, subPointsA[i].y);
          // p5.curveVertex(subPointsD[i].x, subPointsD[i].y);
          // p5.curveVertex(subPointsB[i].x, subPointsB[i].y);

          p5.vertex(subPointsA[i].x, subPointsA[i].y);
          p5.bezierVertex(...pzAD1, ...pzAD2, subPointsD[i].x, subPointsD[i].y);

          p5.bezierVertex(...pzDB1, ...pzDB2, subPointsB[i].x, subPointsB[i].y);

          p5.bezierVertex(...pzBC1, ...pzBC2, subPointsC[i].x, subPointsC[i].y);

          p5.bezierVertex(...pzCA1, ...pzCA2, subPointsA[i].x, subPointsA[i].y);

          p5.endShape(p5.CLOSE);
        }

        // p5.pop();
      }
    };

    const p5 = new P5(sketch, ref);

    createEffect(() => {
      p5.resizeCanvas(width(), height());
    });

    p5.draw = draw;
    p5Instance = p5;
  };

  onMount(() => {
    if (animationParent) {
      createSketch(animationParent);
    }
  });

  onCleanup(() => {
    if (p5Instance) {
      p5Instance.remove();
    }
  });

  return (
    <div>
      <div
        class="absolute inset-0 pointer-events-none "
        ref={(el) => (animationParent = el)}
      ></div>
    </div>
  );
}
