import { PropsWithChildren, useEffect, useState } from "react"
import { Header } from "../layout";
import { defaultTodoItem, TodoItem, defaultTodos, Priority, priorities, User, users } from "../../data";
import { Status, statuses } from "../../data";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useListMethods, usePersistedState } from "../../hooks";
import { clsx } from "clsx";



const useTodos = () => {
  const [todos, setAndSaveTodos] = usePersistedState<TodoItem[]>('todos', defaultTodos)
  const { create, update, remove } = useListMethods(todos, setAndSaveTodos)

  const handleCreateItem: OnCreateItem = (item = {}) => {
    create({ ...defaultTodoItem, ...item })
  }

  return { todos, setAndSaveTodos, handleCreateItem, handleUpdateItem: update, handleDeleteItem: remove }
}


function Tasks() {
  const { todos, handleCreateItem, handleUpdateItem, handleDeleteItem } = useTodos()

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
            onDeleteItem={handleDeleteItem}
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
type OnDeleteItem = (id: TodoItem['id']) => void

interface TodoListProps {
  todos: TodoItem[];
  status: Status['value'];
  title: string
  onCreateItem: OnCreateItem
  onUpdateItem: OnUpdateItem
  onDeleteItem: OnDeleteItem
}

function TodoList({ title, status, todos, onCreateItem, onUpdateItem, onDeleteItem }: TodoListProps) {
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
            <TodoListItem
              {...todo}
              onUpdateItem={(item) => onUpdateItem(todo.id, item)}
              onDeleteItem={() => onDeleteItem(todo.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

interface TodoItemProps extends TodoItem {
  onUpdateItem: (item: Partial<TodoItem>) => void,
  onDeleteItem: () => void
}

function TodoListItem({ value, status, priority, assigned, onUpdateItem, onDeleteItem }: TodoItemProps) {

  const handleToggleAssigned = (userId: User['id']) => {
    console.log(assigned, userId)
    if (assigned.includes(userId)) {
      onUpdateItem({ assigned: assigned.filter(uid => uid !== userId) })
    } else {
      onUpdateItem({ assigned: [...assigned, userId] })
    }
  }

  return (
    <li className="flex gap-2">
      <TodoStatusSelect value={status} onChangeValue={status => onUpdateItem({ status })} />
      <TodoPrioritySelect value={priority} onChangeValue={priority => onUpdateItem({ priority })} />
      <ToggleableInput value={value} onChangeValue={value => onUpdateItem({ value })} onDeleteItem={onDeleteItem} />
      <TodoAssignedSelect value={assigned} onChangeValue={handleToggleAssigned} />
    </li>
  )
}


interface ToggleableInputProps { value: string, onChangeValue: (value: string) => void, onDeleteItem: () => void }

export function ToggleableInput({ value, onChangeValue, onDeleteItem }: ToggleableInputProps) {
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
    } else if ((e.key === "Backspace" || e.key === "Delete") && e.currentTarget.value === "") {
      onDeleteItem()
    }
  }

  useEffect(() => {
    if (value === "") {
      handleOpen()
    }
  }, [value])

  if (isEditing) {
    return <input className="px-2 flex border-2 rounded-lg w-full input input-sm input-bordered" onKeyUp={handleKeyUp} value={value} onChange={handleChange} autoFocus />;
  }

  return <span className="w-full h-full min-h-6" onClick={handleOpen}>{value}</span>;
}

interface TodoStatusSelectProps { value: Status['value'], onChangeValue: (value: Status['value']) => void }
function TodoStatusSelect({ value, onChangeValue }: TodoStatusSelectProps) {

  const icon = statuses.find(status => status.value === value)?.icon;

  return (
    <Dropdown trigger={<label className="btn btn-xs btn-ghost" tabIndex={0}>{icon}</label>}>
      <li className="menu-title"><span>Status</span></li>
      {statuses.map(status => (
        <li key={status.value} className={status.value === value ? "bg-base-200" : ""}>
          <a onClick={() => onChangeValue(status.value)}>
            <span>{status.icon}</span>{" "}
            {status.label}
          </a>
        </li>
      ))}
    </Dropdown>
  );
}


interface TodoPrioritySelectProps { value: Priority['value'], onChangeValue: (value: Priority['value']) => void }
function TodoPrioritySelect({ value, onChangeValue }: TodoPrioritySelectProps) {
  const icon = priorities.find(priority => priority.value === value)?.icon;

  return (
    <Dropdown trigger={<label className="btn btn-xs btn-ghost" tabIndex={0}>{icon}</label>}>
      <li className="menu-title"><span>Priority</span></li>
      {priorities.map(priority => (
        <li key={priority.value} className={priority.value === value ? "bg-base-200" : ""}>
          <a onClick={() => onChangeValue(priority.value)}>
            <span>{priority.icon}</span>{" "}
            {priority.label}
          </a>
        </li>
      ))}
    </Dropdown>
  );
}


interface TodoAssignedSelectProps { value: User['id'][], onChangeValue: (value: User['id']) => void }
function TodoAssignedSelect({ value, onChangeValue }: TodoAssignedSelectProps) {
  const initials = value.map(userId => users.find(user => user.id === userId)?.name[0]);

  return (
    <Dropdown
      className="dropdown-end"
      trigger={
        <label className="btn btn-sm py-0 btn-ghost avatar-group -space-x-4 w-28" tabIndex={0}>
          {initials.map(initial => <div className="avatar rounded-full w-8 h-8 bg-rose-200 text-slate-800 flex justify-center items-center text-center">{initial}</div>) || "👤"}
        </label>
      }
    >
      <li className="menu-title"><span>Assigned</span></li>
      {users.map(user => (
        <li key={user.id} className={value.includes(user.id) ? "bg-base-200" : ""}>
          <a onClick={() => onChangeValue(user.id)}>
            {user.name}
          </a>
        </li>
      ))}
    </Dropdown>
  );
}

interface DropdownProps extends PropsWithChildren {
  trigger: React.ReactNode
  className?: string
}

function Dropdown({ trigger, children, className }: DropdownProps) {
  return <div className={clsx("dropdown", className)}>
    {trigger}
    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 border-2 border-base-200">
      {children}
    </ul>
  </div>
}