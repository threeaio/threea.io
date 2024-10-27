import { isShapeOutsideViewport, Simple2D, SimpleCell } from "~/_util";

export const convertToCells = (
  gridAsPointsArray: Simple2D[][],
  handleViewport?: Simple2D,
): SimpleCell[] => {
  const cells = [];
  for (let row = 0; row < gridAsPointsArray.length - 1; row++) {
    const currentRow = gridAsPointsArray[row];
    const nextRow = gridAsPointsArray[row + 1];

    for (let col = 0; col < currentRow.length - 1; col++) {
      const points: [Simple2D, Simple2D, Simple2D, Simple2D] = [
        currentRow[col],
        currentRow[col + 1],
        nextRow[col + 1],
        nextRow[col],
      ];

      if (
        !handleViewport ||
        !isShapeOutsideViewport(handleViewport.x, handleViewport.y, points)
      ) {
        cells.push({
          row,
          col,
          points,
        });
      }
    }
  }
  return cells;
};
