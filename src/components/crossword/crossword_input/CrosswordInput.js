import React, { useState } from 'react';
import classes from './crosswordInput.module.css';
import { Input, Button } from '@material-ui/core';
const SUBMIT_KEY_CODE = 13; //enter

const CrosswordInput = ({onSubmitHandler}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmitBtn = (e) => {
    if (e.keyCode === SUBMIT_KEY_CODE) {
      const value = e.target.value;
      onSubmitHandler(value);
    }
  };
  return (
    <div className={classes.inputContainer}>
      <Input
        className={classes.input}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleSubmitBtn}
      />
      <Button color="primary" variant="contained" onClick={() => onSubmitHandler(inputValue)}>
        Generate Crossword
      </Button>
    </div>
  );
};

export { CrosswordInput };
