import { Group, Line, Pt } from "pts";
import { CellLines, SimpleLine, ThreeAPointLike } from "./types";

export const makeGroups = (pts: Pt[][]): Group[] => {
  return pts.map((pts) => Group.fromPtArray(pts));
};

export const simpleLineAsGroup = (line: SimpleLine): Group => {
  return Group.fromPtArray(line);
};

export const groupAsSimpleLine = (group: Group | Pt[]): SimpleLine => {
  if (!group[0] || !group[1]) {
    console.error("groupAsSimpleLine not possible for group", group);
    throw new Error("groupAsSimpleLine not possible for group");
  }
  return [group[0], group[1]];
};

export const same2DPt = (a: Pt, b: Pt) => a.x === b.x && a.y === b.y;

export const magnitudeBy2Points = (
  pt1: ThreeAPointLike,
  pt2: ThreeAPointLike,
) => {
  return Line.magnitude([new Pt(pt1.x, pt1.y), new Pt(pt2.x, pt2.y)]);
};

export const cloneGroup = (group: Group): Group => {
  return group.clone();
};

export const clonePoints = (pts: Pt[]): Pt[] => {
  return new Group(...pts).clone();
};

export const reversePointsInGroup = (group: Group): Pt[] => {
  return group.reverse();
};

export const scaleLine =
  (scaleFactor: number) =>
  (g: Group | [Pt, Pt]): [Pt, Pt] => {
    return [g[0].scale(scaleFactor), g[1].scale(scaleFactor)];
  };

// grid specific

export const mapCornerToDirectedLines = (
  corner: Group[],
  inverseDirection = false,
): CellLines[][] => {
  return corner
    .map((group) => (inverseDirection ? reversePointsInGroup(group) : group))
    .map(clonePoints)
    .map((row, rowIndex) => {
      return row.map((pt: Pt, colIndex) => {
        const ptHere = pt.clone();

        let lineRight: SimpleLine | undefined;
        let lineToTop: SimpleLine | undefined;
        if (colIndex < row.length - 1) {
          const ptAfter = row[colIndex + 1].clone();
          lineRight = [ptHere, ptAfter];
        }

        if (rowIndex < corner.length - 1) {
          const samePtInLastRow = corner[rowIndex + 1][colIndex].clone();
          lineToTop = [ptHere, samePtInLastRow];
        }

        return {
          lineRight: lineRight || null,
          lineToTop: lineToTop || null,
        };
      });
    });
};
