import { DEFAULT_EMPTY_CELL_VALUE } from './constants';

const isCellEndOfWord = (x, y, wordInfo) => {
  const wordCharCount = wordInfo.text.length - 1;

  if (wordInfo.isVertical) return wordInfo.startingCordinates.x + wordCharCount === x;

  return wordInfo.startingCordinates.y + wordCharCount === y;
};

const isCellStartOfWord = (x, y, wordInfo) => {
  return x === wordInfo.startingCordinates.x && y === wordInfo.startingCordinates.y;
};

const doesCellExist = (x, y, grid) => {
  const isXInBorders = x <= grid.length - 1 && x >= 0;
  const isYInBorders = y <= grid[1].length - 1 && y >= 0;

  return isXInBorders && isYInBorders;
};

const isEmptyCell = (x, y, grid) => {
  if (grid[x] === undefined) return false;
  if (grid[x][y] === undefined) return false;

  return grid[x][y] === DEFAULT_EMPTY_CELL_VALUE;
};

const checkIfCellIsNotAtLastRow = (x, grid) => {
  return x < grid.length - 1;
};

const checkIfCellIsNotAtFirstRow = (x) => {
  return x > 0;
};

const checkIfCellIsNotAtLastColumn = (y, grid) => {
  return y < grid[0].length - 1;
};

const checkIfCellIsNotAtFirstColumn = (y) => {
  return y > 0;
};

export {
  isCellEndOfWord,
  doesCellExist,
  isCellStartOfWord,
  isEmptyCell,
  checkIfCellIsNotAtLastRow,
  checkIfCellIsNotAtFirstRow,
  checkIfCellIsNotAtLastColumn,
  checkIfCellIsNotAtFirstColumn
};
