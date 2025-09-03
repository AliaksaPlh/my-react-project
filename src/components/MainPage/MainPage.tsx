import { useCallback, useMemo, useState } from 'react';
import { CO2Context } from '../../context/contextCO2';
import CountryTable from '../CountryTable/CountryTable';
import type { Menu, YearlyData, SortOption } from '../../types, consts/types';
import { createDefaultMenu } from '../../utils/helpers';
import Spinner from '../Spinner/Spinner';
import { useCO2CountryData } from '../../api/useCO2CountryData';
import styles from './MainPage.module.css';

export default function MainPage() {
  const { data, loading, error } = useCO2CountryData();

  const defaultMenu = useMemo(() => createDefaultMenu(data), [data]);
  const [menu, setMenu] = useState<Menu>(defaultMenu);

  const setViewColumns = useCallback((viewColumns: (keyof YearlyData)[]) => {
    setMenu((prev) => ({ ...prev, viewColumns }));
  }, []);

  const setSelectedYear = useCallback((selectedYear: number) => {
    setMenu((prev) => ({ ...prev, years: { ...prev.years, selectedYear } }));
  }, []);

  const setSearchCountry = useCallback((searchCountry: string) => {
    setMenu((prev) => ({ ...prev, searchCountry }));
  }, []);

  const setSortCountries = useCallback((sortCountries: SortOption) => {
    setMenu((prev) => ({ ...prev, sortCountries }));
  }, []);

  const setMethods = useMemo(
    () => ({
      setViewColumns,
      setSelectedYear,
      setSearchCountry,
      setSortCountries,
    }),
    [setViewColumns, setSelectedYear, setSearchCountry, setSortCountries]
  );

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error || !data) return <div>{error ?? 'No data available'}</div>;

  return (
    <div className={styles.mainPage}>
      <CO2Context.Provider
        value={{
          countries: data,
          menu,
          ...setMethods,
        }}
      >
        <CountryTable />
      </CO2Context.Provider>
    </div>
  );
}
