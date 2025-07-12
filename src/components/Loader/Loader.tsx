import React from "react";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
};

export default Loader;
