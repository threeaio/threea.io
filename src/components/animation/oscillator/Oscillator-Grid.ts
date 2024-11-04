import { createMemo, createSignal } from "solid-js";
import P5 from "p5";
import { createArrayFromLength, lerp, magnify, reMap, Simple2D } from "~/_util";
import { COLORS_3A } from "~/_util-client-only";

export interface OrganicGridConfig {
  bpm: number;
}

interface GridPoint extends Simple2D {
  baseX: number;
  baseY: number;
  seedX: number;
  seedY: number;
}

export interface OrganicGridType {
  draw: () => void;
  setCenter: (center: Simple2D) => void;
  setDimensions: (dimensions: Simple2D) => void;
  setProgress: (progress: number) => void;
  setCurrentTime: (timeInMs: number) => void;
}

export function OrganicGrid(
  p5: P5,
  config: OrganicGridConfig,
): OrganicGridType {
  const [center, setCenter] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [dimensions, setDimensions] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [progress, setProgress] = createSignal(0);
  const [lastOscState, setLastOscState] = createSignal(1);
  const [currentTime, setCurrentTime] = createSignal(0);
  const [gridPoints, setGridPoints] = createSignal<GridPoint[][]>([]);

  // Initialize grid points with random seeds for organic movement

  // const oscillatorMemo = createMemo(() => {
  //   return getBpmOscillator(currentTime(), config.bpm, config.shape, 0);
  // });

  const getPoints = createMemo(() => {
    const amount = 20;
    const fac: number = dimensions().x / amount;
    return createArrayFromLength(amount).map((x) => x * fac);
  });

  const getPointsMapped = () => {
    if (!getPoints() || !getPoints().length) {
      return [];
    }
    const min = Math.min(...getPoints());
    const max = Math.max(...getPoints());

    return magnify(getPoints(), Math.round(p5.mouseX), 2.8, 0.2);
  };

  const draw = () => {
    const dims = dimensions();
    const c = center();
    const points = getPointsMapped();
    if (!points.length) return;

    p5.push();
    p5.noFill();
    p5.stroke(COLORS_3A.WHITE);

    for (let i = 0; i < getPointsMapped().length; i++) {
      const base = 300;
      const base2 = 20;
      p5.line(
        getPointsMapped()[i].x,
        base - getPointsMapped()[i].scale * base2,
        getPointsMapped()[i].x,
        base + getPointsMapped()[i].scale * base2,
      );
      if (i > 0) {
        p5.line(
          getPointsMapped()[i].x,
          base - getPointsMapped()[i].scale * base2,
          getPointsMapped()[i - 1].x,
          base - getPointsMapped()[i - 1].scale * base2,
        );
        p5.line(
          getPointsMapped()[i].x,
          base + getPointsMapped()[i].scale * base2,
          getPointsMapped()[i - 1].x,
          base + getPointsMapped()[i - 1].scale * base2,
        );
      }
      // p5.circle(getPointsMapped()[i].x, 200, getPointsMapped()[i].scale * 10);
      // p5.text(
      //   getPointsMapped()[i].scale.toFixed(2),
      //   getPointsMapped()[i].x,
      //   200,
      // );
    }

    p5.pop();
  };

  return {
    draw,
    setCenter,
    setDimensions,
    setProgress,
    setCurrentTime,
  };
}
