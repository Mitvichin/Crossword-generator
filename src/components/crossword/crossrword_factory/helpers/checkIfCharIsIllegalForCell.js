import { isCellEndOfWord, isCellStartOfWord ,isEmptyCell} from './cellChecks';

const checkIfCharIsIllegalForCell = (x, y, wordInfo, grid) => {
  let isIllegal = false;
  if (wordInfo.isVertical) {
    isIllegal =
      checkIfVerticalCellIsBlocked(x, y, grid) ||
      checkIfOverridingVerticalWord(x, y, grid) ||
      checkIfVerticalCellHasNeighbours(x, y, wordInfo, grid);
  } else {
    isIllegal =
      checkIfHorizontalCellIsBlocked(x, y, grid) ||
      checkIfOverridingHorizontalWord(x, y, grid) ||
      checkIfHorizontalCellHasNeighbours(x, y, wordInfo, grid);
  }

  return isIllegal;
};

//Vertical Check Functions
const checkIfVerticalCellIsBlocked = (x, y, grid) => {
  const isCellBelowPopulated = x < grid.length - 1 && !isEmptyCell(x + 1, y, grid); // checking if cell is not at the last row and if populated
  const isLeftCellPopulated = y > 0 && !isEmptyCell(x, y - 1, grid); // checking if cell is not at the first column and if populated
  const isRightCellPopulated = y < grid[0].length - 1 && !isEmptyCell(x, y + 1, grid); // checking if cell is not at the last column and if populated

  return (
    (isCellBelowPopulated && isLeftCellPopulated) || (isCellBelowPopulated && isRightCellPopulated)
  );
};

const checkIfOverridingVerticalWord = (x, y, grid) => {
  const isCurrentCellPopulated = !isEmptyCell(x, y, grid);
  const isAboveCellPopulated = x > 0 && !isEmptyCell(x - 1, y, grid); // checking if cell is not at the first row and if populated

  return isCurrentCellPopulated && isAboveCellPopulated;
};

const checkIfVerticalCellHasNeighbours = (x, y, wordInfo, grid) => {
  const isCurrentCellEmpty = isEmptyCell(x, y, grid);
  const isBelowCellPopulated = x < grid.length - 1 && !isEmptyCell(x + 1, y, grid); // checking if cell is not at the last row and if populated
  const isAboveCellPopulated = x > 0 && !isEmptyCell(x - 1, y, grid); // checking if cell is not at the first row and if populated
  const isLeftCellPopulated = y > 0 && !isEmptyCell(x, y - 1, grid); // checking if cell is not at the first column and if populated
  const isRightCellPopulated = y < grid[0].length - 1 && !isEmptyCell(x, y + 1, grid); // checking if cell is not at the last column and if populated
  const isEndOfWord = isCellEndOfWord(x, y, wordInfo);
  const isStartOfWord = isCellStartOfWord(x, y, wordInfo);

  const hasNeighbours =
    isLeftCellPopulated ||
    isRightCellPopulated ||
    (isEndOfWord && isBelowCellPopulated) ||
    (isStartOfWord && isAboveCellPopulated);

  return isCurrentCellEmpty && hasNeighbours;
};

//END

//Horizontal Check Functions

const checkIfHorizontalCellIsBlocked = (x, y, grid) => {
  const isCellBelowPopulated = x < grid.length - 1 && !isEmptyCell(x + 1, y, grid); // checking if cell is not at the last row and if populated
  const isAboveCellPopulated = x > 0 && !isEmptyCell(x - 1, y, grid); // checking if cell is not at the first row and if populated
  const isRightCellPopulated = y < grid[0].length - 1 && !isEmptyCell(x, y + 1, grid); // checking if cell is not at the last column and if populated

  return (
    (isCellBelowPopulated && isRightCellPopulated) || (isAboveCellPopulated && isRightCellPopulated)
  );
};

const checkIfOverridingHorizontalWord = (x, y, grid) => {
  const isCurrentCellPopulated = !isEmptyCell(x, y, grid);
  const isRightCellPopulated = y < grid[0].length - 1 && !isEmptyCell(x, y + 1, grid); // checking if cell is not at the last column and if populated

  return isCurrentCellPopulated && isRightCellPopulated;
};

const checkIfHorizontalCellHasNeighbours = (x, y, wordInfo, grid) => {
  const isCurrentCellEmpty = isEmptyCell(x, y, grid);
  const isBelowCellPopulated = x < grid.length - 1 && !isEmptyCell(x + 1, y, grid); // checking if cell is not at the last row and if populated
  const isAboveCellPopulated = x > 0 && !isEmptyCell(x - 1, y, grid); // checking if cell is not at the first row and if populated
  const isRightCellPopulated = y < grid[0].length - 1 && !isEmptyCell(x, y + 1, grid); // checking if cell is not at the last column and if populated
  const isLeftCellPopulated = y > 0 && !isEmptyCell(x, y - 1, grid); // checking if cell is not at the first column and if populated
  const isEndOfWord = isCellEndOfWord(x, y, wordInfo);
  const isStartOfWord = isCellStartOfWord(x, y, wordInfo);

  const hasNeighbours =
    isAboveCellPopulated ||
    isBelowCellPopulated ||
    (isEndOfWord && isRightCellPopulated) ||
    (isStartOfWord && isLeftCellPopulated);

  return isCurrentCellEmpty && hasNeighbours;
};

export { checkIfCharIsIllegalForCell };
