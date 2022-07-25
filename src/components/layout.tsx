import { PropsWithChildren } from "react"
import { ThemeToggle } from "./ThemeProvider"

export function NavBar() {
  return (
    <nav className="fixed w-full bg-base-300 h-20 items-center flex justify-between px-8 z-50">
      <h1 className="text-lg font-bold"><code>bit-todos</code></h1>
      <ThemeToggle />
    </nav>
  )
}

export function Header({ children, action }: PropsWithChildren<{ action: React.ReactNode }>) {
  return (
    <header className="flex items-center gap-2 px-4 py-2 bg-base-100 justify-between sticky top-20 z-10">
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
      <main className="bg-base-200 min-h-screen h-full pt-20">
        {children}
      </main>
    </>
  )
}