import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as DefaultThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";

interface IThemeContext {
  darkMode: boolean;
  toggleTheme: () => void;
}

export type Theme = {
  colors: {
    background: string;
    text: string;
    button: {
      text: string;
      background: string;
    };
    input: {
      background: string;
    };
  };
};

const lightTheme = {
  colors: {
    background: "#ffffff",
    text: "var(--primary-color)",
    button: {
      text: "var(--primary-color)",
      background: "var(--secondary-color)",
    },
    input: {
      background: "#f0f0f0",
    },
    slightContrast: "#f0f0f0",
  },
};

const darkTheme = {
  colors: {
    background: "var(--primary-color)",
    text: "#ffffff",
    button: {
      text: "var(--primary-color)",
      background: "var(--secondary-color)",
    },
    input: {
      background: "#ffffff",
    },
    slightContrast: " #272635",
  },
};

export const useTheme = () => {
  const { toggleTheme, darkMode } = useContext(UseThemeContext);
  return { toggleTheme, darkMode };
};

const UseThemeContext: React.Context<IThemeContext> =
  createContext<IThemeContext>({
    darkMode: false,
    toggleTheme: () => {
      //
    },
  });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(darkTheme);
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
      setDarkMode(true);
    } else {
      setTheme(lightTheme);
      setDarkMode(false);
    }
  };

  return (
    <UseThemeContext.Provider value={{ toggleTheme, darkMode }}>
      <DefaultThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        {children}
      </DefaultThemeProvider>
    </UseThemeContext.Provider>
  );
};
