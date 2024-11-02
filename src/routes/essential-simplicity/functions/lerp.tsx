import { FunctionEntry } from "~/routes/essential-simplicity/functions/Function-Entry.interface";
import { createSignal } from "solid-js";
import { lerp } from "~/_util";
import { RangeSlider, SliderContainer } from "~/components/Range-Slider";
import Anf from "~/components/typo/Anf";

export const createLerpEntry = (): FunctionEntry => {
  const [start, setStart] = createSignal(0);
  const [end, setEnd] = createSignal(10);

  return {
    id: "lerp",
    title: "Lerp (Linear Interpolation)",
    description: () => (
      <>
        <p>
          Die <code>lerp</code>-Funktion (Linear Interpolation) ist der zweite
          Teil unseres Transformations-Duos. Als Gegenstück zu{" "}
          <code>normalize</code> nimmt sie einen normalisierten Wert zwischen 0
          und 1 und überführt ihn in einen gewünschten Zielbereich. Wo normalize
          nach <Anf>innen</Anf> auf <code>[0,1]</code> abbildet, geht lerp{" "}
          <Anf>nach außen</Anf> in einen beliebigen Bereich.
        </p>
        <p>
          Der Parameter t bestimmt dabei die relative Position im Zielbereich:
          Bei <code>t=0</code> erhält man den Startwert, bei <code>t=1</code>{" "}
          den Endwert, bei <code>t=0.5</code> genau die Mitte. Gemeinsam mit{" "}
          <code>normalize</code> bildet lerp das mathematische Fundament für die{" "}
          <code>remap</code>-Funktion und ist unerlässlich für Animationen und
          Übergänge aller Art.
        </p>
        <SliderContainer>
          <RangeSlider
            label="Startwert"
            value={start()}
            onChange={setStart}
            min={0}
            max={10}
          />
          <RangeSlider
            label="Endwert"
            value={end()}
            onChange={setEnd}
            min={0}
            max={10}
          />
        </SliderContainer>
      </>
    ),
    theFunctionText: `
const lerp = (a: number, b: number, t: number) => {
  return a + t * (b - a);
};`,
    theFunction: (t: number) => {
      return lerp(start(), end(), t);
    },
    getYRange: () => [start(), end()],
  };
};
