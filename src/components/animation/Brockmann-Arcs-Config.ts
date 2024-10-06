import {
  createArrayFromLength,
  getRandomFloat,
} from "~/_util/generic.functions";

export type ArcSettings = {
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

export const BROCKMAN_ARC_SETTINGS = {
  maxArc: arcSeg * 22,
  minArc: 0,
  arcSeg,
  arcRange: [5, 6, 7, 9, 12, 16, 20, 28],
  gap: 2,
  sizes: [10, 20, 40, 80, 160, 320, 640, 1280],
  amountOfArcs: 7,
};

export type Arc = {
  radius: number;
  startAngle: number;
  endAngle: number;
  thickness: number;
};

export const getBrockmannAngles = (
  brockmannArcSettings: ArcSettings,
  i: number,
) => {
  const { minArc, arcRange, arcSeg, maxArc } = brockmannArcSettings;
  const startAngle =
    minArc + Math.floor(getRandomFloat(1, 2 + (i % 4) * 3, 0)) * arcSeg;
  const endAngle = Math.min(
    startAngle +
      arcRange[(i + getRandomFloat(-1, 1, 0)) % arcRange.length] * arcSeg,
    maxArc * MAX_ARC_MULTIPLIER,
  );
  return {
    startAngle,
    endAngle,
  };
};

export const generateArcs = (
  START_RAD: number,
  brockmannArcSettings: ArcSettings,
): Arc[] => {
  return createArrayFromLength(brockmannArcSettings.amountOfArcs).reduce(
    (acc, _, i) => {
      const { gap, sizes, minArc, arcRange, arcSeg, maxArc } =
        brockmannArcSettings;

      const thickness = sizes[i % sizes.length];

      const radiusBefore = acc.at(-1)
        ? acc.at(-1)!.radius + acc.at(-1)!.thickness
        : START_RAD;
      const radius = radiusBefore + gap;

      // Calculate start and end arc angles
      const { startAngle, endAngle } = getBrockmannAngles(
        brockmannArcSettings,
        i,
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
