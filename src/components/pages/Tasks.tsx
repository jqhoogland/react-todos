import { useState } from "react"
import { Header } from "../layout";
import { defaultTodoItem, TodoItem , defaultTodos} from "../../data";
import { Status, statuses } from "../../data";

function Tasks() {
    const [todos, setTodos] = useState<TodoItem[]>(defaultTodos)

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
    status: Status['value'];
    onUpdateItem: (item: Partial<TodoItem>) => void
}

function TodoListItem({  value, status, onUpdateItem }: TodoItemProps) {
    return (
      <li className="flex">
        <span className="pr-4">
                <TodoStatusSelect value={status} onChangeValue={status => onUpdateItem({status})} />
        </span>
        <ToggleableInput value={value} onChangeValue={value => onUpdateItem({value})} />
      </li>
    )   
}


interface ToggleableInputProps { value: string, onChangeValue: (value: string) => void }

export function ToggleableInput({ value, onChangeValue}: ToggleableInputProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e.target.value)
  }
    
  const handleOpen = () => {
    setIsEditing(true);
  };
    
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
    }
  }

  if (isEditing) {
      return <input className="px-2 flex border-2 rounded-lg w-full" onKeyUp={handleKeyUp} value={value} onChange={handleChange} />;
  }

  return <span className="w-full h-full min-h-6" onClick={handleOpen}>{value}</span>;
}

interface TodoStatusSelectProps  {value: Status['value'], onChangeValue: (value: Status['value']) => void}
function TodoStatusSelect({ value, onChangeValue }: TodoStatusSelectProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChangeValue(e.target.value as Status['value'])
    }

    return (
        <select className="border-2 rounded-lg py-0.5" value={value} onChange={ handleChange}>
        {statuses.map(status => (
          <option key={status.value} value={status.value}>
            <span>{status.icon}</span>{" "}
            {status.label}
          </option>
        ))}
      </select>
    );
  }