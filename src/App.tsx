import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from "./components/layout";
import ThemeProvider from './components/ThemeProvider';
import Tasks from "./pages/Tasks";
import Users from './pages/Users';

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="" element={<Tasks />}/>
          <Route path="/users" element={<Users />}/>
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}
