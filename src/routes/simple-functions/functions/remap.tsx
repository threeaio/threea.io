import { createSignal } from "solid-js";
import { reMap } from "~/_util";
import { RangeSlider, SliderContainer } from "~/components/Range-Slider";
import { FunctionEntry } from "~/routes/simple-functions/functions/Function-Entry.interface";

export const createRemapEntry = (): FunctionEntry => {
  const [origMin, setOrigMin] = createSignal(0);
  const [origMax, setOrigMax] = createSignal(10);
  const [targetMin, setTargetMin] = createSignal(5);
  const [targetMax, setTargetMax] = createSignal(8);

  return {
    id: "remap",
    title: "Remap",
    description: () => (
      <>
        <p>
          Die <code>remap</code>-Funktion ist ein mächtiges Werkzeug zur
          Transformation von Wertebereichen. Sie übersetzt einen Wert aus einem
          Ursprungsbereich proportional in einen Zielbereich – ähnlich wie ein
          Übersetzer, der nicht nur die Sprache, sondern auch den kulturellen
          Kontext anpasst. Dies ist besonders nützlich, wenn Daten aus
          verschiedenen Quellen harmonisiert werden müssen.
        </p>
        <p>
          Ob Sensordaten in Bildschirmkoordinaten, Mausbewegungen in
          Animationsfortschritt oder Dezibel in Prozentwerte –{" "}
          <code>remap</code> macht die Umrechnung elegant und nachvollziehbar.
          Intern nutzt die Funktion eine Kombination aus Normalisierung und
          linearer Interpolation.
        </p>
        <SliderContainer>
          <div>
            <div class="text-sm font-mono mb-8">Ursprungsbereich</div>
            <RangeSlider
              label="Minimum"
              value={origMin()}
              onChange={setOrigMin}
              min={0}
              max={10}
            />
            <RangeSlider
              label="Maximum"
              value={origMax()}
              onChange={setOrigMax}
              min={0}
              max={10}
              class="mt-4"
            />
          </div>
          <div>
            <div class="text-sm font-mono mb-8">Zielbereich</div>
            <RangeSlider
              label="Minimum"
              value={targetMin()}
              onChange={setTargetMin}
              min={0}
              max={10}
            />
            <RangeSlider
              label="Maximum"
              value={targetMax()}
              onChange={setTargetMax}
              min={0}
              max={10}
              class="mt-4"
            />
          </div>
        </SliderContainer>
      </>
    ),
    theFunctionText: `
const reMap = (
  origMin: number, 
  origMax: number,
  targetMin: number,
  targetMax: number,
  value: number
) => {
  // Clamp input to original range
  const numClamped = clamp(origMin, origMax, value);
  // Normalize to 0-1
  const normalizedValue = (numClamped - origMin) / (origMax - origMin);
  // Scale to target range
  return targetMin + normalizedValue * (targetMax - targetMin);
};`,
    theFunction: (x: number) =>
      reMap(origMin(), origMax(), targetMin(), targetMax(), x),
    getXRange: () => [origMin(), origMax()],
    getYRange: () => [targetMin(), targetMax()],
  };
};
