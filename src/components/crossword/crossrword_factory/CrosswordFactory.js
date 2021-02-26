const defaultEmptyCellValue = '';

function CrosswordFactory(words) {
  let placedWords = [];
  const sortedWords = [...words].sort((a, b) => b.length - a.length);
  let wordInfos = sortedWords.map((text) => ({
    text,
    isVertical: false,
    startingCordinates: { x: 0, y: 0 }
  }));
  const gridSize = Math.floor(wordInfos[0].text.length * 1.5);
  let grid = generateGrid(gridSize, defaultEmptyCellValue);

  const createCrosswordGrid = () => {
    wordInfos.forEach((wordInfo, i) => {
      const isWordPlaced = tryPlacingWord(wordInfo, placedWords, grid);
      if (isWordPlaced) {
        placedWords = moveWordToPlaced(i, wordInfos, placedWords);
      }
    });
  };

  grid = placeFirstWord(wordInfos[0], grid);
  placedWords = moveWordToPlaced(0, wordInfos, placedWords);
  wordInfos.shift();

  for (let i = 0; i < 3; i++) {
    createCrosswordGrid();
    wordInfos = filterWordInfos(wordInfos, placedWords);
    if (wordInfos.length === 0) break;
  }

  console.log(wordInfos);

  return {
    words: wordInfos,
    grid
  };
}

const filterWordInfos = (wordInfos, placedWords) => {
  return wordInfos.filter(function (info) {
    return placedWords.find((placedInfo) => placedInfo.text === info.text) ? false : true;
  });
};

const tryPlacingWord = (wordInfo, placedWords, grid) => {
  const potentialIntersectionInfos = getPosibleIntersectionsForWord(wordInfo, placedWords);
  const { text } = wordInfo;

  if (text === 'world') debugger;

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

      let isWordIllegal = false;
      console.log(grid);
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
        grid = placeWord(wordInfo, grid);
        return true;
      }
    }
    return true;
  }
};

const getPosibleIntersectionsForWord = (wordInfo, placedWords) => {
  const wordChars = [...wordInfo.text];
  const potentialIntersectionInfos = [];

  placedWords.forEach((placedWord) => {
    const { isVertical, startingCordinates } = placedWord;
    wordChars.forEach((char) => {
      const startX = startingCordinates.x;
      const startY = startingCordinates.y;

      [...placedWord.text].forEach((placedChar, k) => {
        if (placedChar === char) {
          const cordinates = {
            placedX: isVertical ? startX + k : startX,
            placedY: isVertical ? startY : startY + k
          };
          potentialIntersectionInfos.push({
            isPlacedWordVertical: isVertical,
            char,
            ...cordinates
          });
        }
      });
    });
  });

  return potentialIntersectionInfos;
};

const generateGrid = (size, defaultEmptyCell) => {
  const row = new Array(size).fill(defaultEmptyCell);
  const grid = Array.from({ length: size }, () => [...row]);

  return grid;
};

const placeFirstWord = (wordInfo, grid) => {
  wordInfo.isVertical = Math.random() > 0.5 ? true : false;
  const halfOfGridSize = Math.floor(grid.length / 2);
  const { isVertical } = wordInfo;
  wordInfo.startingCordinates = {
    x: isVertical ? 0 : halfOfGridSize,
    y: isVertical ? halfOfGridSize : 0
  };

  let _grid = placeWord(wordInfo, grid);

  return _grid;
};

const placeWord = (wordInfo, grid) => {
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

const moveWordToPlaced = (index, wordInfos, placedWords) => {
  const _wordInfos = [...wordInfos];
  const _placedWords = [...placedWords];
  const placedWord = _wordInfos.splice(index, 1)[0];
  _placedWords.push(placedWord);

  return _placedWords;
};

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

const checkIfVerticalCellHasNeighbours = (x, y, word, grid) => {
  const isCurrentCellEmpty = isEmptyCell(x, y, grid);
  const isBelowCellPopulated = x < grid.length - 1 && !isEmptyCell(x + 1, y, grid); // checking if cell is not at the last row and if populated
  const isLeftCellPopulated = y > 0 && !isEmptyCell(x, y - 1, grid); // checking if cell is not at the first column and if populated
  const isRightCellPopulated = y < grid[0].length - 1 && !isEmptyCell(x, y + 1, grid); // checking if cell is not at the last column and if populated
  const isEndOfWord = isCellEndOfWord(x, y, word);

  const hasNeighbours =
    isLeftCellPopulated || isRightCellPopulated || (isEndOfWord && isBelowCellPopulated);

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

const checkIfHorizontalCellHasNeighbours = (x, y, word, grid) => {
  const isCurrentCellEmpty = isEmptyCell(x, y, grid);
  const isBelowCellPopulated = x < grid.length - 1 && !isEmptyCell(x + 1, y, grid); // checking if cell is not at the last row and if populated
  const isAboveCellPopulated = x > 0 && !isEmptyCell(x - 1, y, grid); // checking if cell is not at the first row and if populated
  const isRightCellPopulated = y < grid[0].length - 1 && !isEmptyCell(x, y + 1, grid); // checking if cell is not at the last column and if populated
  const isEndOfWord = isCellEndOfWord(x, y, word);

  const hasNeighbours =
    isAboveCellPopulated || isBelowCellPopulated || (isEndOfWord && isRightCellPopulated);

  return isCurrentCellEmpty && hasNeighbours;
};
//END

const isEmptyCell = (x, y, grid) => {
  if (grid[x] === undefined) return false;
  if (grid[x][y] === undefined) return false;

  return grid[x][y] === defaultEmptyCellValue;
};

const doesCellExist = (x, y, grid) => {
  const isXInBorders = x <= grid.length - 1 && x >= 0;
  const isYInBorders = y <= grid[1].length - 1 && y >= 0;

  return isXInBorders && isYInBorders;
};

const isCellEndOfWord = (x, y, wordInfo) => {
  const wordCharCount = wordInfo.text.length - 1;

  if (wordInfo.isVertical) return wordInfo.startingColumn + wordCharCount === x;

  return wordInfo.startingCordinates.x + wordCharCount === y;
};

export { CrosswordFactory };
