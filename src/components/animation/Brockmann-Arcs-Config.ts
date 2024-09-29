import { createArrayFromLength, getRandomFloat } from "~/_util";

type ArcSettings = {
  minArc: number;
  arcSeg: number;
  arcRange: number[];
  maxArc: number;
  gap: number;
  sizes: number[];
  amountOfArcs: number;
};

const arcSeg = 90 / 8;
const MAX_ARC_MULTIPLIER = 2;

export const getBrockmannArcSettings = (): ArcSettings => ({
  maxArc: arcSeg * 24,
  minArc: 2 * arcSeg,
  arcSeg,
  arcRange: [5, 6, 7, 8, 10, 13, 18, 24],
  gap: 5,
  sizes: [10, 20, 40, 80, 160, 320, 640, 1280],
  amountOfArcs: 7,
});

export type Arc = {
  radius: number;
  startAngle: number;
  endAngle: number;
  thickness: number;
};

export const generateArcs = (
  START_RAD: number,
  brockmannArcSettings: ArcSettings,
): Arc[] => {
  return createArrayFromLength(brockmannArcSettings.amountOfArcs).reduce(
    (acc, _, i) => {
      const { gap, sizes, minArc, arcRange, arcSeg, maxArc } =
        brockmannArcSettings;

      const thickness = sizes[i % sizes.length]; // Use sizes array cyclically

      const radiusBefore = acc.at(-1)
        ? acc.at(-1)!.radius + acc.at(-1)!.thickness
        : START_RAD;
      const radius = radiusBefore + gap;

      // Calculate start and end arc angles
      const startAngle =
        minArc + Math.floor(getRandomFloat(1, 2 + (i % 4) * 3, 0)) * arcSeg;
      const endAngle = Math.min(
        startAngle + arcRange[i % arcRange.length] * arcSeg,
        maxArc * MAX_ARC_MULTIPLIER,
      );

      return [
        ...acc,
        {
          radius,
          startAngle,
          endAngle,
          thickness,
        },
      ];
    },
    [] as Arc[],
  );
};
