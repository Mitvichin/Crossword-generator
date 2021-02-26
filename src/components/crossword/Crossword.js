import React, { useEffect, useState } from 'react';
import { CrosswordLayout } from './crossword_layout/CrosswordLayout';
import { CrosswordFactory } from './crossrword_factory/CrosswordFactory';
const words = ['world', 'hello', 'madbid', 'interesting', 'task', 'programming', 'korea'];

const Crossword = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const newWords = CrosswordFactory(words);
    setGrid(newWords.grid);
  }, []);

  return <CrosswordLayout grid={grid} />;
};

export { Crossword };
