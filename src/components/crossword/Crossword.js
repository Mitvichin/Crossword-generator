import React, { useState } from 'react';
import { CrosswordLayout } from './crossword_layout/CrosswordLayout';
import { CrosswordFactory } from './crossword_factory/CrosswordFactory';
import { CrosswordInput } from './crossword_input/CrosswordInput';
import classes from './crossword.module.css';

const Crossword = () => {
  const [grid, setGrid] = useState();
  const [unusedWords, setUnusedWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const constGenerateCrossWord = (inputValue) => {
    setIsLoading(true);
    const words = inputValue.toUpperCase().replace(/\s/g, '').split(',');

    setTimeout(() => {
      const crosswordGrid = CrosswordFactory(words);
      setGrid(crosswordGrid.grid);
      setUnusedWords(crosswordGrid.unusedWords);
      setIsLoading(false);
    }, 0);
  };

  const getUnusedWordsLayout = () => {
    const unusedWordsLength = unusedWords.length;
    if (unusedWordsLength > 0) {
      return (
        <div>
          Unused words:{' '}
          {unusedWords.map((wordInfo, i) => (
            <span>
              {wordInfo.text}
              {i !== unusedWordsLength - 1 && ','}
            </span>
          ))}
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
    </div>
  );
};

export { Crossword };
