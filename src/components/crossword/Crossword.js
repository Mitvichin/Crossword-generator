import React, { useEffect, useState } from 'react';
import { CrosswordLayout } from './crossword_layout/CrosswordLayout';
import { CrosswordFactory } from './crossword_factory/CrosswordFactory';
import { CrosswordInput } from './crossword_input/CrosswordInput';
import classes from './crossword.module.css';

const Crossword = () => {
  const [grid, setGrid] = useState([]);

  const constGenerateCrossWord = (inputValue) => {
    const words = inputValue.toUpperCase().replace(/\s/g, '').split(',');
    const crosswordGrid = CrosswordFactory(words);
    console.log(crosswordGrid.unusedWords);
    setGrid(crosswordGrid.grid);
  };

  return (
    <div className={classes.container}>
      <div>
        <CrosswordInput onSubmitHandler={constGenerateCrossWord} />
      </div>
      <div>
        <CrosswordLayout grid={grid} />
      </div>
    </div>
  );
};

export { Crossword };
