import React, { useState } from 'react';
import { CrosswordLayout } from './crossword_layout/CrosswordLayout';
import { CrosswordFactory } from './crossword_factory/CrosswordFactory';
import { CrosswordInput } from './crossword_input/CrosswordInput';
import classes from './crossword.module.css';
const splitSymbol = ',';

const Crossword = () => {
  const [grid, setGrid] = useState();
  const [unusedWords, setUnusedWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const constGenerateCrossWord = (inputValue) => {
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
        <CrosswordInput onSubmitHandler={constGenerateCrossWord} />
      </div>
      {getCrosswordLayout()}
      {getUnusedWordsLayout()}
      <div className={`${classes.button} ${classes.disabled}`}>Save</div>
    </div>
  );
};

export { Crossword };
