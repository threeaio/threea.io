import { FunctionEntry } from "~/routes/simple-functions/functions/Function-Entry.interface";
import { createSignal } from "solid-js";
import { lerp } from "~/_util";
import { RangeSlider, SliderContainer } from "~/components/Range-Slider";

export const createLerpEntry = (): FunctionEntry => {
  const [start, setStart] = createSignal(0);
  const [end, setEnd] = createSignal(1);

  return {
    id: "lerp",
    title: "Linear Interpolation (Lerp)",
    description: () => (
      <>
        <p>
          Die <code>lerp</code>-Funktion (Linear Interpolation) ist ein
          unverzichtbares Werkzeug für Animationen und Übergänge. Sie berechnet
          einen Zwischenwert zwischen zwei Punkten basierend auf einem
          Interpolationsparameter t. Bei t=0 erhält man den Startwert, bei t=1
          den Endwert, und bei t=0.5 genau die Mitte.
        </p>
        <p>
          Diese Funktion ist besonders nützlich für weiche Bewegungen und
          Transitionen. Sie bildet die Grundlage für komplexere
          Easing-Funktionen und ermöglicht präzise Kontrolle über
          Animations-Sequenzen. Ob Position, Größe, Farbe oder Transparenz –
          lerp macht aus harten Sprüngen fließende Übergänge.
        </p>
        <SliderContainer>
          <RangeSlider
            label="Startwert"
            value={start()}
            onChange={setStart}
            min={0}
            max={1}
          />
          <RangeSlider
            label="Endwert"
            value={end()}
            onChange={setEnd}
            min={0}
            max={1}
          />
        </SliderContainer>
      </>
    ),
    theFunctionText: `
const lerp = (a: number, b: number, t: number) => {
  return a + t * (b - a);
};`,
    theFunction: (t: number) => {
      const a = start();
      const b = end();
      return a + t * (b - a);
    },
    config: {
      min: 0,
      max: 1,
    },
  };
};
