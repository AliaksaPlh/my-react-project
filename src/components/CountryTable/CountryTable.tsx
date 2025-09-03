import { useContext, useMemo } from 'react';
import { CO2Context } from '../../context/contextCO2';
import BarMenu from '../Bar/BarMenu';
import { getSorted } from '../../utils/helpers';
import styles from './Table.module.css';
import Spinner from '../Spinner/Spinner';

export default function CountryTable() {
  const { countries, menu } = useContext(CO2Context);
  const {
    years: { selectedYear },
    searchCountry,
    sortCountries,
    viewColumns,
  } = menu;

  const filteredCountries = useMemo(() => {
    if (!countries) return [];
    let arr = Object.entries(countries);
    if (searchCountry.trim()) {
      arr = arr.filter(([country]) =>
        country.toLowerCase().includes(searchCountry.trim().toLowerCase())
      );
    }
    arr = getSorted(arr, sortCountries, selectedYear);

    return arr;
  }, [countries, searchCountry, sortCountries, selectedYear]);

  if (!countries)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.container}>
      <BarMenu />
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Country</th>
              <th>ISO Code</th>
              {viewColumns.map((key) => (
                <th key={key}>
                  {key === 'population' ? `Population (${selectedYear})` : key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCountries.map(([country, countryObj]) => {
              const yearData = countryObj.data.find(
                (data) => data.year === selectedYear
              );
              return (
                <tr key={country}>
                  <td>{country}</td>
                  <td>{countryObj.iso_code || 'N/A'}</td>
                  {viewColumns.map((key) => (
                    <td key={key}>
                      {key === 'year'
                        ? selectedYear
                        : (yearData?.[key] ?? 'N/A')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
