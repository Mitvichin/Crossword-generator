import React from 'react';
import classes from './crosswordLayout.module.css';
import PropTypes from 'prop-types';

const CrosswordLayout = ({ grid }) => {
  const getLayout = () => {
    //Refactor this
    const result = grid.map((row) =>
      row.map((item, i) => (
        <div key={i} className={classes.cellContainer}>
          <span className={classes.cell}>{`${item}`}</span>
          {i === row.length - 1 ? <br /> : ''}
        </div>
      ))
    );
    return result;
  };

  return <div className={classes.container}>{getLayout()}</div>;
};

CrosswordLayout.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

export { CrosswordLayout };
