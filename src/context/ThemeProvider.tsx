"use client";
import React, { createContext, useState, useContext} from "react";

type ThemeContextType = {
   mode: ("light" | "dark");
   setMode : (mode:"light" | "dark")=>void
}

const ThemeContext = createContext<ThemeContext>({
   mode:"dark",
   setMode:()=>{}
});

export const useTheme = () =>useContext(ThemeContext) 

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("dark");
  
 
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
