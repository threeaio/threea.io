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
} from "~/_util";
import { COLORS_3A } from "~/_util-client-only";

export interface SimpleFunctionConfig {}

export default function SimpleFunction(p5: P5, config: SimpleFunctionConfig) {
  // State
  const [center, setCenter] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [dimension, setDimensions] = createSignal<Simple2D>({ x: 0, y: 0 });
  const [progress, setProgress] = createSignal(0);

  // Drawing function
  const draw = () => {};

  return {
    draw,
    setCenter,
    setDimensions,
    setProgress,
  };
}

export type SimpleFunctionType = ReturnType<typeof SimpleFunction>;
