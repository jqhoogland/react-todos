import { useState } from "react"

interface TodoItem {
  id: number;
  value: string
}

export default function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])

  const handleCreateItem = () => {
    setTodos([...todos, { id: todos.length, value: `Todo #${todos.length}` }])
  }

  return (
    <main>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.value}</li>
        ))} 
        </ul>
      <button onClick={handleCreateItem}>Add Item</button>
    </main>
  )
}
