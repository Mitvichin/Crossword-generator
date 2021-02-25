function CrosswordFactory(words) {
  const defaultEmptyCell = '';
  let placedWords = [];
  const sortedWords = [...words].sort((a, b) => b.length - a.length);
  let wordInfos = sortedWords.map((text) => ({
    text,
    isVertical: false,
    startingCordinates: { x: 7, y: 2 },
    doesIntersect: false
  }));
  const gridSize = Math.floor(wordInfos[0].text.length + 3);
  let grid = generateGrid(gridSize, defaultEmptyCell);

  grid = placeFirstWord(wordInfos[0], grid);
  const result = moveWordToPlaced(0, wordInfos, placedWords);
  placedWords = result.placedWords;
  wordInfos = result.wordInfos;

  return {
    words: wordInfos,
    grid
  };
}

const tryPlacingWord = (wordInfo, placedWords, grid) => {
  if (isWordIntersectionPossible(word, placedWords)) {
  }
};

const isWordIntersectionPossible = (wordInfo, placedWords) => {
  let isPossible = false;
  const wordChars = [...wordInfo.text];

  wordChars.forEach((char) => {});

  return isPossible;
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

export { CrosswordFactory };
