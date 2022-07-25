import autoAnimate from "@formkit/auto-animate";
import { PlusIcon, UserIcon } from "@heroicons/react/solid";
import clsx from 'clsx';
import React, { HTMLProps, useEffect, useRef, useState } from 'react';
import { usePersistedState } from './hooks';
import ThemeProvider, { ThemeToggle } from './ThemeProvider';

const statuses = [
  { label: 'In Review', value: "in_review", icon: "🙇" },
  { label: 'In Progress', value: "in_progress", icon: "🏃" },
  { label: 'Todo', value: "todo", icon: "📥" },
  { label: 'Done', value: "done", icon: "☑️" },
  { label: 'Canceled', value: "canceled", icon: "🗑" }
] as const

type Status = typeof statuses[number];

const priorities = [
  { label: 'Urgent', value: 5, icon:"🔥" },
  { label: 'High', value: 4, icon: "🟧"},
  { label: 'Medium', value: 3 , icon: "🟨"},
  { label: 'Low', value: 2, icon: "🟩" },
  { label: 'None', value: 1, icon:"⬜️" },
] as const

type Priority = typeof priorities[number];

const users = [
  { name: "John Doe", id: 0 },
  { name: "Jane Doe", id: 1 },
]
  
type User = typeof users[number];
type UserName = User['name'];


interface TodoItem {
  id: number;
  value: string;
  completed: boolean;
  status: Status['value'];
  priority: Priority['value'];
  assigned: User['id'][]
}

const defaultTodoItem: Omit<TodoItem, "id"> = {
  value: "",
  completed: false,
  status: 'todo',
  priority: 1,
  assigned: []
}

const defaultTodos: TodoItem[] = [
  { id: 0, priority: 5, value: 'Learn JavaScript', completed: false, assigned: [], status: "done" },
  { id: 1, priority: 5, value: 'Learn React', completed: false, assigned: [], status: "in_progress" },
  { id: 2, priority: 4, value: 'Learn TypeScript', completed: false, assigned: [], status: "in_progress" },
  { id: 3, priority: 1, value: 'Learn React Native', completed: false, assigned: [], status: "todo" },
  { id: 4, priority: 1, value: 'Learn GraphQL', completed: false, assigned: [], status: "todo" },
  { id: 5, priority: 3, value: 'Learn Next.js', completed: false, assigned: [], status: "todo" },
  { id: 6, priority: 1, value: 'Learn Node.js', completed: false, assigned: [], status: "todo" },
  { id: 7, priority: 1, value: 'Learn MongoDB', completed: false, assigned: [], status: "todo" },
  { id: 8, priority: 1, value: 'Learn SQL', completed: false, assigned: [], status: "todo" },
  { id: 9, priority: 1, value: 'Learn Python', completed: false, assigned: [], status: "in_progress" },
  { id: 10, priority: 1, value: 'Learn Java', completed: false, assigned: [], status: "in_progress" },
  { id: 11, priority: 1, value: 'Learn C++', completed: false, assigned: [], status: "in_progress" },
  { id: 12, priority: 1, value: 'Learn C#', completed: false, assigned: [], status: "todo" },
  { id: 13, priority: 1, value: 'Learn Go', completed: false, assigned: [], status: "todo" },
  { id: 14, priority: 1, value: 'Learn Rust', completed: false, assigned: [], status: "todo" },
  { id: 15, priority: 1, value: 'Learn Kotlin', completed: false, assigned: [], status: "todo" },
  { id: 16, priority: 1, value: 'Learn Swift', completed: false, assigned: [], status: "todo" },
  { id: 17, priority: 1, value: 'Learn Elixir', completed: false, assigned: [], status: "todo" },
  { id: 18, priority: 1, value: 'Learn Ruby', completed: false, assigned: [], status: "todo" },
  { id: 19, priority: 1, value: 'Learn PHP', completed: false, assigned: [], status: "todo" },
]


type OnCreateItem = (item?: Partial<TodoItem>) => void;
type OnChangeItem = (item: Omit<Partial<TodoItem>, 'id'> & { id: TodoItem['id'] }) => void;
type OnDeleteItem = (id: TodoItem['id']) => void;

type TaskSectionProps = {
  items: TodoItem[];
  onCreateItem: OnCreateItem;
  onChangeItem: OnChangeItem;
  onDeleteItem: OnDeleteItem;
} & HTMLProps<HTMLDivElement> & Status;

type TaskSectionHeaderProps = {
  count: number;
  onCreateItem: OnCreateItem
} & Status;

function TaskSectionHeader({ label, count, onCreateItem }: TaskSectionHeaderProps) {
  return (
    <header className="flex items-center gap-2 px-4 py-2 bg-base-100 justify-between">
      <span className="flex gap-2 items-baseline">
        <h2 className='text-xl font-bold'>{label}</h2>
        <h4>{count}</h4>
      </span>
      <AddButton onClick={() => onCreateItem()} />
    </header>
  )
}

interface IconButtonWithDropdownProps extends HTMLProps<HTMLDivElement> {
  trigger: React.ReactNode,
}

function IconButtonWithDropdown({ children, trigger, ...props }: IconButtonWithDropdownProps) {
  return (
    <div {...props} className={clsx("dropdown", props?.className)}>
      {trigger}
      <ul tabIndex={0} className="dropdown-content menu p-2 bg-base-100 rounded-box w-52 opacity-100 hover:opacity-100 border-2 border-base-300 shadow-lg">
        {children}
      </ul>
    </div>  
  )
}

interface TodoButton {
  id: number
}

interface TodoStatusButtonProps extends TodoButton {
  value: Status['value'];
  onChangeValue: (status: Status['value']) => void;
}

function TodoStatusButton({ value, onChangeValue }: TodoStatusButtonProps) {
  return (
    <IconButtonWithDropdown trigger={<IconButton tabIndex={0}><div className="checkbox checkbox-xs" /></IconButton>}>
      <li className="menu-title pt-2">
        <span>Status</span>
      </li>

      {statuses.map(status => (
        <li key={status.value}>
          <button className={clsx("flex items-center p-2", value === status.value && "bg-base-300")} onClick={() => onChangeValue(status.value)}>
            <span>{status.icon}</span>
            {status.label}
          </button>
        </li>
      ))}              
    </IconButtonWithDropdown>
  )
}

interface TodoPriorityButtonProps extends TodoButton {
  value: Priority['value'];
  onChangeValue: (priority: Priority['value']) => void;
}

function TodoPriorityButton({ id, value,onChangeValue }: TodoPriorityButtonProps) {
  const icon = React.useMemo(() => {
    return priorities.find(s => s.value === value)?.icon
  }, [value])

  return (
    <IconButtonWithDropdown trigger={<IconButton tabIndex={0}>{icon}</IconButton>}>
      <li className="menu-title pt-2">
        <span>Priority</span>
      </li>

      {priorities.map(priority => (
        <li key={priority.value}>
          <button className={clsx("flex items-center p-2", value === priority.value && "bg-base-300")} onClick={() => onChangeValue(priority.value)}>
            <span>{priority.icon}</span>
            {priority.label}
          </button>
        </li>
      ))}   
    </IconButtonWithDropdown>
  )
}

function ProfilePicture({ id, name, className="w-6 h-6"}: User & Omit<HTMLProps<HTMLDivElement>, "id">) {
  const initials = name.split(' ').map(s => s[0]).join('').toUpperCase();
  
  return (
    <div className={clsx("avatar rounded-full bg-rose-200 text-xs text-slate-800 flex place-items-center", className)}>
      <span className='w-full text-center'>{initials}</span>
    </div>
  )
}


interface TodoAssignButtonProps extends TodoButton {
  value: User['id'][];
  onChangeValue: (assigned: User['id'][]) => void;
}

function TodoAssignButton({ value, onChangeValue }: TodoAssignButtonProps) {
  const trigger = React.useMemo(() => {
    if (value.length === 0) {
      return <IconButton tabIndex={0}><UserIcon /></IconButton>
    }
    const assignedUsers = users.filter(user => value.includes(user.id))

    return (
      <button className="btn btn-ghost btn-sm p-0 avatar-group -space-x-4">
        {assignedUsers.map(user => (
          <ProfilePicture key={user.id} {...user} className="w-8 h-8"/>
        ))}
      </button>
    )
  }, [value])
  
  const handleToggle = (userId: User['id']) => {
    if (value.includes(userId)) {
      onChangeValue(value.filter(id => id !== userId));
    } else {
      onChangeValue([...value, userId]);
    }
  }

  return (
    <IconButtonWithDropdown trigger={trigger} className="dropdown-bottom dropdown-end">
      <li className="menu-title pt-2">
        <span>Assigned</span>
      </li>

      {users.map(user => (
        <li key={user.id}>
          <button className={clsx("flex items-center p-2", value.includes(user.id) && "bg-base-300")} onClick={() => handleToggle(user.id)}>
            <ProfilePicture {...user}  />
            {user.name}
          </button>
        </li>
      ))} 
    </IconButtonWithDropdown>
  )
}

interface EditableViewProps  { value: string, onChangeValue: (value: string) => void , onDelete: () => void}

function EditableValue({ value, onChangeValue, onDelete }: EditableViewProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'Escape') {
      setIsEditing(false)
    } else if ((e.code === 'Backspace' || e.code === "Delete") && e.target.value === '') {
      onDelete()
    }
  }
  const handleOpen = () => {
    setIsEditing(true)
  }

  React.useEffect(() => {
    if (value === "") {
      handleOpen()
    }
  }, [value])

  React.useEffect(() => {
    if (isEditing) {
      ref.current?.focus()
    }
  }, [isEditing])

  if (isEditing) {
    return <input ref={ref} className="input input-bordered input-sm w-full" defaultValue={value} onChange={handleChange} onKeyDown={handleKeyDown} />
  }

return <span className="w-full h-full min-h-6" onClick={handleOpen}>{value}</span>
}

function TodoListItem({ id, value, status, priority, assigned, onChangeItem, onDeleteItem }: TodoItem & { onChangeItem : OnChangeItem, onDeleteItem: OnDeleteItem}) {
  return (
    <li className="flex gap-2 px-4 py-2 justify-between bg-base-200 hover:bg-base-100 items-baseline">
      <span className="flex flex-row items-baseline gap-2 flex-1">
        <div className="top-1 relative"><TodoStatusButton id={id} value={status} onChangeValue={(status) => onChangeItem({ id, status })} /></div>
        <TodoPriorityButton id={id} value={priority} onChangeValue={(priority) => onChangeItem({ id, priority })} />
        <EditableValue onChangeValue={(value) => onChangeItem({ id, value })} value={value} onDelete={() => onDeleteItem(id)} />
      </span>
      <TodoAssignButton id={id} value={assigned} onChangeValue={(assigned) => onChangeItem({ id, assigned })} />
    </li>
  )
}


function TaskSection({ label, value, icon, items, onCreateItem, onChangeItem, onDeleteItem, ...props }: TaskSectionProps) {
  const parentRef = useRef<HTMLOListElement | null>(null);
  const handleCreateItemForSection = (item: Partial<TodoItem> ={}) => onCreateItem({ status: value, ...item });

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current)
    } 
  }, [parent])

  const orderedItems = React.useMemo(() => {
    return items.sort((a, b) => b.priority - a.priority)
  }, [items])

  if (items.length === 0) {
    return <></>
  }

  return (
    <div {...props}>
      {/* @ts-expect-error union & objects are non-transitive */}
      <TaskSectionHeader label={label} value={value} icon={icon} count={items.length} onCreateItem={handleCreateItemForSection} />
      <ul className="flex flex-col divide-y divide-base-100" ref={parentRef}>
        {orderedItems.map((item) => <TodoListItem {...item} key={item.id} onChangeItem={onChangeItem} onDeleteItem={onDeleteItem} />)}
      </ul>
    </div>
  )
}

type IconButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'type'> & { Component?: string | React.ComponentType<Omit<IconButtonProps, "Component">>}

function IconButton({ className, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={clsx("btn btn-xs btn-ghost min-w-0 min-h-0 w-6 h-6 p-1", className)}
    />
  )
}

function AddButton(props: IconButtonProps) {
  return (
    <IconButton {...props}>
      <PlusIcon className="text-slate-100 h-4 w-4" />
    </IconButton>
  )
}


function TaskSections() {
  const [todos, setTodos] = usePersistedState('todos', defaultTodos);

  const handleCreateItem: OnCreateItem = (value= {}) => {
    setTodos([
      ...todos,
      { id: todos.length + 1, ...defaultTodoItem, ...value,}
    ]);
  }

  const handleChangeItem: OnChangeItem = ({id, ...value}) => {
    setTodos(todos.map(todo => todo.id !== id ? todo : {...todo, ...value}))
  }

  const handleDeleteItem: OnDeleteItem = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="">
      {statuses.map(status => (
        <TaskSection
          key={status.label}
          {...status}
          items={todos.filter(todo => todo.status === status.value)}
          className="flex-1"
          onCreateItem={handleCreateItem}
          onChangeItem={handleChangeItem}
          onDeleteItem={handleDeleteItem}
        />
      ))}
    </div >
  )
}

const NavBar = () => {
  return (
    <nav className="fixed w-full bg-base-300 h-20 items-center flex justify-between px-8 z-50">
      <h1 className="text-lg font-bold"><code>bit-todos</code></h1>
      <ThemeToggle />
    </nav>
  )
}
function App() {
  return (
    <ThemeProvider>
      <NavBar />
      <main className="bg-base-200 min-h-screen h-full pt-20">
        <TaskSections />
      </main>
    </ThemeProvider>
  )
}

export default App
