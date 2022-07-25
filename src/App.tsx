import { useState } from "react"

interface TodoItem {
  id: number;
  value: string
}

export default function App() {
  return (
    <main>
      <TodoList/>
      <TodoList/>
    </main>
  )
}


function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([])

  const handleCreateItem = () => {
    setTodos([...todos, { id: todos.length, value: `Todo #${todos.length}` }])
  }

  return (
    <>
      <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.value}
            </li>
          ))} 
          </ul>
      <button onClick={handleCreateItem}>Add Item</button>
    </>
  )
}