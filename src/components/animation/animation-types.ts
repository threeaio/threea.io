import P5 from "p5";
import { ColorArray } from "~/_util";

export type DrawCallback<T> = (
  p5: P5,
  els: T[],
  progress: number,
  center: { x: number; y: number },
  dims: { x: number; y: number },
) => void;

export type SetCenterCallback = (
  width: number,
  height: number,
  progress: number,
) => { x: number; y: number };

export type SetStartRadius = (width: number, height: number) => number;

export type DrawCallbackProp<T> = {
  draw: DrawCallback<T>;
};

export type AnimatedSceneProps = {
  bgColor: ColorArray;
  fadeInOut: boolean;
  forceContentHeight?: true;
  setCenter: SetCenterCallback;
  animate?: boolean;
  animateBpm?: number;
  animateOffsetMs?: number;
  animateCommand?:
    | PointerEvent
    | MouseEvent
    | KeyboardEvent
    | number
    | undefined;
};
