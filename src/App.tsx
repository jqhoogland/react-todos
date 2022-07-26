import { useState } from "react"
import { Layout } from "./components/layouts";
import Tasks from "./pages/Tasks";
import { ThemeProvider } from "./components/theme";


export default function App() {
  return (
    <ThemeProvider>
      <Layout>  
        <Tasks/>
      </Layout>
    </ThemeProvider>
  )
}
