import React from 'react';
import styles from './corsswordLayout.module.css';
import PropTypes from 'prop-types';

const CrosswordLayout = ({ grid }) => {
  const getLayout = () => {
    //Refactor this
    const result = grid.map((row) =>
      row.map((item, i) => (
        <div key={i} className={styles.cellContainer}>
          <span className={styles.cell}>{`${item.toUpperCase()}`}</span>
          {i === row.length - 1 ? <br /> : ''}
        </div>
      ))
    );
    return result;
  };

  return <div className={styles.container}>{getLayout()}</div>;
};

CrosswordLayout.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

export { CrosswordLayout };
