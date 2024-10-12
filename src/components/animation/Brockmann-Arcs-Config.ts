import {
  createArrayFromLength,
  getRandomFloat,
} from "~/_util/generic.functions";

// export type ArcSettings = {
//   minArc: number;
//   arcSeg: number;
//   arcRange: number[];
//   maxArc: number;
//   gap: number;
//   sizes: number[];
//   amountOfArcs: number;
// };

const ARC_SEG_SITE = 90 / 8;
const MAX_ARC_MULTIPLIER = 2;

export const BROCKMAN_ARC_SETTINGS = {
  maxArc: ARC_SEG_SITE * 22,
  minArc: ARC_SEG_SITE * -4,
  arcSeg: ARC_SEG_SITE,
  arcRange: [5, 6, 7, 9, 12, 16, 21, 27],
  amountOfArcs: 7,
  gap: 2,
  sizes: [10, 20, 40, 80, 160, 320, 640, 1280],
};

export type ArcSettings = typeof BROCKMAN_ARC_SETTINGS;

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
    minArc + Math.floor(getRandomFloat(1, 3 + (i % 2) * 3, 0)) * arcSeg;
  const endAngle = Math.min(
    startAngle +
      arcRange[(i + getRandomFloat(0, 2, 0)) % arcRange.length] * arcSeg,
    maxArc * MAX_ARC_MULTIPLIER,
  );
  return {
    startAngle: startAngle + 360,
    endAngle: endAngle + 360,
  };
};

export const getAdditionalBrockmannAngles = (
  startAngle: number,
  endAngle: number,
  i: number,
) => {
  const offset = getRandomFloat(3, 5, 0) * ARC_SEG_SITE;
  const size = endAngle - startAngle;
  return {
    startAngleNew: endAngle + offset,
    endAngleNew: endAngle + offset + size,
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

      const newItems = [];
      newItems.push({
        radius,
        startAngle,
        endAngle,
        thickness,
      });
      // if (!(i % 3)) {
      //   const { startAngleNew, endAngleNew } = getAdditionalBrockmannAngles(
      //     i,
      //     startAngle,
      //     endAngle,
      //   );
      //   newItems.push({
      //     radius,
      //     startAngle: startAngleNew,
      //     endAngle: endAngleNew,
      //     thickness,
      //   });
      // }

      return [...acc, ...newItems];
    },
    [] as Arc[],
  );
};
