import { useState } from "react"
import { Layout } from "./components/layouts";
import Tasks from "./pages/Tasks";
import { ThemeProvider } from "./components/theme";
import { Route, Routes } from "react-router";
import Users from "./pages/Users";


export default function App() {
  console.log("Render App", new Date().getTime());

  return (
    <ThemeProvider>
      <Layout>  
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}
