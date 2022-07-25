import React from 'react';
import { Layout } from "./components/layout";
import ThemeProvider from './components/ThemeProvider';
import TaskSections from "./TaskSections";

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <TaskSections />
      </Layout>
    </ThemeProvider>
  )
}
