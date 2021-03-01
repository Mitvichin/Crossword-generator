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
  const isCurrentCellEmpty = isEmptyCell(x, y, grid);
  const info = {
    isBelowCellPopulated: checkIfCellIsNotAtLastRow(x, grid) && !isEmptyCell(x + 1, y, grid),
    isLeftCellPopulated: checkIfCellIsNotAtFirstColumn(y) && !isEmptyCell(x, y - 1, grid),
    isRightCellPopulated: checkIfCellIsNotAtLastColumn(y, grid) && !isEmptyCell(x, y + 1, grid),
    isAboveCellPopulated: checkIfCellIsNotAtFirstRow(x) && !isEmptyCell(x - 1, y, grid),
    isCurrentCellEmpty: isCurrentCellEmpty,
    isCurrentCellPopulated: !isCurrentCellEmpty,
    isEndOfWord: isCellEndOfWord(x, y, wordInfo),
    isStartOfWord: isCellStartOfWord(x, y, wordInfo)
  };

  if (wordInfo.isVertical) {
    isIllegal = _checkIfVerticalCellIsIllegal(info);
  } else {
    isIllegal = _checkIfHorizontalCellIsIllegal(info);
  }

  return isIllegal;
};

//VERTICAL CHECKS
const _checkIfVerticalCellIsIllegal = (info) => {
  return (
    _checkIfVerticalCellIsBlocked(info) ||
    _checkIfOverridingVerticalWord(info) ||
    _checkIfVerticalCellHasNeighbours(info)
  );
};

const _checkIfVerticalCellIsBlocked = ({
  isBelowCellPopulated,
  isLeftCellPopulated,
  isRightCellPopulated
}) => {
  return (
    (isBelowCellPopulated && isLeftCellPopulated) || (isBelowCellPopulated && isRightCellPopulated)
  );
};

const _checkIfOverridingVerticalWord = ({
  isCurrentCellPopulated,
  isAboveCellPopulated,
  isEndOfWord,
  isBelowCellPopulated
}) => {
  return (isCurrentCellPopulated && isAboveCellPopulated) || (isEndOfWord && isBelowCellPopulated);
};

const _checkIfVerticalCellHasNeighbours = ({
  isCurrentCellEmpty,
  isBelowCellPopulated,
  isAboveCellPopulated,
  isLeftCellPopulated,
  isRightCellPopulated,
  IsEndOfWord,
  isStartOfWord
}) => {
  const hasNeighbours =
    isLeftCellPopulated ||
    isRightCellPopulated ||
    (IsEndOfWord && isBelowCellPopulated) ||
    (isStartOfWord && isAboveCellPopulated);

  return isCurrentCellEmpty && hasNeighbours;
};
//END

//HORIZONTAL CHECKS
const _checkIfHorizontalCellIsIllegal = (info) => {
  return (
    _checkIfHorizontalCellIsBlocked(info) ||
    _checkIfOverridingHorizontalWord(info) ||
    _checkIfHorizontalCellHasNeighbours(info)
  );
};

const _checkIfHorizontalCellIsBlocked = ({
  isRightCellPopulated,
  isBelowCellPopulated,
  isAboveCellPopulated
}) => {
  return (
    (isBelowCellPopulated && isRightCellPopulated) || (isAboveCellPopulated && isRightCellPopulated)
  );
};

const _checkIfOverridingHorizontalWord = ({
  isCurrentCellPopulated,
  isRightCellPopulated,
  isStartOfWord,
  isLeftCellPopulated
}) => {
  return (isCurrentCellPopulated && isRightCellPopulated) || (isStartOfWord && isLeftCellPopulated);
};

const _checkIfHorizontalCellHasNeighbours = ({
  isAboveCellPopulated,
  isBelowCellPopulated,
  isRightCellPopulated,
  isLeftCellPopulated,
  isCurrentCellEmpty,
  isEndOfWord,
  isStartOfWord
}) => {
  const hasNeighbours =
    isAboveCellPopulated ||
    isBelowCellPopulated ||
    (isEndOfWord && isRightCellPopulated) ||
    (isStartOfWord && isLeftCellPopulated);

  return isCurrentCellEmpty && hasNeighbours;
};

//END

export { checkIfCharIsIllegalForCell };
