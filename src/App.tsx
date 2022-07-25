import { useState } from "react"
import { Layout } from "./components/layout";
import Tasks from "./components/pages/Tasks";


export default function App() {

  return (
    <Layout>
      <Tasks/>
    </Layout>
  )
}
