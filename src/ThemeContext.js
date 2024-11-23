import React, { createContext, useContext, useState } from 'react';
import themeColors from './assets/styles/themeColors'; // array con i temi


const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themeColors[0]); // Tema iniziale

  // Funzione per cambiare tema -- dev
  const switchTheme = (themeName) => {
    const selectedTheme = themeColors.find((theme) => theme.name === themeName);
    if (selectedTheme) {
      setCurrentTheme(selectedTheme);
    } else {
      console.warn(`Tema "${themeName}" non trovato!`);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook per accedere facilmente al contesto
export const useTheme = () => useContext(ThemeContext);
