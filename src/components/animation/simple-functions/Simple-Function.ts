import { createMemo, createSignal } from "solid-js";
import P5 from "p5";
import {
  getSliceLengthOnCircle,
  clamp,
  createArrayFromLength,
  getPointOnEllipse,
  reMap,
  Simple2D,
  translate2D,
  createSimple2D,
} from "~/_util";
import { COLORS_3A } from "~/_util-client-only";
import { drawGraph } from "~/_util-client-only/draw-graph";

export interface SimpleFunctionConfig {}

export default function SimpleFunction(p5: P5, config: SimpleFunctionConfig) {
  // State
  const [center, setCenter] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [dimension, setDimensions] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [progress, setProgress] = createSignal(0);

  const draw = (progress: number, fn: (x: number) => number) => {
    drawGraph(
      p5,
      { width: dimension().x, height: dimension().y },
      progress,
      fn,
    );
  };

  return {
    draw,
    setCenter,
    setDimensions,
    setProgress,
  };
}

export type SimpleFunctionType = ReturnType<typeof SimpleFunction>;