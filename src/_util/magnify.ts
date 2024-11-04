import { clampToUnit, clamp, reMap } from "~/_util/generic.functions";

/**
 * Funktionstyp für verschiedene Skalierungsalgorithmen
 * @param normalizedDistance Normalisierte Distanz zum Fokuspunkt (0-1)
 * @param strength Stärke des Effekts
 * @returns Skalierungsfaktor (1 = keine Skalierung)
 */
type ScaleFunction = (normalizedDistance: number, strength: number) => number;

/**
 * Sammlung verschiedener Skalierungsfunktionen
 */
export const ScaleFunctions = {
  /**
   * Gauß-Verteilung - sehr weicher, natürlicher Übergang
   */
  gaussian: (normalizedDistance: number, strength: number): number => {
    return (
      1 + strength * Math.exp(-(normalizedDistance * normalizedDistance) / 2)
    );
  },

  /**
   * Kosinus-basiert - definierter Übergang mit klarer Grenze
   */
  cosine: (normalizedDistance: number, strength: number): number => {
    if (normalizedDistance >= 1) return 1;
    return 1 + (strength * (Math.cos(normalizedDistance * Math.PI) + 1)) / 2;
  },

  /**
   * Smoothstep - klassische Glättungsfunktion aus der Computergrafik
   */
  smoothstep: (normalizedDistance: number, strength: number): number => {
    if (normalizedDistance >= 1) return 1;
    const x = 1 - normalizedDistance;
    return 1 + strength * (x * x * (3 - 2 * x));
  },

  /**
   * Quadratische Funktion - einfacher, aber effektiver Übergang
   */
  quadratic: (normalizedDistance: number, strength: number): number => {
    if (normalizedDistance >= 1) return 1;
    const x = 1 - normalizedDistance;
    return 1 + strength * (x * x);
  },

  /**
   * Plateau-Funktion - gleichmäßige Vergrößerung in der Mitte
   */
  plateau: (normalizedDistance: number, strength: number): number => {
    if (normalizedDistance >= 1) return 1;
    const plateau = 0.3; // Größe des zentralen Plateaus
    if (normalizedDistance < plateau) {
      return 1 + strength;
    }
    const t = (normalizedDistance - plateau) / (1 - plateau);
    return 1 + strength * (1 - t * t);
  },
};

interface MagnifiedPosition {
  x: number;
  scale: number;
}

interface MagnifiedPositionWithExtra extends MagnifiedPosition {
  data: {
    isUnaffected?: boolean;
    distanceToPrev?: number;
  };
}

export const magnify = (
  values: number[],
  focus: number,
  magnification: number = 2,
  spread: number = 0.5,
  scaleFunction: ScaleFunction = ScaleFunctions.gaussian,
): MagnifiedPosition[] => {
  if (values.length <= 1) return values.map((v) => ({ x: v, scale: 1 }));

  const min = Math.min(...values);
  const max = Math.max(...values);
  const totalRange = max - min;

  if (focus < min || focus > max) {
    return values.map((v) => ({ x: v, scale: 1 }));
  }

  const clampedMagnification = Math.max(0, magnification - 1); // -1 weil alle Skalierungsfunktionen mit +1 arbeiten
  const clampedSpread = clampToUnit(spread) * totalRange;

  const magnifiedValues: MagnifiedPositionWithExtra[] = values.map(
    (value, i) => {
      const distance = Math.abs(value - focus);
      const normalizedDistance = clampToUnit(distance / clampedSpread);

      const scale = scaleFunction(normalizedDistance, clampedMagnification);

      const direction = Math.sign(value - focus);
      const offset = distance * (scale - 1);

      const newPosition = focus + direction * distance + direction * offset;

      return {
        x: newPosition,
        scale,
        data: {
          isUnaffected: offset === 0,
        },
      };
    },
  );
  //
  // const withStepSize = magnifiedValues.reduce((prev, curr, i) => {
  //   return [
  //     ...prev,
  //     {
  //       ...curr,
  //       data: {
  //         ...curr.data,
  //         distanceToPrev: i > 0 ? Math.abs(prev[i - 1].x - curr.x) : 0,
  //       },
  //     },
  //   ];
  // }, [] as MagnifiedPositionWithExtra[]);

  // const smallestStep = Math.min(
  //   ...withStepSize
  //     .filter((v) => v.data.distanceToPrev! > 0 && !v.data.isUnaffected)
  //     .map((v) => v.data.distanceToPrev!),
  // );

  // const mappedToMin = withStepSize.reduce((prev, curr, i) => {
  //   const currDist = curr.data.isUnaffected
  //     ? smallestStep
  //     : curr.data.distanceToPrev!;
  //   prev.push({
  //     ...curr,
  //     x: i > 0 ? prev[i - 1].x + currDist : 0,
  //   });
  //   return prev;
  // }, [] as MagnifiedPositionWithExtra[]);

  const useList = magnifiedValues;

  const newMin = Math.min(...useList.map((v) => v.x));
  const newMax = Math.max(...useList.map((v) => v.x));

  return useList.map(({ x, scale }) => ({
    x: reMap(newMin, newMax, min, max, x),
    scale,
  }));
};
