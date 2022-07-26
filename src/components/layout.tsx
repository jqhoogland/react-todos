import { PropsWithChildren, useContext, useState } from "react"
import { ThemeToggle, ThemeContext } from "./theme";


export function NavBar() {
  return (
    <nav className="fixed w-full h-20 items-center flex justify-between px-8 z-50 border-b-2 bg-base-100">
      <a href="/">
        <h1 className="text-lg font-bold"><code>bit-todos</code></h1>
      </a>

      <ThemeToggle  />
    </nav>
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
  const [isDarkMode] = useContext(ThemeContext)

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