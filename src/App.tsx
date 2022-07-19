import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <nav className="sticky-top bg-stone-300 h-20 flex items-center">
        <h1 className="px-8 text-2xl font-bold"><code>react-kanban</code></h1>
      </nav>
      <main className="max-w-screen-md p-8 mx-auto">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </main>
    </div>
  )
}

export default App
