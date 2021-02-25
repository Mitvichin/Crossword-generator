import React from 'react';
import { CrosswordLayout } from './crossword_layout/CrosswordLayout';
import { CrosswordFactory } from './crossrword_generator/CrosswordFactory';

const Crossword = () => {
  const words = ['room', 'rat', 'mouse'];

  const newWords = CrosswordFactory(words);

  console.log(newWords.grid);
  const grid = [
    ['r', 'o', 'o', 'm'],
    ['a', '', '', 'o'],
    ['t', '', '', 'u'],
    ['', '', '', 's'],
    ['', '', '', 'e']
  ];

  return <CrosswordLayout grid={grid} />;
};

export { Crossword };
