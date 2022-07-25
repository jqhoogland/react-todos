import React, { PropsWithChildren } from 'react';
import { ChangeEventHandler, HTMLProps, useState } from 'react'
import { ThemeToggle, useTheme } from './ThemeProvider';

interface TodoItem {
  id: number;
  value: string;
  completed: boolean;
  status: string;
}

const defaultStatuses = [
  'New',
  'In Progress',
  'Completed'
]


const defaultTodos = [
  { id: 0, value: 'Learn JavaScript', completed: false, status: "Completed" },
  { id: 1, value: 'Learn React', completed: false, status: "In Progress" },
  { id: 2, value: 'Learn TypeScript', completed: false, status: "In Progress" },
  { id: 3, value: 'Learn React Native', completed: false, status: "New" },
  { id: 4, value: 'Learn GraphQL', completed: false, status: "New" },
  { id: 5, value: 'Learn Next.js', completed: false, status: "New" },
  { id: 6, value: 'Learn Node.js', completed: false, status: "New" },
  { id: 7, value: 'Learn MongoDB', completed: false, status: "New" },
  { id: 8, value: 'Learn SQL', completed: false, status: "New" },
  { id: 9, value: 'Learn Python', completed: false, status: "In Progress" },
  { id: 10, value: 'Learn Java', completed: false, status: "In Progress" },
  { id: 11, value: 'Learn C++', completed: false, status: "In Progress" },
  { id: 12, value: 'Learn C#', completed: false, status: "New" },
  { id: 13, value: 'Learn Go', completed: false, status: "New" },
  { id: 14, value: 'Learn Rust', completed: false, status: "New" },
  { id: 15, value: 'Learn Kotlin', completed: false, status: "New" },
  { id: 16, value: 'Learn Swift', completed: false, status: "New" },
  { id: 17, value: 'Learn Elixir', completed: false, status: "New" },
  { id: 18, value: 'Learn Ruby', completed: false, status: "New" },
  { id: 19, value: 'Learn PHP', completed: false, status: "New" },
] as TodoItem[]

interface KanbanColumnProps extends HTMLProps<HTMLDivElement> {
  status: string;
  items: TodoItem[];
  onCreateItem: (item: string) => void;
}

function KanbanColumnHeader({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-2 pb-2">
      <input type="checkbox" />
      <h2 className='text-xl font-bold'>{status}</h2>
    </div>
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

function KanbanItem({ value }: { value: string }) {
  return <li className="flex gap-2 pr-4"><input type="checkbox" />{value}<div className="flex-1" /><KanbanItemMenu value={value} /></li>
}

function AddKanbanItem({ onSubmit }: { onSubmit: (value: string) => void }) {
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
        <IconButton onClick={() => setIsOpen(false)}>⨉</IconButton>
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

function KanbanColumn({ status, items, onCreateItem, ...props }: KanbanColumnProps) {
  return (
    <div {...props}>
      <KanbanColumnHeader status={status} />
      <ul className="flex flex-col">
        {items.map((item) => <KanbanItem value={item.value} />)}
      </ul>
      <AddKanbanItem onSubmit={(item) => onCreateItem(item)} />
    </div>
  )
}

function IconButton({ children = '+', ...props }: HTMLProps<HTMLButtonElement>) {
  return (
    <button

      {...props}
      className="hover:bg-stone-200 active:bg-stone-300 text-gray-500 rounded-sm w-[13px] h-[13px] leading-[0] pb-[0.2rem]"
    >
      {children}
    </button>
  )
}


function Kanban() {
  const [statuses, setStatuses] = useState(defaultStatuses);
  const [todos, setTodos] = useState(defaultTodos);

  const handleCreateStatus = (status: string) => {
    setStatuses([...statuses, status]);
  }

  const handleCreateItem = (value: string, status: string) => {
    setTodos([
      ...todos,
      { id: todos.length + 1, value, completed: false, status }
    ]);
    console.log({ id: todos.length + 1, value, completed: false, status })
  }

  return (
    <div className="flex">
      {statuses.map(status => (
        <KanbanColumn
          status={status}
          items={todos.filter(todo => todo.status === status)}
          key={status}
          className="flex-1"
          onCreateItem={(value: string) => handleCreateItem(value, status)}
        />
      ))}
      <div className="flex-shrink h-10">
        <AddKanbanItem onSubmit={handleCreateStatus} />
      </div>
    </div >
  )
}

const NavBar = () => {
  const { isDarkMode, toggleMode} = useTheme();

  return (
    <nav className="sticky-top bg-stone-300 h-20 flex items-center flex justify-between pr-20">
      <h1 className="px-8 text-lg font-bold"><code>bit-todos</code></h1>
      <ThemeToggle />
    </nav>
  )
}
function App() {
  return (
    <div>
      <NavBar />
      <main className="max-w-screen-md p-8 mx-auto">
        <Kanban />
      </main>
    </div>
  )
}

export default App
