import React, { useState } from 'react';
import { CrosswordLayout } from './crossword_layout/CrosswordLayout';
import { CrosswordFactory } from './crossword_factory/CrosswordFactory';
import { CrosswordInput } from './crossword_input/CrosswordInput';
import classes from './crossword.module.css';
import { saveGrid } from '../../services/grid';
import { ToastContainer, Bounce, toast } from 'react-toastify';
const splitSymbol = ',';
const maxGridLength = 2056;

const Crossword = () => {
  const [sourceWords, setSourceWords] = useState([]);
  const [grid, setGrid] = useState();
  const [unusedWords, setUnusedWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSaveGrid = async () => {
    if (grid.length * grid[0]?.length > maxGridLength) {
      toast.error('Grid exceeds 2056 length.');
      return;
    }

    if (grid[0] && grid[0].length === 0) {
      toast.error('Grid is empty.');
      return;
    }

    let usedWords =
      unusedWords.length !== 0
        ? sourceWords.filter((it) => !unusedWords.includes(it))
        : sourceWords;

    try {
      await saveGrid(grid, usedWords);
      toast.success('Saved grid successfully!');
    } catch (error) {
      toast.error('Saving grid failed!');
    }
  };

  const generateCrossWord = async (inputValue) => {
    setIsLoading(true);
    const words = inputValue
      .toUpperCase()
      .replace(/\s/g, '')
      .split(splitSymbol)
      .filter((word) => word !== '');

    if (words.length === 0) {
      toast.success('Saved grid successfully!');
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
        <div className={classes.unusedWords}>
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
      <CrosswordInput onSubmitHandler={generateCrossWord} />
      {getCrosswordLayout()}
      {getUnusedWordsLayout()}
      {grid && (
        <div className={classes.button} onClick={onSaveGrid}>
          Save
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export { Crossword };
