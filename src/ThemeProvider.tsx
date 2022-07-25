import React, { PropsWithChildren, useState, createContext, useContext } from "react";

export type Mode = "light" | "dark";

export const ThemeContext = createContext({ mode: "light", isDarkMode: false, setMode: (mode: Mode) => { }, toggleMode: () => { } });
export const useTheme = () => useContext(ThemeContext)

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [mode, setMode] = useState<Mode>("light");
    const toggleMode = React.useCallback(() => setMode(mode === "light" ? "dark" : "light"), [setMode]);
    const isDarkMode = mode === "dark";

    return (
        <ThemeContext.Provider value={{ mode, isDarkMode, setMode, toggleMode }}>
            {children}
        </ThemeContext.Provider>

    )
}

export default ThemeProvider;

export const ThemeToggle = () => {
    const { isDarkMode, toggleMode } = useTheme();
    return <input type="checkbox" className="toggle" checked={isDarkMode} onChange={toggleMode} />
}

