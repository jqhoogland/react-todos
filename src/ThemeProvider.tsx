import clsx from "clsx";
import React, { PropsWithChildren, useState, createContext, useContext } from "react";

type Theme = [
    boolean,
    (isDarkMode: boolean) => void
]

export const ThemeContext = createContext<Theme>([false, () => { }]);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    React.useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
        }
    }, [])
    
    const changeTheme = React.useCallback((isDarkMode: boolean) => {
        setIsDarkMode(isDarkMode);

        // Persist to local storage,
        // & change top level node (because this effects only direct descendants & <App/> isn't mounted at the top-level)
        if (isDarkMode) {
            localStorage.theme = 'dark';
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            localStorage.theme = 'light'
            document.documentElement.setAttribute('data-theme', 'light')
        }
    }, [setIsDarkMode])

    return (
        <ThemeContext.Provider value={[isDarkMode, changeTheme]}>
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

