import { useState } from "react"
import { Header } from "../layout";
import { defaultTodoItem, TodoItem } from "../../data";
import { Status, statuses } from "../../data";

function Tasks() {
    const [todos, setTodos] = useState<TodoItem[]>([])

    const handleCreateItem: OnCreateItem = (item = {}) => {
        setTodos([...todos, { id: todos.length, ...defaultTodoItem, value: `Todo #${todos.length}`, ...item }])
    }

    const handleUpdateItem: OnUpdateItem = (id, update = {}) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, ...update } : todo))
    }

    return (
        <>
            {
                statuses.map(status => (
                    <TodoList
                        title={status.label}
                        todos={todos}
                        onCreateItem={handleCreateItem}
                        onUpdateItem={handleUpdateItem}
                        key={status.value}
                    />
                ))
            }
        </>
    )
}

export default Tasks;

type OnCreateItem = (item?: Partial<TodoItem>) => void
type OnUpdateItem = (id: TodoItem['id'], item?: Partial<TodoItem>) => void;

interface TodoListProps {
    todos: TodoItem[];
    title: string
    onCreateItem: OnCreateItem
    onUpdateItem: OnUpdateItem
}

function TodoList({ title, todos, onCreateItem, onUpdateItem }: TodoListProps) {
    return (
        <section>
            <Header action={<button onClick={() => onCreateItem()}>+</button>}>
                <h2 className="text-xl font-bold">{title}</h2>
            </Header>
            <ul className="space-y-2 px-4">
                {todos.map(todo => (
                    <li key={todo.id}>
                        <TodoListItem {...todo} onUpdateItem={(item) => onUpdateItem(todo.id, item)} />
                    </li>
                ))}
            </ul>
        </section>
    )
}

interface TodoItemProps {
    value: string
    onUpdateItem: (item: Partial<TodoItem>) => void
}

function TodoListItem({  value }: TodoItemProps) {
    return (
      <li className="flex">
        <span className="pr-4">
          <TodoStatusSelect />
        </span>
        <ToggleableInput value={value}  />
      </li>
    )   
}


interface ToggleableInputProps { value: string }

export function ToggleableInput({ value}: ToggleableInputProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleOpen = () => {
    setIsEditing(true);
  };
    
   const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
    }
  }

  if (isEditing) {
      return <input className="px-2 flex border-2 rounded-lg w-full" onKeyUp={handleKeyUp} value={value} />;
  }

  return <span className="w-full h-full min-h-6" onClick={handleOpen}>{value}</span>;
}

interface TodoStatusSelectProps  {}
function TodoStatusSelect({ }: TodoStatusSelectProps) {
    return (
      <select className="border-2 rounded-lg py-0.5">
        {statuses.map(status => (
          <option key={status.value} value={status.value}>
            <span>{status.icon}</span>{" "}
            {status.label}
          </option>
        ))}
      </select>
    );
  }