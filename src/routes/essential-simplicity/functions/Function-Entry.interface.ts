import { JSX } from "solid-js";

export interface FunctionEntry {
  id: string;
  title: string;
  description: () => JSX.Element;
  theFunctionText: string;
  theFunction: (x: number) => number;
  config?: {
    min?: number;
    max?: number;
    range?: [number, number];
    // other config options specific to each function
  };
  getXRange?: () => [number, number];
  getYRange?: () => [number, number];
}
