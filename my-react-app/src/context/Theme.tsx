import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import type { ThemeContextProps, AppTheme } from '../types/types';

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}

export const lightTheme: AppTheme = {
  text: '#2e2e2e',
  accent: '#35B8BE',
  muted: '#546285',
  border: '#dddddd',
  accentHover: '#2ca2a7',
};

export const darkTheme: AppTheme = {
  text: '#f0f0f0',
  accent: '#35B8BE',
  muted: '#9ba5b1',
  border: '#444444',
  accentHover: '#2ca2a7',
};

type ThemeMode = 'light' | 'dark';

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getDefaultTheme = (): ThemeMode =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const [theme, setTheme] = useState<ThemeMode>(getDefaultTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const themeObject = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledProvider theme={themeObject}>
        {children}
      </StyledProvider>
    </ThemeContext.Provider>
  );
};
