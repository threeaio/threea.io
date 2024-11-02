// functions/entries/normalize.tsx
import { createSignal } from "solid-js";
import { normalize } from "~/_util";
import { FunctionEntry } from "~/routes/simple-functions/functions/Function-Entry.interface";
import { RangeSlider, SliderContainer } from "~/components/Range-Slider";

export const createNormalizeEntry = (): FunctionEntry => {
  const [min, setMin] = createSignal(0);
  const [max, setMax] = createSignal(10);

  return {
    id: "normalize",
    title: "Normalize",
    description: () => (
      <>
        <p>
          Die <code>normalize</code>-Funktion ist der erste Teil eines mächtigen
          Duos in der Wertetransformation. Sie wandelt einen Wert aus einem
          beliebigen Bereich in einen Wert zwischen 0 und 1 um – quasi eine
          Übersetzung in eine Universalsprache. Sie ist das exakte Gegenstück zu{" "}
          <code>lerp</code>: Während normalize "nach innen" auf [0,1] abbildet,
          geht lerp "nach außen" in einen Zielbereich.
        </p>
        <p>
          Diese Normalisierung berechnet die relative Position eines Wertes in
          seinem Bereich. Ein Wert genau in der Mitte ergibt 0.5, am unteren
          Ende 0, am oberen Ende 1. Zusammen mit <code>lerp</code> bildet sie
          das Fundament der
          <code>remap</code>-Funktion und ist essentiell für die Verarbeitung
          von Eingabewerten aller Art.
        </p>
        <SliderContainer>
          <RangeSlider
            label="Minimum"
            value={min()}
            onChange={setMin}
            min={0}
            max={10}
          />
          <RangeSlider
            label="Maximum"
            value={max()}
            onChange={setMax}
            min={0}
            max={10}
          />
        </SliderContainer>
      </>
    ),
    theFunctionText: `
const normalize = (min: number, max: number, value: number) => {
  if (max - min === 0) {
    throw new RangeError(
      \`Must be a range greater than 0. Given was a range with max: \${max} and min: \${min}\`
    );
  }
  return (value - min) / (max - min);
};`,
    theFunction: (x: number) => normalize(min(), max(), x),
    getXRange: () => [min(), max()],
  };
};
