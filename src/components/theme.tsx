
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { usePersistedState } from '../hooks';

export const ThemeContext = createContext<[boolean, (isDarkMode: boolean) => void]>([false, () => { }]);

export function ThemeProvider({ children }: PropsWithChildren) {
    console.log("Render ThemeProvider", new Date().getTime());

    const [isDarkMode, setAndSaveIsDarkMode] = usePersistedState('isDarkMode', false);

    // This is the easiest way to usePersistedState.
    // The alternative is to just write a custom hook and avoid the overeager abstraction, 
    // ands that's probably even better, but this will do.
    useLayoutEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme)
    }, [isDarkMode])

    return (
        <ThemeContext.Provider value={[isDarkMode, setAndSaveIsDarkMode]}>
            {children}
        </ThemeContext.Provider>
    )
}


export function ThemeToggle() {
    console.log("Render ThemeToggle", new Date().getTime());
    const [isDarkMode, onChangeDarkMode] = useTheme();

    const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeDarkMode(e.target.checked)
    }, [onChangeDarkMode])

    return (
        <input type="checkbox" onChange={handleCheck} checked={isDarkMode} className="toggle" />
    )
}

export function useTheme() {
    return useContext(ThemeContext);
}