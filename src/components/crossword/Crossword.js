import React, { useEffect, useState } from 'react';
import { CrosswordLayout } from './crossword_layout/CrosswordLayout';
import { CrosswordFactory } from './crossword_factory/CrosswordFactory';
import { CrosswordInput } from './crossword_input/CrosswordInput';
import { Grid } from '@material-ui/core';
import classes from './crossword.module.css';
const words = [
  'hypnothize',
  'tension',
  'examination',
  'outline',
  'beg',
  'coverage',
  'jet',
  'discreet',
  'sustain'
];

const Crossword = () => {
  const [grid, setGrid] = useState([]);

  const constGenerateCrossWord = (inputValue) => {
    const words = inputValue.toLowerCase().replace(/\s/g, '').split(',');
    const crosswordGrid = CrosswordFactory(words);
    console.log(crosswordGrid.unusedWords);
    setGrid(crosswordGrid.grid);
  };

  return (
    <Grid
      container
      className={classes.container}
      alignContent="center"
      justify="center"
      direction="column"
    >
      <Grid item>
        <CrosswordInput onSubmitHandler={constGenerateCrossWord} />
      </Grid>
      <Grid item>
        <CrosswordLayout grid={grid} />
      </Grid>
    </Grid>
  );
};

export { Crossword };
