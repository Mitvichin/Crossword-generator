import React, { useState } from 'react';
import { CrosswordLayout } from './crossword_layout/CrosswordLayout';
import { CrosswordFactory } from './crossword_factory/CrosswordFactory';
import { CrosswordInput } from './crossword_input/CrosswordInput';
import classes from './crossword.module.css';
import { saveGrid } from '../../services/grid';
const splitSymbol = ',';
const maxGridLength = 2056;

const Crossword = () => {
  const [sourceWords, setSourceWords] = useState([]);
  const [grid, setGrid] = useState();
  const [unusedWords, setUnusedWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSaveGrid = async () => {
    if (grid.length * grid[0]?.length > maxGridLength) {
      alert('Grid exceeds 2056 length.');
      return;
    }

    if (grid[0] && grid[0].length === 0) {
      alert('Grid is empty.');
      return;
    }

    let usedWords =
      unusedWords.length !== 0
        ? sourceWords.filter((it) => !unusedWords.includes(it))
        : sourceWords;

    try {
      await saveGrid(grid, usedWords);
    } catch (error) {
      alert(error);
    }
  };

  const generateCrossWord = (inputValue) => {
    setIsLoading(true);
    const words = inputValue
      .toUpperCase()
      .replace(/\s/g, '')
      .split(splitSymbol)
      .filter((word) => word !== '');

    if (words.length === 0) {
      alert('Please add words.');
      setIsLoading(false);
      return;
    }

    setSourceWords(words);

    setTimeout(() => {
      const crosswordGrid = CrosswordFactory(words);
      setGrid(crosswordGrid.grid);
      setUnusedWords(crosswordGrid.unusedWords);
      setIsLoading(false);
    }, 100); //waiting 100 miliseconds for the ui to update
  };

  const getUnusedWordsLayout = () => {
    const unusedWordsLength = unusedWords.length;
    if (unusedWordsLength > 0) {
      return (
        <div style={{ maxWidth: '50%', height: '10%', overflow: 'auto', wordWrap: 'break-word' }}>
          Unused words: <p>{unusedWords.join(', ')}</p>
        </div>
      );
    }
  };

  const getCrosswordLayout = () => {
    if (isLoading) return <div>Loading...</div>;
    return (
      grid && (
        <div className={classes.crosswordGrid}>
          <CrosswordLayout grid={grid} />
        </div>
      )
    );
  };

  return (
    <div className={classes.container}>
      <div>
        <CrosswordInput onSubmitHandler={generateCrossWord} />
      </div>
      {getCrosswordLayout()}
      {getUnusedWordsLayout()}
      <div
        className={`${classes.button} ${grid === undefined ? classes.disabled : ''}`}
        onClick={onSaveGrid}
      >
        Save
      </div>
    </div>
  );
};

export { Crossword };
