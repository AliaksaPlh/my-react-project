import useLocalStorage from './useLocalStorage';

export function useSearchTerm(initialValue = '') {
  return useLocalStorage<string>('searchTerm', initialValue);
}
