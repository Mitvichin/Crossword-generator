import React, { useState } from 'react';
import classes from './crosswordInput.module.css';
const SUBMIT_KEY_CODE = 13; //enter

const CrosswordInput = ({ onSubmitHandler }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmitKey = (e) => {
    if (e.keyCode === SUBMIT_KEY_CODE) {
      const value = e.target.value;
      onSubmitHandler(value);
    }
  };

  return (
    <div className={classes.container}>
      <textarea
        className={classes.input}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleSubmitKey}
        placeholder="Type Here (separate words with ',')"
        cols="40"
        rows="1"
      />
      <div className={classes.button} onClick={() => onSubmitHandler(inputValue)}>
        Generate Crossword
      </div>
    </div>
  );
};

export { CrosswordInput };
