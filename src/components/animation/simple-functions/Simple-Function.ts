import { createMemo, createSignal } from "solid-js";
import P5 from "p5";
import { Simple2D } from "~/_util";
import { drawGraph, GraphConfig } from "~/_util-client-only/draw-graph";

export interface SimpleFunctionConfig {}

export default function SimpleFunction(p5: P5, config: SimpleFunctionConfig) {
  // State
  const [center, setCenter] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [dimension, setDimensions] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [progress, setProgress] = createSignal(0);
  const [xRange, setXRange] = createSignal<GraphConfig["xRange"]>({
    min: 0,
    max: 1,
    fixed: true,
  });

  const draw = (progress: number, fn: (x: number) => number) => {
    drawGraph(
      p5,
      { width: dimension().x, height: dimension().y },
      progress,
      fn,
      {
        xRange: xRange(),
      },
    );
  };

  return {
    draw,
    setCenter,
    setDimensions,
    setProgress,
    setXRange,
  };
}

export type SimpleFunctionType = ReturnType<typeof SimpleFunction>;
