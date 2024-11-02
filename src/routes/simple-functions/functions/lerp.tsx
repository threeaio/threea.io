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
          Die <code>lerp</code>-Funktion (Linear Interpolation) ist der zweite
          Teil unseres Transformations-Duos. Als Gegenstück zu{" "}
          <code>normalize</code> nimmt sie einen normalisierten Wert zwischen 0
          und 1 und überführt ihn in einen gewünschten Zielbereich. Wo normalize
          "nach innen" auf [0,1] abbildet, geht lerp "nach außen" in einen
          beliebigen Bereich.
        </p>
        <p>
          Der Parameter t bestimmt dabei die relative Position im Zielbereich:
          Bei t=0 erhält man den Startwert, bei t=1 den Endwert, bei t=0.5 genau
          die Mitte. Gemeinsam mit <code>normalize</code> bildet lerp das
          mathematische Fundament für die <code>remap</code>-Funktion und ist
          unerlässlich für Animationen und Übergänge aller Art.
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
