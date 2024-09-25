'use client'

import { createContext, useState, useEffect, useContext } from 'react';
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const preferredTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setTheme(preferredTheme);
    document.documentElement.classList.toggle('dark', preferredTheme === 'dark');
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>
        <button
          onClick={toggleTheme}
          className="relative w-16 md:w-20 h-10 md:w-[72px] md:h-12 rounded-full p-1 flex items-center transition-all duration-500 focus:outline-none 
          bg-gradient-to-r from-blue-950 via-blue-800 to-blue-500 dark:from-blue-950 dark:via-blue-800 dark:to-blue-500"
        >
          {/* Icono de la luna */}
          <BsFillMoonStarsFill
            className={`absolute left-0 w-6 h-6 md:w-8 md:h-8 pl-1 text-yellow-500 ${theme === 'dark' ? 'block' : 'hidden'}`}
          />

          {/* Icono de deslizamiento */}
          <span
            className={`${
              theme === 'dark' ? 'translate-x-6 md:translate-x-9' : 'translate-x-1'
            } inline-block w-6 h-6 bg-[#f5f5f570] dark:bg-blue-200 rounded-full shadow-md transform transition-transform duration-500 dark:mr-0`}
          ></span>

          {/* Icono del sol */}
          <BsFillSunFill
            className={`absolute right-0 pr-1 w-6 h-6 md:w-8 md:h-8 text-yellow-500 ${theme === 'dark' ? 'hidden' : 'block'}`}
          />
        </button>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
