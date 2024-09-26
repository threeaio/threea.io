import {
  onMount,
  createEffect,
  createMemo,
  ParentProps,
  onCleanup,
} from "solid-js";
import { gsap } from "gsap";
import P5 from "p5";
import { useAnimationWrapperContext } from "~/components/animation/Canvas-Animation-Wrapper";
import { BrockmanProps } from "~/components/animation/Primitives/Arc-Props";
import VerticeArc from "~/components/animation/Primitives/Vertice-Arc";

export default function CanvasAnimationSwiss1(
  props: ParentProps & { hue?: number },
) {
  const { progress, active, velocity, width, height } =
    useAnimationWrapperContext();

  const isMoving = createMemo(() => {
    return Math.abs(velocity()) > 20;
  });
  const hasSize = createMemo(() => width() > 0 && height() > 0);

  let p5Instance: P5;

  let animationParent: HTMLDivElement | undefined;

  let origin = new P5.Vector(width() / 1.2, height() / 2);

  const numPoints = 2000; // resolution
  let resolutionDynamicProxy = {
    numPoints,
  };
  const arcRange = [80, 110];
  const dist = [6, 10, 16];
  const sizes = [30, 50, 80, 130];
  const amount = 10;
  const brockmanns: VerticeArc[] = [];
  const brockmannProps: BrockmanProps[] = [];

  let lastRad = width() / 5;

  createEffect(() => {
    const newOriginPoint = new P5.Vector(
      width() / 1.7 + (progress() * width()) / 15,
      height() / 2 + (progress() * height()) / 15,
    );

    gsap.to(origin, {
      x: newOriginPoint.x,
      y: newOriginPoint.y,
      duration: 0.3,
    });
  });

  // createEffect(() => {
  //   const newResDyn = progress() * numPoints;
  //   gsap.to(resolutionDynamicProxy, {
  //     numPoints: newResDyn,
  //     duration: 0.3,
  //   });
  // });

  createEffect(() => {
    if (!isMoving() || (hasSize() && !isMoving())) {
      // TODO: init value?
      // let lastRad = width() / 10;
      lastRad = width() / 10;
      for (let i = 0; i < brockmanns.length; i++) {
        const distHere = p5Instance.random(dist);
        const sizeHere = p5Instance.random(sizes);
        const newRad = lastRad + distHere + sizeHere;
        brockmannProps[i] = {
          pos: origin,
          arcStart: p5Instance.random(arcRange[1] * -1, arcRange[0] * -1),
          arcEnd: p5Instance.random(arcRange[0], arcRange[1]),
          radius: lastRad + distHere,
          thickness: sizeHere,
          numPoints: numPoints,
        };
        lastRad = newRad;
      }

      if (brockmanns.length) {
        for (let i = 0; i < brockmanns.length; i++) {
          gsap.to(brockmanns[i]._props, {
            ...brockmannProps[i],
            duration: 1.2,
          });
        }
      }
    }
  });

  const createSketch = (ref: HTMLDivElement) => {
    const style = getComputedStyle(document.body);
    const colorGray = style.getPropertyValue("--color-3a-gray");
    const colorGrayDarkest = style.getPropertyValue("--color-3a-gray-darkest");
    const colorGreen = style.getPropertyValue("--color-3a-green");

    const sketch = (_p5: P5) => {
      const useColor = style.getPropertyValue("--color-3a-paper");

      _p5.setup = () => {
        const canvas = _p5.createCanvas(width(), height());
        _p5.angleMode(_p5.DEGREES);
        canvas.parent(ref);

        // TODO: init value?
        let lastRad = width() / 10;

        for (let i = 0; i < amount; i++) {
          const distHere = _p5.random(dist);
          const sizeHere = _p5.random(sizes);
          const newRad = lastRad + distHere + sizeHere;
          brockmanns.push(
            new VerticeArc(_p5, {
              pos: origin,
              arcStart: _p5.random(arcRange[1] * -1, arcRange[0] * -1),
              arcEnd: _p5.random(arcRange[0], arcRange[1]),
              radius: lastRad + distHere,
              thickness: sizeHere,
              color: useColor,
              numPoints: resolutionDynamicProxy.numPoints,
            }),
          );
          lastRad = newRad;
        }
      };
    };

    // The sketch draw method
    const draw = () => {
      p5.clear();

      let timer = p5.cos(p5.millis() / 100);
      // console.log(timer);
      brockmanns.forEach((b) => {
        const num = Math.floor(
          p5.constrain(resolutionDynamicProxy.numPoints, 2, numPoints),
        );
        b._props.numPoints = num;
        b.update(origin, timer);
        b.draw();
      });
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
