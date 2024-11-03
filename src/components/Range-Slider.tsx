import { JSX } from "solid-js";

interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  class?: string;
}

export function RangeSlider(props: RangeSliderProps) {
  return (
    <div class={props.class}>
      <label class="block text-sm font-mono mb-2 text-3a-green">
        {props.label}
      </label>
      <input
        type="range"
        min={props.min ?? 0}
        max={props.max ?? 1}
        step={props.step ?? 0.01}
        value={props.value}
        onInput={(e) => props.onChange(Number(e.currentTarget.value))}
        class="w-full"
      />
      <div class="text-center font-mono mt-1">{props.value.toFixed(2)}</div>
    </div>
  );
}

// Optional: Create a container for paired sliders
interface SliderContainerProps {
  children: JSX.Element;
  class?: string;
}

export function SliderContainer(props: SliderContainerProps) {
  return (
    <div
      class={`grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mb-12 mt-12 ${props.class ?? ""}`}
    >
      {props.children}
    </div>
  );
}
