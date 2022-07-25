import { useState } from "react"

interface TodoItem {
  id: number;
  value: string;
  completed: boolean;
}


export default function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])

  const handleCreateItem: OnCreateItem = (item = {s}) => {
    setTodos([...todos, { id: todos.length, value: `Todo #${todos.length}`, completed: false, ...item }])
  }

  const newTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <main>
      <TodoList
        title="Todos"
        todos={newTodos}
        onCreateItem={() => handleCreateItem({ completed: false })}
      />
      <TodoList
        title="Completed"
        todos={completedTodos}
        onCreateItem={() => handleCreateItem({ completed: true })}
      />
    </main>
  )
}

type OnCreateItem = (item?: Partial<TodoItem>) => void

interface TodoListProps {
  todos: TodoItem[];
  title: string
  onCreateItem: OnCreateItem
}

function TodoList({title, todos, onCreateItem}: TodoListProps) {

  return (
    <section>
      <h1>{title}</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <TodoItem defaultValue={todo.value} defaultCompleted={todo.completed} />
          </li>
        ))} 
      </ul>
      <button onClick={() => onCreateItem()}>Add Item</button>
    </section>
  )
}

interface TodoItemProps {
  defaultValue: string
  defaultCompleted: boolean
}

function TodoItem({ defaultValue, defaultCompleted }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const [completed, setCompleted] = useState(defaultCompleted)

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

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(true)
  }

  return (
    <div>
      <input type="checkbox" checked={completed} onChange={handleCheck} />
      <span onClick={() => setIsEditing(true)}>{value}</span>
    </div>
    )
}