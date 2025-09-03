export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
}
export const YearlyDataKeys = ['population'] as (keyof YearlyData)[];

export interface Countries {
  [country: string]: {
    iso_code: string;
    data: YearlyData[];
  };
}

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'population-asc'
  | 'population-desc';

export const SORT_OPTIONS = [
  'name-asc',
  'name-desc',
  'population-asc',
  'population-desc',
] as const;

export interface CO2ContextProps {
  countries: Countries | null;
  menu: {
    years: Years;
    searchCountry: string;
    viewColumns: (keyof YearlyData)[];
    sortCountries: SortOption;
  };
  setViewColumns: (fields: (keyof YearlyData)[]) => void;
  setSelectedYear: (year: number) => void;
  setSearchCountry: (query: string) => void;
  setSortCountries: (value: SortOption) => void;
}

export interface Years {
  selectedYear: number;
  allYears: number[];
}

export interface Menu {
  years: Years;
  searchCountry: string;
  viewColumns: (keyof YearlyData)[];
  sortCountries: SortOption;
}
