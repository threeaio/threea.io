// functions/entries/smoothstep.tsx
import { createSignal } from "solid-js";
import { smoothStep } from "~/_util";
import { FunctionEntry } from "~/routes/simple-functions/functions/Function-Entry.interface";

export const createSmoothstepEntry = (): FunctionEntry => {
  return {
    id: "smoothstep",
    title: "Smoothstep",
    description: () => (
      <>
        <p>
          Die <code>smoothstep</code>-Funktion ist der Meister der weichen
          Übergänge. Sie erzeugt eine S-förmige Kurve, die sanft beginnt, in der
          Mitte gleichmäßig ansteigt und zum Ende hin wieder weich ausläuft.
          Ursprünglich von Ken Perlin für Computergrafik entwickelt, ist sie
          heute ein unverzichtbares Werkzeug für natürlich wirkende Animationen.
        </p>
        <p>
          Mathematisch handelt es sich um ein Hermite-Polynom dritten Grades,
          das stetig und zweimal differenzierbar ist. In der Praxis bedeutet
          das: Perfekt geglättete Übergänge ohne ruckartigen Start oder abruptes
          Ende. Die Funktion erwartet einen Eingabewert zwischen 0 und 1 und ist
          besonders nützlich für Fade-Effekte, Kamera-Bewegungen oder das
          Überblenden zwischen Zuständen.
        </p>
      </>
    ),
    theFunctionText: `
const smoothStep = (x: number): number => {
  if (x < 0 || x > 1) {
    throw new Error("Input x must be between 0 and 1.");
  }
  return x * x * (3 - 2 * x);
};`,
    theFunction: (x: number) => smoothStep(x),
    config: {
      min: 0,
      max: 1,
    },
  };
};
