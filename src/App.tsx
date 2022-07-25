import React, { PropsWithChildren } from 'react';
import { ChangeEventHandler, HTMLProps, useState } from 'react'
import ThemeProvider, { ThemeToggle, useTheme } from './ThemeProvider';
import { PlusIcon } from "@heroicons/react/solid";
import clsx from 'clsx';

interface TodoItem {
  id: number;
  value: string;
  completed: boolean;
  status: typeof statuses[number]['label'];
}

const statuses = [
  { label: 'In Review' },
  { label: 'In Progress' },
  { label: 'Todo' },
  { label: 'Done' },
  { label: 'Canceled' }
]



const defaultTodos = [
  { id: 0, value: 'Learn JavaScript', completed: false, status: "Done" },
  { id: 1, value: 'Learn React', completed: false, status: "In Progress" },
  { id: 2, value: 'Learn TypeScript', completed: false, status: "In Progress" },
  { id: 3, value: 'Learn React Native', completed: false, status: "Todo" },
  { id: 4, value: 'Learn GraphQL', completed: false, status: "Todo" },
  { id: 5, value: 'Learn Next.js', completed: false, status: "Todo" },
  { id: 6, value: 'Learn Node.js', completed: false, status: "Todo" },
  { id: 7, value: 'Learn MongoDB', completed: false, status: "Todo" },
  { id: 8, value: 'Learn SQL', completed: false, status: "Todo" },
  { id: 9, value: 'Learn Python', completed: false, status: "In Progress" },
  { id: 10, value: 'Learn Java', completed: false, status: "In Progress" },
  { id: 11, value: 'Learn C++', completed: false, status: "In Progress" },
  { id: 12, value: 'Learn C#', completed: false, status: "Todo" },
  { id: 13, value: 'Learn Go', completed: false, status: "Todo" },
  { id: 14, value: 'Learn Rust', completed: false, status: "Todo" },
  { id: 15, value: 'Learn Kotlin', completed: false, status: "Todo" },
  { id: 16, value: 'Learn Swift', completed: false, status: "Todo" },
  { id: 17, value: 'Learn Elixir', completed: false, status: "Todo" },
  { id: 18, value: 'Learn Ruby', completed: false, status: "Todo" },
  { id: 19, value: 'Learn PHP', completed: false, status: "Todo" },
] as TodoItem[]


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

function TaskSectionHeader ({ label, count, onCreateItem }: TaskSectionHeaderProps) {
  return (
    <header className="flex items-center gap-2 px-4 py-2 bg-base-100 justify-between">
      <span className="flex gap-2 items-baseline">
        <h2 className='text-xl font-bold'>{label}</h2>
        <h4>{count}</h4>
      </span>
      <AddButton onClick={() => onCreateItem("")}/>
    </header>
  )
}

function KanbanItemMenu({ value }: { value: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return <div className="relative">
    <IconButton onClick={() => setIsOpen(!isOpen)}>?</IconButton>
    {isOpen && (
      <div className="absolute top-0 left-0 bg-white rounded-xl p-8 shadow-xl z-10">
        <IconButton onClick={() => setIsOpen(false)}>⨉</IconButton>
        <ul>
          <li>Change Status</li>
        </ul>
      </div>
    )}
  </div>
}

function TodoItem({ value }: { value: string }) {
  return <li className="flex gap-2 pr-4"><input type="checkbox" />{value}<div className="flex-1" /><KanbanItemMenu value={value} /></li>
}

function AddTodoItem({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(value);
      setValue('');
      setIsOpen(false)
    }
  }

  if (isOpen) {
    return (
      <div className="flex gap-2 pt-2 items-center">
        <IconButton onClick={() => setIsOpen(false)}><PlusIcon/></IconButton>
        <input
          type="text"
          className="rounded-lg border-2 px-2"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    )
  }

  return (
    <div className="flex gap-2 pt-2 items-center">
      <IconButton onClick={() => setIsOpen(true)} />
    </div>
  )
}

function TaskSection({ label, items, onCreateItem, ...props }: TaskSectionProps) {
  if (items.length === 0) {
    return <></>
  }

  return (
    <div {...props}>
      <TaskSectionHeader label={label} count={items.length} onCreateItem={onCreateItem} />
      <ul className="flex flex-col">
        {items.map((item) => <TodoItem value={item.value} />)}
      </ul>
    </div>
  )
}

type IconButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'type'>

function IconButton(props: IconButtonProps) {
  return (
    <button
      {...props}
      className={clsx("btn btn-xs min-w-0 min-h-0 p-1", props?.className)}
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


  const handleCreateItem = (value: string, status: string) => {
    setTodos([
      ...todos,
      { id: todos.length + 1, value, completed: false, status }
    ]);
  }

  return (
    <div className="">
      {statuses.map(status => (
        <TaskSection
          label={status.label}
          items={todos.filter(todo => todo.status === status.label)}
          className="flex-1"
          onCreateItem={(value: string) => handleCreateItem(value, status.label)}
          key={status.label}
        />
      ))}
    </div >
  )
}

const NavBar = () => {
  return (
    <nav className="sticky-top bg-base-300 h-20 items-center flex justify-between pr-20">
      <h1 className="px-8 text-lg font-bold"><code>bit-todos</code></h1>
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
