import clsx from "clsx";
import React, { PropsWithChildren, useState, createContext, useContext } from "react";
import { usePersistedState } from "../hooks";

type Theme = [
    boolean,
    (isDarkMode: boolean) => void
]

export const ThemeContext = createContext<Theme>([false, () => { }]);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = usePersistedState('theme', false);

    
    React.useEffect(() => {
        if (isDarkMode || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
        }
    }, [isDarkMode])


    return (
        <ThemeContext.Provider value={[isDarkMode, setIsDarkMode]}>
            <div data-theme={isDarkMode ? "dark" : "light"} className="w-full h-full min-h-screen">
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useTheme();
    return (
        <input
            type="checkbox"
            className={"toggle bg-yellow-400"}
            checked={isDarkMode} 
            onChange={(e) =>  setIsDarkMode(e.target.checked)}
        />
    )
}

