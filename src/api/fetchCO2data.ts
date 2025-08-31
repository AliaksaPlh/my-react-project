import type { Countries } from '../types, interfaces, consts/interface';
import { API_URL } from '../types, interfaces, consts/consts';

async function fetchData(): Promise<Countries | null> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw Error(
        'Failed to load data, check fetchData function or network connection'
      );
    }

    const json = await response.json();

    return json;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error(
      'Failed to load data, check fetchData function or network connection'
    );
  }
}

export const dataCountries = fetchData();
