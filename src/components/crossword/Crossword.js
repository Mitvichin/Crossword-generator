import React from 'react';
import { CrosswordLayout } from './crossword_layout/CrosswordLayout';
import { CrosswordGenerator } from './helpers/crosswordGenerator';

const Crossword = () => {
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
