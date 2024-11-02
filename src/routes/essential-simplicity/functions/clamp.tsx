import { createSignal } from "solid-js";
import { FunctionEntry } from "~/routes/essential-simplicity/functions/Function-Entry.interface";
import { clamp } from "~/_util";
import { RangeSlider, SliderContainer } from "~/components/Range-Slider";

export const createClampEntry = (): FunctionEntry => {
  const [min, setMin] = createSignal(0.3);
  const [max, setMax] = createSignal(0.7);

  return {
    id: "clamp",
    title: "Clamp",
    description: () => (
      <>
        <p>
          Die <code>clamp</code>-Funktion gehört zu den grundlegenden Werkzeugen
          in der Grafikprogrammierung. Sie begrenzt einen Wert auf ein
          definiertes Intervall und verhindert damit das Über- oder
          Unterschreiten festgelegter Grenzen – eine Aufgabe, die bei der Arbeit
          mit Koordinaten, Farben oder Animationsparametern ständig auftritt.
        </p>
        <p>
          Statt verschachtelter Bedingungen erledigt ein einfacher clamp-Aufruf
          die Überprüfung: Unterschreitet der Eingabewert die untere Grenze,
          wird der Minimalwert zurückgegeben, überschreitet er die obere Grenze,
          der Maximalwert. Liegt der Wert innerhalb des definierten Bereichs,
          bleibt er unverändert.
        </p>
        <p>
          Für den flexiblen Einsatz ist es wichtig, dass es egal ist, ob nun
          zuerst das Minimum oder das Maximum eingegeben wird.
        </p>
        <SliderContainer>
          <RangeSlider
            label="Untere Grenze"
            value={min()}
            onChange={setMin}
            min={0}
            max={1}
          />
          <RangeSlider
            label="Obere Grenze"
            value={max()}
            onChange={setMax}
            min={0}
            max={1}
          />
        </SliderContainer>
      </>
    ),
    theFunctionText: `
export const clamp = (rangeStart: number, rangeEnd: number, value: number) => {
  const _min = rangeStart < rangeEnd ? rangeStart : rangeEnd;
  const _max = rangeStart < rangeEnd ? rangeEnd : rangeStart;
  return Math.min(Math.max(_min, value), _max);
};`,
    theFunction: (x: number) => clamp(min(), max(), x),
    config: {
      min: 0,
      max: 1,
    },
  };
};
