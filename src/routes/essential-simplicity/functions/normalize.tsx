import { createSignal } from "solid-js";
import { normalize } from "~/_util";
import { FunctionEntry } from "~/routes/essential-simplicity/functions/Function-Entry.interface";
import { RangeSlider, SliderContainer } from "~/components/Range-Slider";
import Anf from "~/components/typo/Anf";

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
          Übersetzung in eine Universalsprache. Sie ist das exakte Gegenstück zu
          der im Folgenden beschriebenen Funktion <code>lerp</code>: Während
          normalize <Anf>nach innen</Anf> auf <code>[0,1]</code> abbildet, geht
          lerp <Anf>nach außen</Anf> in einen Zielbereich.
        </p>
        <p>
          Diese Normalisierung berechnet die relative Position eines Wertes in
          seinem Bereich. Ein Wert genau in der Mitte ergibt <code>0.5</code>,
          am unteren Ende <code>0</code>, am oberen Ende <code>1</code>.
          Zusammen mit <code>lerp</code> bildet sie das Fundament der{" "}
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
    theFunction: (x: number) => {
      try {
        return normalize(min(), max(), x);
      } catch (e) {
        console.error(e);
        return 0;
      }
    },
    getXRange: () => [min(), max()],
  };
};
