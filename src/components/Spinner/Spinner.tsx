import React from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
  style?: React.CSSProperties;
  className?: string;
}
const Spinner: React.FC<SpinnerProps> = ({ style }) => {
  return (
    <div className={styles.spinnerWrapper} style={style}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
};

export default Spinner;
