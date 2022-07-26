import { PropsWithChildren, useState } from "react"

interface NavBarProps {
  isDarkMode: boolean;
  onChangeDarkMode: (isDarkMode: boolean) => void;
}

export function NavBar({isDarkMode, onChangeDarkMode}: NavBarProps) {
  return (
    <nav className="fixed w-full h-20 items-center flex justify-between px-8 z-50 border-b-2 bg-base-100">
      <a href="/">
        <h1 className="text-lg font-bold"><code>bit-todos</code></h1>
      </a>

      <ThemeToggle isDarkMode={isDarkMode} onChangeDarkMode={onChangeDarkMode} />
    </nav>
  )
}

function ThemeToggle({isDarkMode, onChangeDarkMode}: NavBarProps) {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeDarkMode(e.target.checked)
  }

  return (
    <input type="checkbox" onChange={handleCheck} checked={isDarkMode} />
  )
}

export function Header({ children, action }: PropsWithChildren<{ action: React.ReactNode }>) {
  return (
    <header className="flex items-center gap-2 px-4 py-2 justify-between sticky top-20 z-10 bg-base-100 border-b my-2 ">
      <span className="flex gap-2 items-baseline">
        {children}
      </span>
      {action}
    </header>
  )
}

export function Layout({ children }: PropsWithChildren) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleChangeDarkMode = (isDarkMode: boolean) => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <>
      <NavBar isDarkMode={isDarkMode} onChangeDarkMode={handleChangeDarkMode} />
      <main className="min-h-screen h-full pt-20">
        {children}
      </main>
      <Footer isDarkMode={isDarkMode} />
    </>
  )
}

interface FooterProps {
  isDarkMode: boolean
}

export function Footer({ isDarkMode }: FooterProps) {
  return (
    <div className="h-40 flex flex-col place-items-center p-10">
      <p className="text-center text-sm w-full">
        Made in {
          isDarkMode ? '🌚' : '🌝'
        }
      </p>
      <p className="text-center font-mono w-full font-bold">
        Bit Academy
      </p>
    </div>
  )
}