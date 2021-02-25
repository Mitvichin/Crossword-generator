function CrosswordFactory(words) {
  const defaultEmptyCell = '';
  const wordsArray = [...words].sort((a, b) => b.length - a.length);
  const placedChars = [];
  const gridSize = Math.floor(wordsArray[0].length + 3);
  let grid = generateGrid(gridSize, defaultEmptyCell);

  grid = placeFirstWord(wordsArray[0], grid);
  moveWordCharsToPlaced(0, wordsArray, placedChars);
  console.log(isWordIntersectionPossible(wordsArray[1], placedChars));

  return {
    words: wordsArray,
    grid
  };
}

const isWordIntersectionPossible = (word, placedChars) => {
  let isPossible = false;

  placedChars.forEach((char) => {
    if (word.includes(char)) {
      isPossible = true;
      return;
    }
  });

  return isPossible;
};

const generateGrid = (size, defaultEmptyCell) => {
  const row = new Array(size).fill(defaultEmptyCell);
  const grid = Array.from({ length: size }, () => [...row]);

  return grid;
};

const placeFirstWord = (word, grid) => {
  const isVerticle = Math.random() > 0.5 ? true : false;
  const startingPosition = Math.floor(grid.length / 2);
  console.log(startingPosition);
  const _grid = placeWord(word, grid, isVerticle, startingPosition);

  return _grid;
};

const placeWord = (word, grid, isVerticle, startingIndex) => {
  const _grid = [...grid];

  for (let i = 0; i < word.length; i++) {
    if (isVerticle) {
      grid[i][startingIndex] = word[i];
    } else {
      grid[startingIndex][i] = word[i];
    }
  }

  return _grid;
};

const moveWordCharsToPlaced = (index, words, placedChars) => {
  const placedWord = words.splice(index, 1)[0];
  const chars = [...placedWord];
  chars.forEach((char) => {
    if (!placedChars.includes(char)) {
      placedChars.push(char);
    }
  });
};

export { CrosswordFactory };
