import { useContext, useState } from 'react';
import { CO2Context } from '../../context/contextCO2';
import { COUNTRY_DATA_KEYS } from '../../types, consts/consts';
import type { CountryDataKeys } from '../../types, consts/consts';
import styles from './modal.module.css';
import type { YearlyData } from '../../types, consts/types';

export default function ColumnSelector({ onClose }: { onClose: () => void }) {
  const { menu, setViewColumns } = useContext(CO2Context);
  const [selected, setSelected] = useState<
    (typeof COUNTRY_DATA_KEYS)[number][]
  >(menu.viewColumns);

  const handleChange = (key: CountryDataKeys) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const apply = () => {
    setViewColumns(selected as (keyof YearlyData)[]);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h3>Chose</h3>
        <div className={styles.list}>
          {COUNTRY_DATA_KEYS.map((key) => (
            <label key={key} className={styles.item}>
              <input
                type="checkbox"
                checked={selected.includes(key)}
                onChange={() => handleChange(key)}
              />
              {key}
            </label>
          ))}
        </div>
        <div className={styles.actions}>
          <button onClick={apply} className={styles.button}>
            ✔
          </button>
          <button onClick={onClose} className={styles.button}>
            ✘
          </button>
        </div>
      </div>
    </div>
  );
}
