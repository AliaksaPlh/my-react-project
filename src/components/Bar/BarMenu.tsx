import styles from './menuBar.module.css';
import { memo, useState } from 'react';
import SearchCountryBar from './searchCounrtyBar';
import SelectYearBar from './selectYearBar';
import SortBar from './sortBar';
import ColumnSelector from './ModalColumnSelector';

// eslint-disable-next-line react/display-name
const BarMenu = memo(() => {
  const [showSelector, setShowSelector] = useState(false);

  return (
    <div className={styles.menuBar}>
      <SearchCountryBar />
      <SelectYearBar />
      <SortBar />
      <button className={styles.button} onClick={() => setShowSelector(true)}>
        +
      </button>
      {showSelector && (
        <ColumnSelector onClose={() => setShowSelector(false)} />
      )}
    </div>
  );
});

export default BarMenu;
