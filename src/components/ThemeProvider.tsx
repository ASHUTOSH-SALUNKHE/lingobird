'use client';

import { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

export type SiteTheme = 'calm' | 'neon';

interface ThemeContextValue {
  theme: SiteTheme;
  toggleTheme: () => void;
  setTheme: (theme: SiteTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'calm',
  toggleTheme: () => {},
  setTheme: () => {},
});

const STORAGE_KEY = 'lingobird-site-theme';
const THEME_EVENT = 'lingobird-theme-change';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === STORAGE_KEY) callback();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getSnapshot(): SiteTheme {
  if (typeof window === 'undefined') return 'calm';
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'neon' ? 'neon' : 'calm';
  } catch {
    return 'calm';
  }
}

function getServerSnapshot(): SiteTheme {
  return 'calm';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (next: SiteTheme) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new Event(THEME_EVENT));
    } catch {
      document.documentElement.setAttribute('data-theme', next);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'calm' ? 'neon' : 'calm');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useSiteTheme() {
  return useContext(ThemeContext);
}
