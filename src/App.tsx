import React, { PropsWithChildren } from 'react';
import { ChangeEventHandler, HTMLProps, useState } from 'react'
import ThemeProvider, { ThemeToggle, useTheme } from './ThemeProvider';
import { PlusIcon, UserIcon } from "@heroicons/react/solid";
import clsx from 'clsx';

const statuses = [
  { label: 'In Review', value: "in_review", icon: "🙇" },
  { label: 'In Progress', value: "in_progress", icon: "🏃" },
  { label: 'Todo', value: "todo", icon: "📥" },
  { label: 'Done', value: "done", icon: "☑️" },
  { label: 'Canceled', value: "canceled", icon: "🗑" }
] as const

type Status = typeof statuses[number];
type StatusLabel = Status['label'];
type StatusValue = Status['value'];

const priorities = [
  { label: 'Urgent', value: "urgent", icon:"🔥" },
  { label: 'High', value: "high", icon: "🟧"},
  { label: 'Medium', value: "medium" , icon: "🟨"},
  { label: 'Low', value: "low", icon: "🟩" },
  { label: 'None', value: "none", icon:"⬜️" },
] as const

type Priority = typeof priorities[number];
type PriorityLabel = Priority['label'];
type PriorityValue = Priority['value'];



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
  status: StatusValue;
  priority: PriorityValue;
  assigned: User['id'][]
}

const defaultTodoItem: Omit<TodoItem, "id"> = {
  value: "",
  completed: false,
  status: 'todo',
  priority: 'none',
  assigned: []
}

const defaultTodos: TodoItem[] = [
  { id: 0, priority: 'none', value: 'Learn JavaScript', completed: false, assigned: [], status: "done" },
  { id: 1, priority: 'none', value: 'Learn React', completed: false, assigned: [], status: "in_progress" },
  { id: 2, priority: 'none', value: 'Learn TypeScript', completed: false, assigned: [], status: "in_progress" },
  { id: 3, priority: 'none', value: 'Learn React Native', completed: false, assigned: [], status: "todo" },
  { id: 4, priority: 'none', value: 'Learn GraphQL', completed: false, assigned: [], status: "todo" },
  { id: 5, priority: 'none', value: 'Learn Next.js', completed: false, assigned: [], status: "todo" },
  { id: 6, priority: 'none', value: 'Learn Node.js', completed: false, assigned: [], status: "todo" },
  { id: 7, priority: 'none', value: 'Learn MongoDB', completed: false, assigned: [], status: "todo" },
  { id: 8, priority: 'none', value: 'Learn SQL', completed: false, assigned: [], status: "todo" },
  { id: 9, priority: 'none', value: 'Learn Python', completed: false, assigned: [], status: "in_progress" },
  { id: 10, priority: 'none', value: 'Learn Java', completed: false, assigned: [], status: "in_progress" },
  { id: 11, priority: 'none', value: 'Learn C++', completed: false, assigned: [], status: "in_progress" },
  { id: 12, priority: 'none', value: 'Learn C#', completed: false, assigned: [], status: "todo" },
  { id: 13, priority: 'none', value: 'Learn Go', completed: false, assigned: [], status: "todo" },
  { id: 14, priority: 'none', value: 'Learn Rust', completed: false, assigned: [], status: "todo" },
  { id: 15, priority: 'none', value: 'Learn Kotlin', completed: false, assigned: [], status: "todo" },
  { id: 16, priority: 'none', value: 'Learn Swift', completed: false, assigned: [], status: "todo" },
  { id: 17, priority: 'none', value: 'Learn Elixir', completed: false, assigned: [], status: "todo" },
  { id: 18, priority: 'none', value: 'Learn Ruby', completed: false, assigned: [], status: "todo" },
  { id: 19, priority: 'none', value: 'Learn PHP', completed: false, assigned: [], status: "todo" },
]


type OnCreateItem = (item: string) => void;
interface TaskSectionProps extends HTMLProps<HTMLDivElement> {
  label: string;
  items: TodoItem[];
  onCreateItem: OnCreateItem
}

interface TaskSectionHeaderProps {
  label: string;
  count: number;
  onCreateItem: OnCreateItem
}

function TaskSectionHeader({ label, count, onCreateItem }: TaskSectionHeaderProps) {
  return (
    <header className="flex items-center gap-2 px-4 py-2 bg-base-100 justify-between">
      <span className="flex gap-2 items-baseline">
        <h2 className='text-xl font-bold'>{label}</h2>
        <h4>{count}</h4>
      </span>
      <AddButton onClick={() => onCreateItem("")} />
    </header>
  )
}

interface IconButtonWithDropdownProps extends HTMLProps<HTMLDivElement> {
  icon: React.ReactNode,
}

function IconButtonWithDropdown({ children, icon, ...props }: IconButtonWithDropdownProps) {
  return (
    <div {...props} className={clsx("dropdown", props?.className)}>
      <IconButton tabIndex={0}>{icon}</IconButton>
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
  value: StatusValue;
}

function TodoStatusButton({ id, value }: TodoStatusButtonProps) {
  return (
    <IconButtonWithDropdown icon={<div className="checkbox checkbox-xs" />}>
      <li className="menu-title pt-2">
        <span>Status</span>
      </li>

      {statuses.map(status => (
        <li key={status.value}>
          <button className={clsx("flex items-center p-2", value === status.value && "bg-base-300")} onClick={() => console.log(status.value)}>
            <span>{status.icon}</span>
            {status.label}
          </button>
        </li>
      ))}              
    </IconButtonWithDropdown>
  )
}

interface TodoPriorityButtonProps extends TodoButton {
  value: PriorityValue;
}

function TodoPriorityButton({ id, value }: TodoPriorityButtonProps) {
  const icon = React.useMemo(() => {
    return priorities.find(s => s.value === value)?.icon
  }, [value])

  return (
    <IconButtonWithDropdown icon={icon}>
      <li className="menu-title pt-2">
        <span>Priority</span>
      </li>

      {priorities.map(priority => (
        <li key={priority.value}>
          <button className={clsx("flex items-center p-2", value === priority.value && "bg-base-300")} onClick={() => console.log(priority.value)}>
            <span>{priority.icon}</span>
            {priority.label}
          </button>
        </li>
      ))}   
    </IconButtonWithDropdown>
  )
}

interface TodoAssignButtonProps extends TodoButton {
  value: User['id'][];
}

function ProfilePicture({ id, name }: User) {
  const initials = name.split(' ').map(s => s[0]).join('').toUpperCase();

  return (
    <div className="rounded-full w-6 h-6 bg-rose-200 text-xs text-slate-800 pt-1">
      {initials}
    </div>
  )
}


function TodoAssignButton({ value }: TodoAssignButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IconButtonWithDropdown icon={<UserIcon/>} className="dropdown-left">
      <li className="menu-title pt-2">
        <span>Assigned</span>
      </li>

      {users.map(user => (
        <li key={user.id}>
          <button className={clsx("flex items-center p-2", value.includes(user.id) && "bg-base-300")} onClick={() => console.log(user.value)}>
            <ProfilePicture {...user}  />
            {user.name}
          </button>
        </li>
      ))} 
    </IconButtonWithDropdown>
  )
}


function TodoListItem({ id, value, status, priority, assigned }: TodoItem) {
  return (
    <li className="flex gap-2 px-4 py-2 justify-between bg-base-200 hover:bg-base-100 items-baseline">
      <span className="flex flex-row items-baseline gap-2">
        <div className="top-1 relative"><TodoStatusButton id={id} value={status} /></div>
        <TodoPriorityButton id={id} value={priority} />
        {value}
      </span>
      <TodoAssignButton id={id} value={assigned} />
    </li>
  )
}


function TaskSection({ label, items, onCreateItem, ...props }: TaskSectionProps) {
  if (items.length === 0) {
    return <></>
  }

  return (
    <div {...props}>
      <TaskSectionHeader label={label} count={items.length} onCreateItem={onCreateItem} />
      <ul className="flex flex-col divide-y divide-base-100">
        {items.map((item) => <TodoListItem {...item} key={item.id} />)}
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
  const [todos, setTodos] = useState(defaultTodos);

  const handleCreateItem = (value: Partial<TodoItem>) => {
    setTodos([
      ...todos,
      { id: todos.length + 1, ...defaultTodoItem, ...value,}
    ]);
  }

  return (
    <div className="">
      {statuses.map(status => (
        <TaskSection
          label={status.label}
          items={todos.filter(todo => todo.status === status.value)}
          className="flex-1"
          onCreateItem={(value: string) => handleCreateItem({value})}
          key={status.label}
        />
      ))}
    </div >
  )
}

const NavBar = () => {
  return (
    <nav className="sticky-top bg-base-300 h-20 items-center flex justify-between px-8">
      <h1 className="text-lg font-bold"><code>bit-todos</code></h1>
      <ThemeToggle />
    </nav>
  )
}
function App() {
  return (
    <ThemeProvider>
      <NavBar />
      <main className="bg-base-200 min-h-screen">
        <TaskSections />
      </main>
    </ThemeProvider>
  )
}

export default App
