import { PropsWithChildren } from "react"
import { ThemeToggle } from "./ThemeProvider"

const NavBar = () => {
    return (
      <nav className="fixed w-full bg-base-300 h-20 items-center flex justify-between px-8 z-50">
        <h1 className="text-lg font-bold"><code>bit-todos</code></h1>
        <ThemeToggle />
      </nav>
    )
  }
  
  export function Layout({ children }: PropsWithChildren){
    return (
      <>
      <NavBar />
        <main className="bg-base-200 min-h-screen h-full pt-20">
          {children}
        </main>
      </>
    )
  }