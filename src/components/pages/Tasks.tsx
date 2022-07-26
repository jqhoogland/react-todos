import { useEffect, useState } from "react"
import { Header } from "../layout";
import { defaultTodoItem, TodoItem, defaultTodos, Priority, priorities, User, users } from "../../data";
import { Status, statuses } from "../../data";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import { useListMethods, usePersistedState } from "../../hooks";



const useTodos = () => {
  const [todos, setAndSaveTodos] = usePersistedState<TodoItem[]>('todos', defaultTodos)
  const { create, update, remove } = useListMethods(todos, setAndSaveTodos)

  const handleCreateItem: OnCreateItem = (item= {}) => {
    create({ ...defaultTodoItem, ...item })
  }

  return { todos, setAndSaveTodos, handleCreateItem, handleUpdateItem: update, handleDeleteItem: remove }
}


function Tasks() {
  const { todos, handleCreateItem, handleUpdateItem} = useTodos()

  return (
    <>
      {
        statuses.map(status => (
          <TodoList
            title={status.label}
            status={status.value}
            todos={todos.filter(todo => todo.status === status.value)}
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
type OnUpdateItem = (id: TodoItem['id'], item: Partial<TodoItem>) => void;

interface TodoListProps {
  todos: TodoItem[];
  status: Status['value'];
  title: string
  onCreateItem: OnCreateItem
  onUpdateItem: OnUpdateItem
}

function TodoList({ title, status, todos, onCreateItem, onUpdateItem }: TodoListProps) {
  const [parentRef] = useAutoAnimate<HTMLUListElement>()
  
  const orderedTodos = todos.sort((a, b) => b.priority - a.priority);

  return (
    <section>
      <Header action={
        <button onClick={() => onCreateItem({ status })} className="btn btn-xs btn-ghost">+</button>
      }>
        <h2 className="text-xl font-bold">{title}</h2>
      </Header>
      <ul className="space-y-2 p-4" ref={parentRef}>
        {orderedTodos.map(todo => (
          <li key={todo.id}>
            <TodoListItem {...todo} onUpdateItem={(item) => onUpdateItem(todo.id, item)} />
          </li>
        ))}
      </ul>
    </section>
  )
}

interface TodoItemProps extends TodoItem {
  onUpdateItem: (item: Partial<TodoItem>) => void
}

function TodoListItem({ value, status, priority, assigned, onUpdateItem }: TodoItemProps) {

  const handleToggleAssigned = (userId: User['id']) => {
    console.log(assigned, userId)
    if (assigned.includes(userId)) {
      onUpdateItem({ assigned: assigned.filter(uid => uid !== userId) })
    } else {
      onUpdateItem({assigned: [ ...assigned, userId]})
    }
  }

  return (
    <li className="flex gap-2">
      <TodoStatusSelect value={status} onChangeValue={status => onUpdateItem({ status })} />
      <TodoPrioritySelect value={priority} onChangeValue={priority => onUpdateItem({ priority })} />
      <ToggleableInput value={value} onChangeValue={value => onUpdateItem({ value })} />
      <TodoAssignedSelect value={assigned} onChangeValue={handleToggleAssigned} />
    </li>
  )
}


interface ToggleableInputProps { value: string, onChangeValue: (value: string) => void }

export function ToggleableInput({ value, onChangeValue }: ToggleableInputProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e.target.value)
  }

  const handleOpen = () => {
    setIsEditing(true);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === "Escape") {
      setIsEditing(false)
    }
  }

  useEffect(() => {
    if (value === "") {
      handleOpen()
    }
  }, [value])

  if (isEditing) {
    return <input className="px-2 flex border-2 rounded-lg w-full input input-sm input-bordered" onKeyUp={handleKeyUp} value={value} onChange={handleChange} autoFocus/>;
  }

  return <span className="w-full h-full min-h-6" onClick={handleOpen}>{value}</span>;
}

interface TodoStatusSelectProps { value: Status['value'], onChangeValue: (value: Status['value']) => void }
function TodoStatusSelect({ value, onChangeValue }: TodoStatusSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeValue(e.target.value as Status['value'])
  }

  return (
    <select className="border-2 rounded-lg py-0.5 select select-sm select-bordered text-xs" value={value} onChange={handleChange}>
      {statuses.map(status => (
        <option key={status.value} value={status.value}>
          <span>{status.icon}</span>{" "}
          {status.label}
        </option>
      ))}
    </select>
  );
}


interface TodoPrioritySelectProps { value: Priority['value'], onChangeValue: (value: Priority['value']) => void }
function TodoPrioritySelect({ value, onChangeValue }: TodoPrioritySelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeValue(parseInt(e.target.value) as Priority['value'])
  }

  return (
    <select className="border-2 rounded-lg py-0.5 select select-sm select-bordered text-xs" value={value} onChange={handleChange}>
      {priorities.map(priority => (
        <option key={priority.value} value={priority.value}>
          <span>{priority.icon}</span>{" "}
          {priority.label}
        </option>
      ))}
    </select>
  );
}


interface TodoAssignedSelectProps { value: User['id'][], onChangeValue: (value: User['id']) => void }
function TodoAssignedSelect({ value, onChangeValue }: TodoAssignedSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeValue(parseInt(e.target.value) as User['id']);
  }
  const stringifiedAssigned = value.map(value => value.toString());

  return (
    <select className="border-2 rounded-lg py-0.5 select select-sm select-bordered text-xs" value={stringifiedAssigned} onChange={handleChange} multiple>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

