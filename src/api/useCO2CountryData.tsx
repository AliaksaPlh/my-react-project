import { useEffect, useState } from 'react';
import { fetchCo2Data } from './fetchCO2data';
import type { Countries } from '../types, consts/types';

export function useCO2CountryData() {
  const [data, setData] = useState<Countries | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const result = await fetchCo2Data();
        if (active) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
