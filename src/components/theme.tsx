
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext<[boolean, (isDarkMode: boolean) => void]>([false, () => { }]);

export function ThemeProvider({ children }: PropsWithChildren) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleChangeDarkMode = (isDarkMode: boolean) => {
      const theme = isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme)
      setIsDarkMode(isDarkMode)
      localStorage.setItem('theme', theme)
    }

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            handleChangeDarkMode(theme === 'dark');
        }
    }, [])

    return (
        <ThemeContext.Provider value={[isDarkMode, handleChangeDarkMode]}>
            {children}
        </ThemeContext.Provider>
    )
}


export function ThemeToggle() {
    const [isDarkMode, onChangeDarkMode] = useContext(ThemeContext);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeDarkMode(e.target.checked)
    }
  
    return (
      <input type="checkbox" onChange={handleCheck} checked={isDarkMode} className="toggle"/>
    )
  }