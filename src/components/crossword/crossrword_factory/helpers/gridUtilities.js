import { getPotentialIntersectionsForWord } from './getPotentialIntersectionsForWord';
import { doesCellExist, isEmptyCell } from './cellChecks';
import { checkIfCharIsIllegalForCell } from './checkIfCharIsIllegalForCell';

const placeWordOnGrid = (wordInfo, grid) => {
  const _grid = [...grid];
  const rowIndex = wordInfo.startingCordinates.x;
  const columnIndex = wordInfo.startingCordinates.y;

  for (let i = 0; i < wordInfo.text.length; i++) {
    if (wordInfo.isVertical) {
      grid[rowIndex + i][columnIndex] = wordInfo.text[i];
    } else {
      grid[rowIndex][columnIndex + i] = wordInfo.text[i];
    }
  }

  return _grid;
};

const placeFirstWordOnGrid = (wordInfos, grid) => {
  let wordInfo = wordInfos[0];
  wordInfo.isVertical = Math.random() > 0.5 ? true : false;
  const halfOfGridSize = Math.floor(grid.length / 2);
  const quaterOfGridSize = Math.floor(grid.length / 4);
  const { isVertical } = wordInfo;
  wordInfo.startingCordinates = {
    x: isVertical ? quaterOfGridSize : halfOfGridSize,
    y: isVertical ? halfOfGridSize : quaterOfGridSize
  };

  let _grid = placeWordOnGrid(wordInfo, grid);

  return _grid;
};

const generateGrid = (size, defaultEmptyCell) => {
  const row = new Array(size).fill(defaultEmptyCell);
  const grid = Array.from({ length: size }, () => [...row]);

  return grid;
};

const tryPlacingWordOnGrid = (wordInfo, placedWords, grid) => {
  const potentialIntersectionInfos = getPotentialIntersectionsForWord(wordInfo, placedWords);
  const { text } = wordInfo;

  if (potentialIntersectionInfos.length > 0) {
    for (let i = 0; i < potentialIntersectionInfos.length; i++) {
      const { isPlacedWordVertical, char, placedX, placedY } = potentialIntersectionInfos[i];
      wordInfo.isVertical = !isPlacedWordVertical;
      const { isVertical } = wordInfo;
      const indexOfCrossChar = wordInfo.text.indexOf(char);
      let x = 0;
      let y = 0;

      //calculating potential start of cordinates
      if (isVertical) {
        x = placedX - indexOfCrossChar;
        y = placedY;
      } else {
        x = placedX;
        y = placedY - indexOfCrossChar;
      }

      wordInfo.startingCordinates.x = x;
      wordInfo.startingCordinates.y = y;
      if (wordInfo.text === 'jet' && x === 4 && y === 17) debugger;
      let isWordIllegal = false;

      for (let i = 0; i < wordInfo.text.length; i++) {
        const currentX = isVertical ? x + i : x;
        const currentY = isVertical ? y : y + i;

        const isCellLegal =
          (doesCellExist(currentX, currentY, grid) && text[i] === grid[currentX][currentY]) ||
          isEmptyCell(currentX, currentY, grid);

        if (isCellLegal) {
          if (checkIfCharIsIllegalForCell(currentX, currentY, wordInfo, grid)) {
            isWordIllegal = true;
          }
        } else {
          isWordIllegal = true;
        }

        if (isWordIllegal === true) break;
      }

      if (isWordIllegal === false) {
        return true;
      }
    }
    return false;
  }
};

export { placeWordOnGrid, placeFirstWordOnGrid, generateGrid, tryPlacingWordOnGrid };
