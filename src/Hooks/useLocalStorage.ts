export default function useLocalStorage(key: string) {
  const setLocalStorage = (value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getLocalStorage = () => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  };

  return { setLocalStorage, getLocalStorage };
}
