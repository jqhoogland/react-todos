import clsx from "clsx";
import React, { PropsWithChildren, useState, createContext, useContext } from "react";

type Theme = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
]

export const ThemeContext = createContext<Theme>([false, () => { }]);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    React.useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
        }
    }, [])

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
    console.log({isDarkMode, setIsDarkMode})
    return (
        <input
            type="checkbox"
            className={"toggle bg-yellow-400"}
            checked={isDarkMode} 
            onChange={(e) =>  setIsDarkMode(e.target.checked)}
        />
    )
}

