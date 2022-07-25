import { useState } from "react"

interface TodoItem {
  id: number;
  value: string
}

export default function App() {
  return (
    <main>
      <TodoList title="Todos" />
      <TodoList title="Completed"/>
    </main>
  )
}

interface TodoListProps {
  title: string
}

function TodoList({title}: TodoListProps) {
  const [todos, setTodos] = useState<TodoItem[]>([])

  const handleCreateItem = () => {
    setTodos([...todos, { id: todos.length, value: `Todo #${todos.length}` }])
  }

  return (
    <section>
      <h1>{title}</h1>
      <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <TodoItem defaultValue={todo.value}/>
            </li>
          ))} 
          </ul>
      <button onClick={handleCreateItem}>Add Item</button>
    </section>
  )
}

interface TodoItemProps {
  defaultValue: string
}

function TodoItem({ defaultValue }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return <input value={value} onChange={handleChange} onKeyUp={handleKeyUp} />
  }

  return <span onClick={() => setIsEditing(true)}>{value}</span>
}