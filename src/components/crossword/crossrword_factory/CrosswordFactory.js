import { shuffle } from './helpers/shuffleArr';
import {
  DEFAULT_EMPTY_CELL_VALUE,
  GRID_SIZE_MULTIPLIER,
  MAX_ITERATIONS
} from './helpers/constants';
import { tryPlacingWordOnGrid } from './helpers/gridUtilities';
import {
  //moveWordToPlaced,
  placeWordOnGrid,
  placeFirstWordOnGrid,
  generateGrid
} from './helpers/gridUtilities';

function CrosswordFactory(words) {
  let iterations = 0;
  let areAllWordsUsed = false;
  let wordInfos = createSortedByLengthDescWordsInfo(words);
  const grids = [];
  const gridSize = Math.floor(wordInfos[0].text.length * GRID_SIZE_MULTIPLIER); // getting the longest word and setting the grid size to be double that

  while (areAllWordsUsed === false && iterations < MAX_ITERATIONS) {
    let grid = generateGrid(gridSize, DEFAULT_EMPTY_CELL_VALUE);
    let placedWords = [];
    let _wordInfos = shuffle([...wordInfos]);
    let firstWord = _wordInfos[0];
    grid = placeFirstWordOnGrid(_wordInfos, grid);

    moveWordToPlaced(0, _wordInfos, placedWords);
    // think of some retry mechanism harcoded tries is option
    for (let i = 0; i < 10; i++) {
      createCrosswordGrid(_wordInfos, placedWords, grid);
      _wordInfos = filterWordInfos(_wordInfos, placedWords);

      if (_wordInfos.length === 0) break;
    }

    grids.push({
      grid,
      wordsCount: placedWords.length,
      firstWords: firstWord.text,
      unusedWords: [..._wordInfos]
    });
    if (placedWords.length === wordInfos.length) areAllWordsUsed = true;
    iterations += 1;
  }

  const bestGrid = selectBestGrid(areAllWordsUsed, grids);

  return {
    words: wordInfos,
    grid: bestGrid.grid,
    unusedWords: bestGrid.unusedWords
  };
}

const selectBestGrid = (areAllWordsUsed, grids) => {
  if (areAllWordsUsed) {
    return grids[grids.length - 1];
  } else {
    grids.sort((a, b) => b.wordsCount - a.wordsCount);
    return grids[0];
  }
};

const createCrosswordGrid = (wordInfos, placedWords, grid) => {
  wordInfos.forEach((wordInfo, i) => {
    const isWordPlaced = tryPlacingWordOnGrid(wordInfo, placedWords, grid);
    if (isWordPlaced) {
      grid = placeWordOnGrid(wordInfo, grid);
      moveWordToPlaced(i, wordInfos, placedWords);
    }
  });
};

const filterWordInfos = (wordInfos, placedWords) => {
  return wordInfos.filter(function (info) {
    return placedWords.find((placedInfo) => placedInfo.text === info.text) ? false : true;
  });
};

const moveWordToPlaced = (index, wordInfos, placedWords) => {
  const placedWord = wordInfos.splice(index, 1)[0];
  placedWords.push(placedWord);
};

const createSortedByLengthDescWordsInfo = (words) => {
  return words
    .sort((a, b) => b.length - a.length)
    .map((text) => ({
      text,
      isVertical: false,
      startingCordinates: { x: 0, y: 0 }
    }));
};

export { CrosswordFactory };
