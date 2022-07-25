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
      <ul style={{border: 1, backgroundColor: "blue" }}>
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            {todo.value}
          </li>
        ))} 
        </ul>
      <button onClick={handleCreateItem}>Add Item</button>
    </main>
  )
}
