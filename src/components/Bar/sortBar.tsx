import { useCallback, useContext } from 'react';
import { CO2Context } from '../../context/contextCO2';
import { SORT_OPTIONS, type SortOption } from '../../types, consts/types';
import styles from './menuBar.module.css';

export default function SortBar() {
  const context = useContext(CO2Context);
  const {
    menu: { sortCountries },
    setSortCountries,
  } = context;

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      const selected = SORT_OPTIONS.find(
        (option): option is SortOption => option === value
      );

      if (selected) {
        setSortCountries(selected);
      }
    },
    [setSortCountries]
  );

  return (
    <div className={styles.menuField}>
      <label>Sort countries by</label>
      <select
        className={styles.select}
        id="sort-countries"
        defaultValue={sortCountries}
        onChange={onChange}
      >
        {SORT_OPTIONS.map((value) => {
          return (
            <option key={`sort-${value}`} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
