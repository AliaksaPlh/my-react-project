import { useCallback, useContext } from 'react';
import { CO2Context } from '../../context/contextCO2';
import styles from './menuBar.module.css';

export default function SearchCountryBar() {
  const context = useContext(CO2Context);
  const { setSearchCountry } = context;

  const onInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchCountry(event.currentTarget.value);
    },
    [setSearchCountry]
  );

  return (
    <div className={styles.menuField}>
      <label>Search Country</label>
      <input
        type="text"
        id="search-country"
        className={styles.input}
        onInput={onInput}
      />
    </div>
  );
}
