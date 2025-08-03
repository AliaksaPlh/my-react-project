export default function useLocalStorage(key: string) {
  const setLocalStorage = (value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return { setLocalStorage };
}
