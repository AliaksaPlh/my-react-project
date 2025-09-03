import { createContext } from 'react';
import type { CO2ContextProps } from '../types, consts/types';
import { YEARS } from '../types, consts/consts';

export const CO2Context = createContext<CO2ContextProps>({
  countries: null,
  menu: {
    years: {
      selectedYear: 2020,
      allYears: YEARS,
    },
    searchCountry: '',
    viewColumns: ['population', 'co2', 'temperature_change_from_co2'],
    sortCountries: 'name-asc',
  },
  setViewColumns: () => {},
  setSelectedYear: () => {},
  setSearchCountry: () => {},
  setSortCountries: () => {},
});
