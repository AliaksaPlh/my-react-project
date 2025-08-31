export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
  [key: string]: number | undefined; // to new fields
}

export interface CountryData {
  country: string;
  iso_code?: string;
  region?: string;
  data: YearlyData[];
}

export interface Countries {
  [country: string]: {
    iso_code: string;
    data: CountryData[];
  };
}

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'population-asc'
  | 'population-desc';

export interface AppContextType {
  year: number;
  setYear: (year: number) => void;

  search: string;
  setSearch: (value: string) => void;

  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;

  selectedColumns: string[];
  setSelectedColumns: (cols: string[]) => void;

  countries: Countries | null;
  setCountries: (data: Countries | null) => void;
}
