import type { Countries } from '../types, consts/types';
import { API_URL } from '../types, consts/consts';

export async function fetchCo2Data(): Promise<Countries | null> {
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
