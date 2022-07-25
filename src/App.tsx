import { useState } from "react"
import { TodoItem } from './data';

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
              <TodoItem value={todo.value}/>
            </li>
          ))} 
          </ul>
      <button onClick={handleCreateItem}>Add Item</button>
    </>
  )
}

interface TodoItemProps {
  value: string
}

function TodoItem({value}: TodoItemProps) {
  return <span>{value}</span>
}