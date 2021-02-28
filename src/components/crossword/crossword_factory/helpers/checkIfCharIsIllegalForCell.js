import {
  isCellEndOfWord,
  isCellStartOfWord,
  isEmptyCell,
  checkIfCellIsNotAtLastRow,
  checkIfCellIsNotAtFirstRow,
  checkIfCellIsNotAtLastColumn,
  checkIfCellIsNotAtFirstColumn
} from './cellChecks';

const checkIfCharIsIllegalForCell = (x, y, wordInfo, grid) => {
  let isIllegal = false;
  if (wordInfo.isVertical) {
    isIllegal = _checkIfVerticalCellIsIllegal(x, y, grid, wordInfo);
  } else {
    isIllegal = _checkIfHorizontalCellIsIllegal(x, y, grid, wordInfo);
  }

  return isIllegal;
};

const _checkIfVerticalCellIsIllegal = (x, y, grid, wordInfo) => {
  const isCellBelowPopulated = checkIfCellIsNotAtLastRow(x, grid) && !isEmptyCell(x + 1, y, grid); // checking if cell is not at the last row and if populated
  const isLeftCellPopulated = checkIfCellIsNotAtFirstColumn(y) && !isEmptyCell(x, y - 1, grid); // checking if cell is not at the first column and if populated
  const isRightCellPopulated =
    checkIfCellIsNotAtLastColumn(y, grid) && !isEmptyCell(x, y + 1, grid); // checking if cell is not at the last column and if populated
  const isAboveCellPopulated = checkIfCellIsNotAtFirstRow(x) && !isEmptyCell(x - 1, y, grid); // checking if cell is not at the first row and if populated
  const isEndOfWord = isCellEndOfWord(x, y, wordInfo);
  const isCurrentCellEmpty = isEmptyCell(x, y, grid);
  const isCurrentCellPopulated = !isCurrentCellEmpty;
  const isStartOfWord = isCellStartOfWord(x, y, wordInfo);

  return (
    _checkIfVerticalCellIsBlocked(
      isCellBelowPopulated,
      isLeftCellPopulated,
      isRightCellPopulated
    ) ||
    _checkIfOverridingVerticalWord(
      isCurrentCellPopulated,
      isAboveCellPopulated,
      isEndOfWord,
      isCellBelowPopulated
    ) ||
    _checkIfVerticalCellHasNeighbours(
      isCurrentCellEmpty,
      isCellBelowPopulated,
      isAboveCellPopulated,
      isLeftCellPopulated,
      isRightCellPopulated,
      isEndOfWord,
      isStartOfWord
    )
  );
};

const _checkIfVerticalCellIsBlocked = (
  isCellBelowPopulated,
  isLeftCellPopulated,
  isRightCellPopulated
) => {
  return (
    (isCellBelowPopulated && isLeftCellPopulated) || (isCellBelowPopulated && isRightCellPopulated)
  );
};

const _checkIfOverridingVerticalWord = (
  isCurrentCellPopulated,
  isAboveCellPopulated,
  isEndOfWord,
  isBelowCellPopulated
) => {
  return (isCurrentCellPopulated && isAboveCellPopulated) || (isEndOfWord && isBelowCellPopulated);
};

const _checkIfVerticalCellHasNeighbours = (
  isCurrentCellEmpty,
  isBelowCellPopulated,
  isAboveCellPopulated,
  isLeftCellPopulated,
  isRightCellPopulated,
  IsEndOfWord,
  isStartOfWord
) => {
  const hasNeighbours =
    isLeftCellPopulated ||
    isRightCellPopulated ||
    (IsEndOfWord && isBelowCellPopulated) ||
    (isStartOfWord && isAboveCellPopulated);

  return isCurrentCellEmpty && hasNeighbours;
};

const _checkIfHorizontalCellIsIllegal = (x, y, grid, wordInfo) => {
  const isBelowCellPopulated = checkIfCellIsNotAtLastRow(x, grid) && !isEmptyCell(x + 1, y, grid); // checking if cell is not at the last row and if populated
  const isAboveCellPopulated = checkIfCellIsNotAtFirstRow(x) && !isEmptyCell(x - 1, y, grid); // checking if cell is not at the first row and if populated
  const isRightCellPopulated =
    checkIfCellIsNotAtLastColumn(y, grid) && !isEmptyCell(x, y + 1, grid); // checking if cell is not at the last column and if populated
  const isStartOfWord = isCellStartOfWord(x, y, wordInfo);
  const isLeftCellPopulated = checkIfCellIsNotAtFirstColumn(y) && !isEmptyCell(x, y - 1, grid); // checking if cell is not at the first column and if populated
  const isCurrentCellEmpty = isEmptyCell(x, y, grid);
  const isCurrentCellPopulated = !isCurrentCellEmpty;
  const isEndOfWord = isCellEndOfWord(x, y, wordInfo);

  return (
    _checkIfHorizontalCellIsBlocked(
      isRightCellPopulated,
      isBelowCellPopulated,
      isAboveCellPopulated
    ) ||
    _checkIfOverridingHorizontalWord(
      isCurrentCellPopulated,
      isRightCellPopulated,
      isStartOfWord,
      isLeftCellPopulated
    ) ||
    _checkIfHorizontalCellHasNeighbours(
      isAboveCellPopulated,
      isBelowCellPopulated,
      isRightCellPopulated,
      isLeftCellPopulated,
      isCurrentCellEmpty,
      isEndOfWord,
      isStartOfWord
    )
  );
};

const _checkIfHorizontalCellIsBlocked = (
  isRightCellPopulated,
  isBelowCellPopulated,
  isAboveCellPopulated
) => {
  return (
    (isBelowCellPopulated && isRightCellPopulated) || (isAboveCellPopulated && isRightCellPopulated)
  );
};

const _checkIfOverridingHorizontalWord = (
  isCurrentCellPopulated,
  isRightCellPopulated,
  isStartOfWord,
  isLeftCellPopulated
) => {
  return (isCurrentCellPopulated && isRightCellPopulated) || (isStartOfWord && isLeftCellPopulated);
};

const _checkIfHorizontalCellHasNeighbours = (
  isAboveCellPopulated,
  isBelowCellPopulated,
  isRightCellPopulated,
  isLeftCellPopulated,
  isCurrentCellEmpty,
  isEndOfWord,
  isStartOfWord
) => {
  const hasNeighbours =
    isAboveCellPopulated ||
    isBelowCellPopulated ||
    (isEndOfWord && isRightCellPopulated) ||
    (isStartOfWord && isLeftCellPopulated);

  return isCurrentCellEmpty && hasNeighbours;
};

export { checkIfCharIsIllegalForCell };
