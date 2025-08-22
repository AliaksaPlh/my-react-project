'use client';

import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { Theme } from '../types_interfaces/interfaces';
import { LIGHT, DARK } from '../const';

const ThemeContext = createContext<Theme>({
  theme: LIGHT,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<typeof LIGHT | typeof DARK>(LIGHT);
  useEffect(() => {
    document.body.classList.remove(LIGHT, DARK);
    document.body.classList.add(`${theme}`);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === LIGHT ? DARK : LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
