import { useState } from "react"
import { Layout } from "./components/layout";
import Tasks from "./components/pages/Tasks";
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
