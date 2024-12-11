import React, { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: { default: "#121212", paper: "#1E1E1E" },
                text: { primary: "#ffffff", secondary: "#A0A0A0" },
                primary: { main: "#729C68" },
                secondary: { main: "#FF4081" },
              }
            : {
                background: { default: "#f5f5f5", paper: "#ffffff" },
                text: { primary: "#000000", secondary: "#606060" },
                primary: { main: "#2D2D2D" },
                secondary: { main: "#FF4081" },
              }),
        },
        typography: {
          fontFamily: "Roboto, Arial",
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);