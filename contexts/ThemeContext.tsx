
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark'; 
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;

    // Update html class for Tailwind 'class' strategy
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Manually manage body classes to ensure global background changes
    // This overrides the hardcoded classes from index.html if they exist
    if (theme === 'dark') {
         body.classList.add('bg-slate-950', 'text-slate-100');
         body.classList.remove('bg-slate-50', 'text-slate-900');
    } else {
         body.classList.remove('bg-slate-950', 'text-slate-100');
         body.classList.add('bg-slate-50', 'text-slate-900');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
