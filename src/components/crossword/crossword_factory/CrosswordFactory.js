import { shuffle } from './helpers/shuffleArr';
import {
  DEFAULT_EMPTY_CELL_VALUE,
  GRID_MIN_SIZE_MULTIPLIER,
  MAX_ITERATIONS
} from './helpers/constants';
import {
  placeWordOnGrid,
  placeFirstWordOnGrid,
  generateGrid,
  checkIfWordCanBePlacedOnGrid
} from './helpers/gridUtilities';
import { trimGrid } from './helpers/trimGrid';

function CrosswordFactory(words) {
  let iterations = 0;
  let initialSortedWordsInfo = _createWordsInfoSortedByLengthDesc(words);
  const grids = [];
  const initialGridSize = Math.floor(
    initialSortedWordsInfo[0].text.length * GRID_MIN_SIZE_MULTIPLIER
  ); //getting the longest word and setting the grid size
  let placedWords = [];
  let gridSizeMultiplier = 1;

  //For each iteration new grid will be made and the words will be shuffled. It will try to place all words.
  //If it fails it will repeat the proccess until all words are placed or MAX_ITERATIONS are reached
  while (!_areAllWordsUsed(placedWords, initialSortedWordsInfo) && iterations < MAX_ITERATIONS) {
    gridSizeMultiplier = _getGridSizeMultiplier(iterations, gridSizeMultiplier);
    let grid = generateGrid(initialGridSize * gridSizeMultiplier, DEFAULT_EMPTY_CELL_VALUE);
    placedWords = [];
    let wordsInfo = shuffle([...initialSortedWordsInfo]);

    grid = placeFirstWordOnGrid(wordsInfo, grid);
    _moveWordToPlaced(0, wordsInfo, placedWords);

    let prevPlacedWordsCount = -1;
    //try until no more words can be placed
    while (prevPlacedWordsCount !== placedWords.length) {
      prevPlacedWordsCount = placedWords.length;
      grid = _createCrosswordGrid(wordsInfo, placedWords, grid);
      wordsInfo = _filterWordsInfo(wordsInfo, placedWords);
    }

    grids.push({
      grid,
      wordsCount: placedWords.length,
      unusedWords: [...wordsInfo.map((it) => it.text)]
    });

    iterations += 1;
  }

  const bestGrid = _selectBestGrid(_areAllWordsUsed, grids);

  let trimmedGrid = trimGrid(bestGrid.grid);

  return {
    grid: trimmedGrid,
    unusedWords: bestGrid.unusedWords
  };
}

const _getGridSizeMultiplier = (iterations, gridSizeMultiplier) => {
  return Math.floor(iterations / 100) > gridSizeMultiplier
    ? gridSizeMultiplier + 1
    : gridSizeMultiplier;
};

const _areAllWordsUsed = (placedWords, initialWords) => {
  return placedWords.length === initialWords.length;
};

const _selectBestGrid = (areAllWordsUsed, grids) => {
  if (areAllWordsUsed) {
    return grids[grids.length - 1];
  } else {
    grids.sort((a, b) => b.wordsCount - a.wordsCount);
    return grids[0];
  }
};

const _createCrosswordGrid = (wordsInfo, placedWords, grid) => {
  wordsInfo.forEach((wordInfo, i) => {
    const isWordPlaced = checkIfWordCanBePlacedOnGrid(wordInfo, placedWords, grid);
    if (isWordPlaced) {
      grid = placeWordOnGrid(wordInfo, grid);
      _moveWordToPlaced(i, wordsInfo, placedWords);
    }
  });

  return grid;
};

const _filterWordsInfo = (wordsInfo, placedWords) => {
  return wordsInfo.filter(function (info) {
    return placedWords.find((placedInfo) => placedInfo.text === info.text) ? false : true;
  });
};

const _moveWordToPlaced = (index, wordsInfo, placedWords) => {
  const placedWord = wordsInfo.splice(index, 1)[0];
  placedWords.push(placedWord);
};

const _createWordsInfoSortedByLengthDesc = (words) => {
  return words
    .sort((a, b) => b.length - a.length)
    .map((text) => ({
      text,
      isVertical: false,
      startingCordinates: { x: 0, y: 0 }
    }));
};

export { CrosswordFactory };
