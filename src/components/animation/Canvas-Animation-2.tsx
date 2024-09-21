import {
  onMount,
  createEffect,
  createMemo,
  ParentProps,
  onCleanup,
} from "solid-js";
import { gsap } from "gsap";
import P5 from "p5";
import { P5Line, subpoints } from "~/_util";
import { useAnimationWrapperContext } from "~/components/animation/Canvas-Animation-Wrapper";

export default function CanvasAnimation2(
  props: ParentProps & { hue?: number },
) {
  const { progress, active, velocity, width, height } =
    useAnimationWrapperContext();
  const isMoving = createMemo(() => velocity() > -0.02);
  const hasSize = createMemo(() => width() > 0 && height() > 0);

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
      randX1 = Math.random() * width();
      randX2 = Math.random() * width();
      randY1 = Math.random() * height();
      randY2 = Math.random() * height();
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

      const numPoints = 22;
      const lineA: P5Line = [lineOrigin, new P5.Vector(rands.randX1, 0)];
      const lineB: P5Line = [lineOrigin, new P5.Vector(rands.randX2, height())];
      const lineC: P5Line = [lineOrigin, new P5.Vector(0, rands.randY1)];
      const lineD: P5Line = [lineOrigin, new P5.Vector(width(), rands.randY2)];

      const subPointsA = subpoints(lineA, numPoints);
      const subPointsB = subpoints(lineB, numPoints);
      const subPointsC = subpoints(lineC, numPoints);
      const subPointsD = subpoints(lineD, numPoints);

      let hue = props.hue || 310;
      for (let i = 0; i < numPoints - 1; i++) {
        const diff = (i / numPoints) * -6;
        hue = (hue - diff) % 360;

        p5.blendMode(p5.ADD);
        p5.colorMode(p5.HSB);
        p5.stroke(p5.color(100, 0, 100, 0.01 * i));

        p5.fill(p5.color(hue, 20 + 4 * i, 30, 0.015));
        // p5.noFill();
        // p5.push();
        p5.beginShape();

        p5.vertex(subPointsA[i].x, subPointsA[i].y);
        p5.vertex(subPointsC[i].x, subPointsC[i].y);
        p5.vertex(subPointsB[i].x, subPointsB[i].y);
        p5.vertex(subPointsD[i].x, subPointsD[i].y);
        p5.endShape(p5.CLOSE);
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
