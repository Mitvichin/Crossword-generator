import { shuffle } from './helpers/shuffleArr';
import {
  DEFAULT_EMPTY_CELL_VALUE,
  GRID_SIZE_MULTIPLIER,
  MAX_ITERATIONS
} from './helpers/constants';
import { tryPlacingWordOnGrid } from './helpers/gridUtilities';
import { placeWordOnGrid, placeFirstWordOnGrid, generateGrid } from './helpers/gridUtilities';

function CrosswordFactory(words) {
  let iterations = 0;
  let areAllWordsUsed = false;
  let sortedWordsInfo = createWordsInfoSortedByLengthDesc(words);
  const grids = [];
  const gridSize = Math.floor(sortedWordsInfo[0].text.length * GRID_SIZE_MULTIPLIER); //getting the longest word and setting the grid size to be double that

  //for each iteration new grid will be made and the words will be shuffled. It will try to place all words.
  //If it fails it will repeat the proccess until all words are placed or MAX_ITERATIONS are done
  while (areAllWordsUsed === false && iterations < MAX_ITERATIONS) {
    //try either until all words are used for the current grid or have tried MAX_ITERATIONS times
    let grid = generateGrid(gridSize, DEFAULT_EMPTY_CELL_VALUE);
    let placedWords = [];
    let wordsInfo = shuffle([...sortedWordsInfo]);

    grid = placeFirstWordOnGrid(wordsInfo, grid);
    moveWordToPlaced(0, wordsInfo, placedWords);

    let prevPlacedWordsCount = -1;
    //try until no more words can be placed
    while (prevPlacedWordsCount !== placedWords.length) {
      prevPlacedWordsCount = placedWords.length;
      grid = createCrosswordGrid(wordsInfo, placedWords, grid);
      wordsInfo = filterWordsInfo(wordsInfo, placedWords);
    }

    grids.push({
      grid,
      wordsCount: placedWords.length,
      unusedWords: [...wordsInfo]
    });

    if (placedWords.length === sortedWordsInfo.length) areAllWordsUsed = true;
    iterations += 1;
  }

  const bestGrid = selectBestGrid(areAllWordsUsed, grids);

  return {
    words: sortedWordsInfo,
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

const createCrosswordGrid = (wordsInfo, placedWords, grid) => {
  wordsInfo.forEach((wordInfo, i) => {
    const isWordPlaced = tryPlacingWordOnGrid(wordInfo, placedWords, grid);
    if (isWordPlaced) {
      grid = placeWordOnGrid(wordInfo, grid);
      moveWordToPlaced(i, wordsInfo, placedWords);
    }
  });

  return grid;
};

const filterWordsInfo = (wordsInfo, placedWords) => {
  return wordsInfo.filter(function (info) {
    return placedWords.find((placedInfo) => placedInfo.text === info.text) ? false : true;
  });
};

const moveWordToPlaced = (index, wordsInfo, placedWords) => {
  const placedWord = wordsInfo.splice(index, 1)[0];
  placedWords.push(placedWord);
};

const createWordsInfoSortedByLengthDesc = (words) => {
  return words
    .sort((a, b) => b.length - a.length)
    .map((text) => ({
      text,
      isVertical: false,
      startingCordinates: { x: 0, y: 0 }
    }));
};

export { CrosswordFactory };
