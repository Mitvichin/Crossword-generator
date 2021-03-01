import { getPotentialIntersectionsForWord } from './getPotentialIntersectionsForWord';
import { doesCellExist, isEmptyCell } from './cellChecks';
import { checkIfCharIsIllegalForCell } from './checkIfCharIsIllegalForCell';

const placeWordOnGrid = (wordInfo, grid) => {
  const rowIndex = wordInfo.startingCordinates.x;
  const columnIndex = wordInfo.startingCordinates.y;

  for (let i = 0; i < wordInfo.text.length; i++) {
    if (wordInfo.isVertical) {
      grid[rowIndex + i][columnIndex] = wordInfo.text[i];
    } else {
      grid[rowIndex][columnIndex + i] = wordInfo.text[i];
    }
  }

  return grid;
};

const placeFirstWordOnGrid = (wordsInfo, grid) => {
  const wordInfo = wordsInfo[0];
  const halfOfGridSize = Math.floor(grid.length / 2);
  const quaterOfGridSize = Math.floor(halfOfGridSize / 2);

  wordInfo.isVertical = Math.random() > 0.5 ? true : false;
  const { isVertical } = wordInfo;
  wordInfo.startingCordinates = {
    x: isVertical ? quaterOfGridSize : halfOfGridSize,
    y: isVertical ? halfOfGridSize : quaterOfGridSize
  };

  grid = placeWordOnGrid(wordInfo, grid);

  return grid;
};

const generateGrid = (size, defaultEmptyCell) => {
  const row = new Array(size).fill(defaultEmptyCell);
  const grid = Array.from({ length: size }, () => [...row]);

  return grid;
};

const tryPlacingWordOnGrid = (wordInfo, placedWords, grid) => {
  const potentialIntersectionInfos = getPotentialIntersectionsForWord(wordInfo, placedWords);

  if (potentialIntersectionInfos.length > 0) {
    for (let i = 0; i < potentialIntersectionInfos.length; i++) {
      const { isPlacedWordVertical, char, placedX, placedY } = potentialIntersectionInfos[i];
      wordInfo.isVertical = !isPlacedWordVertical;
      const { isVertical } = wordInfo;
      const indexOfCrossChar = wordInfo.text.indexOf(char);

      const { x, y } = _calculatePotentialStartCordinate(
        placedX,
        placedY,
        isVertical,
        indexOfCrossChar
      );

      wordInfo.startingCordinates.x = x;
      wordInfo.startingCordinates.y = y;

      const isWordIllegal = _checkIfWordIsIllegal(x, y, wordInfo, grid);

      if (!isWordIllegal) {
        return true;
      }
    }
    return false;
  }
};

const _calculatePotentialStartCordinate = (placedX, placedY, isVertical, indexOfCrossChar) => {
  let x = 0;
  let y = 0;

  if (isVertical) {
    x = placedX - indexOfCrossChar;
    y = placedY;
  } else {
    x = placedX;
    y = placedY - indexOfCrossChar;
  }

  return { x, y };
};

const _checkIfWordIsIllegal = (x, y, wordInfo, grid) => {
  const { isVertical, text } = wordInfo;

  for (let i = 0; i < wordInfo.text.length; i++) {
    const currentX = isVertical ? x + i : x;
    const currentY = isVertical ? y : y + i;

    const isCellLegal =
      (doesCellExist(currentX, currentY, grid) && text[i] === grid[currentX][currentY]) ||
      isEmptyCell(currentX, currentY, grid);

    if (!isCellLegal) {
      return true;
    }

    if (checkIfCharIsIllegalForCell(currentX, currentY, wordInfo, grid)) {
      return true;
    }
  }

  return false;
};

export { placeWordOnGrid, placeFirstWordOnGrid, generateGrid, tryPlacingWordOnGrid };
