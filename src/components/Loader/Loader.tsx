import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  style?: React.CSSProperties;
}
const Loader: React.FC<LoaderProps> = ({ style }) => {
  return (
    <div className={styles.loaderWrapper} style={style}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
};

export default Loader;
