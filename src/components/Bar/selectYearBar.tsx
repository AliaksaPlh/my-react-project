import { useCallback, useContext, useMemo } from 'react';
import { CO2Context } from '../../context/contextCO2';
import styles from './menuBar.module.css';

export default function SelectYearBar() {
  const context = useContext(CO2Context);
  const {
    setSelectedYear,
    menu: { years },
  } = context;

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYear(parseInt(event.currentTarget.value));
    },
    [setSelectedYear]
  );

  const Years = useMemo(() => {
    return years.allYears.map((item) => {
      return (
        <option key={`select-year${item}`} value={item}>
          {item}
        </option>
      );
    });
  }, [years.allYears]);

  return (
    <div className={styles.menuField}>
      <label>Select year</label>
      <select
        id="select-year"
        defaultValue={years.selectedYear}
        className={styles.select}
        onChange={onChange}
      >
        {Years}
      </select>
    </div>
  );
}
