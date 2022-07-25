import { useState } from "react"

interface TodoItem {
  id: number;
  value: string;
  completed: boolean;
}


export default function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])

  const handleCreateItem: OnCreateItem = (item = {}) => {
    setTodos([...todos, { id: todos.length, value: `Todo #${todos.length}`, completed: false, ...item }])
  }

  const handleUpdateItem: OnUpdateItem = (id, update = {}) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...update } : todo))
  }

  const newTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <main>
      <TodoList
        title="Todos"
        todos={newTodos}
        onCreateItem={() => handleCreateItem({ completed: false })}
        onUpdateItem={handleUpdateItem}
      />
      <TodoList
        title="Completed"
        todos={completedTodos}
        onCreateItem={() => handleCreateItem({ completed: true })}
        onUpdateItem={handleUpdateItem}
      />
    </main>
  )
}

type OnCreateItem = (item?: Partial<TodoItem>) => void
type OnUpdateItem = (id: TodoItem['id'], item?: Partial<TodoItem>) => void;

interface TodoListProps {
  todos: TodoItem[];
  title: string
  onCreateItem: OnCreateItem
  onUpdateItem: OnUpdateItem
}

function TodoList({title, todos, onCreateItem, onUpdateItem}: TodoListProps) {

  return (
    <section>
      <h1>{title}</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <TodoItem {...todo} onUpdateItem={(item) => onUpdateItem(todo.id, item)} />
          </li>
        ))} 
      </ul>
      <button onClick={() => onCreateItem()}>Add Item</button>
    </section>
  )
}

interface TodoItemProps {
  value: string
  completed: boolean
  onUpdateItem: (item: Partial<TodoItem>) => void
}

function TodoItem({ value, completed, onUpdateItem }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateItem({ value: e.target.value })
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
    onUpdateItem({ completed: e.target.checked })
  }

  return (
    <div>
      <input type="checkbox" checked={completed} onChange={handleCheck} />
      <span onClick={() => setIsEditing(true)}>{value}</span>
    </div>
    )
}