import clsx from "clsx";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle, useTheme } from "./theme";


export function NavBar() {
  return (
    <nav className="fixed w-full h-20 items-center flex justify-between px-8 z-50 border-b-2 border-base-100 bg-base-300 gap-4">
      <Link to="/" className="flex-1">
        <h1 className="text-lg font-bold"><code>bit-todos</code></h1>
      </Link>
      <Link to="/users">
        <button className="btn btn-ghost">Users</button>
      </Link>
      <ThemeToggle  />
    </nav>
  )
}


export function Header({ children, action }: PropsWithChildren<{ action: React.ReactNode }>) {
  return (
    <header className="flex items-center gap-2 px-4 py-2 justify-between sticky top-20 z-10 bg-base-200 border-b border-base-200 ">
      <span className="flex gap-2 items-baseline">
        {children}
      </span>
      {action}
    </header>
  )
}


export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen h-full pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}


export function Footer() {
  const [isDarkMode] = useTheme();

  return (
    <div className="h-40 flex flex-col place-items-center p-10">
      <p className="text-center text-sm w-full">
        Made with {
          isDarkMode ? '🌚' : '🌝'
        }
      </p>
      <p className="text-center font-mono w-full font-bold">
        Bit Academy
      </p>
    </div>
  )
}

interface DropdownProps extends PropsWithChildren {
  trigger: React.ReactNode
  className?: string
}

export function Dropdown({ trigger, children, className }: DropdownProps) {
  return <div className={clsx("dropdown", className)}>
    {trigger}
    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 border-2 border-base-200">
      {children}
    </ul>
  </div>
}