const defaultEmptyCellValue = '';

function CrosswordFactory(words) {
  let placedWords = [];
  const sortedWords = [...words].sort((a, b) => b.length - a.length);
  let wordInfos = sortedWords.map((text) => ({
    text,
    isVertical: false,
    startingCordinates: { x: 0, y: 0 }
  }));
  const gridSize = Math.floor(wordInfos[0].text.length + 3);
  let grid = generateGrid(gridSize, defaultEmptyCellValue);

  grid = placeFirstWord(wordInfos[0], grid);
  const result = moveWordToPlaced(0, wordInfos, placedWords);
  placedWords = result.placedWords;
  wordInfos = result.wordInfos;
  tryPlacingWord(wordInfos[0], placedWords, grid);
  console.log(wordInfos[0]);

  return {
    words: wordInfos,
    grid
  };
}

const tryPlacingWord = (wordInfo, placedWords, grid) => {
  const { isPlacedWordVertical, placedCharInfos } = getPosibleIntersectionsForWord(
    wordInfo,
    placedWords
  );

  const { isVertical, text } = wordInfo;

  if (placedCharInfos.length > 0) {
    for (let i = 0; i < placedCharInfos.length; i++) {
      const indexOfCrossChar = wordInfo.text.indexOf(placedCharInfos[i].char);
      let x = 0;
      let y = 0;
      //calculating potential start of cordinates
      if (isVertical) {
        x = placedCharInfos[i].x - indexOfCrossChar;
        y = placedCharInfos[i].y;
      } else {
        x = placedCharInfos[i].x;
        y = placedCharInfos[i].y - indexOfCrossChar;
      }

      wordInfo.startingCordinates.x = x;
      wordInfo.startingCordinates.y = y;

      const isWordLegal = true;

      for (let i = 0; i < wordInfo.text.length; i++) {
        // you are not passing the correct cordinates for the current char
        if (
          (!isEmptyCell(x, y, grid) || text[i] !== grid[x][y]) &&
          checkIfCharIsIllegalForCell(wordInfo, grid)
        ) {
          isWordLegal = false;
        }

        if (isWordLegal === false) break;
      }

      if (isWordLegal) grid = placeWord(wordInfo, grid);

      return;
    }
  }
};

const getPosibleIntersectionsForWord = (wordInfo, placedWords) => {
  const wordChars = [...wordInfo.text];
  const potentialIntersectionInfo = { isPlacedWordVertical: false, placedCharInfos: [] };

  wordChars.forEach((char) => {
    placedWords.forEach((placedWord) => {
      const { isVertical, startingCordinates } = placedWord;

      if (wordInfo.isVertical === isVertical) return;

      potentialIntersectionInfo.isPlacedWordVertical = isVertical;
      const startX = startingCordinates.x;
      const startY = startingCordinates.y;

      [...placedWord.text].forEach((placedChar, i) => {
        if (placedChar === char) {
          const cordinates = {
            x: isVertical ? startX + i : startX,
            y: isVertical ? startY : startY + i
          };
          potentialIntersectionInfo.placedCharInfos.push({ char, ...cordinates });
        }
      });
    });
  });

  return potentialIntersectionInfo;
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

  return { wordInfos: _wordInfos, placedWords: _placedWords };
};

const checkIfCharIsIllegalForCell = (x, y, wordInfo, grid) => {
  const { x, y } = wordInfo.startingCordinates;
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
  const isCellBelowPopulated = !isEmptyCell(x + 1, y, grid);
  const isLeftCellPopulated = !isEmptyCell(x, y - 1, grid);
  const isRightCellPopulated = !isEmptyCell(x, y + 1, grid);

  return (
    (isCellBelowPopulated && isLeftCellPopulated) || (isCellBelowPopulated && isRightCellPopulated)
  );
};

const checkIfOverridingVerticalWord = (x, y, grid) => {
  const isCurrentCellPopulated = !isEmptyCell(x, y, grid);
  const isAboveCellPopulated = !isEmptyCell(x - 1, y, grid);

  return isCurrentCellPopulated && isAboveCellPopulated;
};

const checkIfVerticalCellHasNeighbours = (x, y, word, grid) => {
  const isCurrentCellEmpty = isEmptyCell(x, y, grid);
  const isBelowCellPopulated = !isEmptyCell(x + 1, y, grid);
  const isLeftCellPopulated = !isEmptyCell(x, y - 1, grid);
  const isRightCellPopulated = !isEmptyCell(x, y + 1, grid);
  const isEndOfWord = isCellEndOfWord(x, y, word);

  const hasNeighbours =
    isLeftCellPopulated || isRightCellPopulated || (isEndOfWord && isBelowCellPopulated);

  return isCurrentCellEmpty && hasNeighbours;
};

//END

//Horizontal Check Functions

const checkIfHorizontalCellIsBlocked = (x, y, grid) => {
  const isCellBelowPopulated = !isEmptyCell(x + 1, y, grid);
  const isRightCellPopulated = !isEmptyCell(x, y + 1, grid);
  const isAboveCellPopulated = !isEmptyCell(x - 1, y, grid);

  return (
    (isCellBelowPopulated && isRightCellPopulated) || (isAboveCellPopulated && isRightCellPopulated)
  );
};

const checkIfOverridingHorizontalWord = (x, y, grid) => {
  const isCurrentCellPopulated = !isEmptyCell(x, y, grid);
  const isRightCellPopulated = !isEmptyCell(x, y + 1, grid);

  return isCurrentCellPopulated && isRightCellPopulated;
};

const checkIfHorizontalCellHasNeighbours = (x, y, word, grid) => {
  const isCurrentCellEmpty = isEmptyCell(x, y, grid);
  const isBelowCellPopulated = !isEmptyCell(x + 1, y, grid);
  const isAboveCellPopulated = !isEmptyCell(x - 1, y, grid);
  const isRightCellPopulated = !isEmptyCell(x, y + 1, grid);
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

const isCellEndOfWord = (x, y, wordInfo) => {
  const wordCharCount = wordInfo.text.length - 1;

  if (wordInfo.isVertical) return wordInfo.startingColumn + wordCharCount === x;

  return wordInfo.startingCordinates.x + wordCharCount === y;
};

export { CrosswordFactory };
