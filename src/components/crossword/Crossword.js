import React, { useEffect, useState } from 'react';
import { CrosswordLayout } from './crossword_layout/CrosswordLayout';
import { CrosswordFactory } from './crossrword_factory/CrosswordFactory';
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

  useEffect(() => {
    const newWords = CrosswordFactory(words);
    console.log(newWords.grid);
    console.log(newWords.unusedWords);
    setGrid(newWords.grid);
  }, []);

  return <CrosswordLayout grid={grid} />;
};

export { Crossword };
