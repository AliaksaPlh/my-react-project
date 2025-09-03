import {
  type Countries,
  type SortOption,
  type Menu,
} from '../types, consts/types';
import { SORT_OPTIONS, YearlyDataKeys } from '../types, consts/types';
import { YEARS } from '../types, consts/consts';

export function getSorted(
  arr: [string, Countries[string]][],
  sortCountries: SortOption,
  selectedYear: number
): [string, Countries[string]][] {
  return arr.sort((a, b) => {
    const [nameA, dataA] = a;
    const [nameB, dataB] = b;
    switch (sortCountries) {
      case SORT_OPTIONS[0]:
        return nameA.localeCompare(nameB, 'en');
      case SORT_OPTIONS[1]:
        return nameB.localeCompare(nameA, 'en');
      case SORT_OPTIONS[2]: {
        const popA =
          dataA.data.find((d) => d.year === selectedYear)?.population ?? 0;
        const popB =
          dataB.data.find((d) => d.year === selectedYear)?.population ?? 0;
        return popA - popB;
      }
      case SORT_OPTIONS[3]: {
        const popA =
          dataA.data.find((d) => d.year === selectedYear)?.population ?? 0;
        const popB =
          dataB.data.find((d) => d.year === selectedYear)?.population ?? 0;
        return popB - popA;
      }
      default:
        return 0;
    }
  });
}

export function createDefaultMenu(data?: Countries | null): Menu {
  return {
    searchCountry: '',
    sortCountries: SORT_OPTIONS[0],
    viewColumns: YearlyDataKeys,
    years: {
      selectedYear: 2023,
      allYears: YEARS,
    },
  };
}
