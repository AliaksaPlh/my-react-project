import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { Theme } from '../types_interfaces/interfaces';

const ThemeContext = createContext<Theme>({
  theme: 'light',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(`${theme}`);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
