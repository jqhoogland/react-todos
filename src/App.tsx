import { HTMLProps, useState } from 'react'

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  status: string;
}

const defaultStatuses = [
  'New',
  'In Progress',
  'Completed'
]


const defaultTodos = [
  { id: 1, title: 'Learn React', completed: false, status: "In Progress" },
  { id: 2, title: 'Learn TypeScript', completed: false, status: "In Progress" },
  { id: 3, title: 'Learn React Native', completed: false, status: "New" },
  { id: 4, title: 'Learn GraphQL', completed: false, status: "New" },
  { id: 5, title: 'Learn Next.js', completed: false, status: "New" },
  { id: 6, title: 'Learn Node.js', completed: false, status: "New" },
  { id: 7, title: 'Learn MongoDB', completed: false, status: "New" },
  { id: 8, title: 'Learn SQL', completed: false, status: "New" },
  { id: 9, title: 'Learn Python', completed: false, status: "In Progress" },
  { id: 10, title: 'Learn Java', completed: false, status: "In Progress" },
  { id: 11, title: 'Learn C++', completed: false, status: "In Progress" },
  { id: 12, title: 'Learn C#', completed: false, status: "New" },
  { id: 13, title: 'Learn Go', completed: false, status: "New" },
  { id: 14, title: 'Learn Rust', completed: false, status: "New" },
  { id: 15, title: 'Learn Kotlin', completed: false, status: "New" },
  { id: 16, title: 'Learn Swift', completed: false, status: "New" },
  { id: 17, title: 'Learn Elixir', completed: false, status: "New" },
  { id: 18, title: 'Learn Ruby', completed: false, status: "New" },
  { id: 19, title: 'Learn PHP', completed: false, status: "New" },
  { id: 20, title: 'Learn JavaScript', completed: false, status: "Completed" },
] as TodoItem[]

interface KanbanColumnProps extends HTMLProps<HTMLDivElement> {
  title: string;
  items: TodoItem[];
}

function KanbanColumnHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 pb-2">
      <input type="checkbox" />
      <h2 className='text-xl font-bold'>{title}</h2>
    </div>
  )
}

function TodoListItem({ value }: { value: string }) {
  return <li className="flex gap-2"><input type="checkbox" />{value}</li>
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

function KanbanColumn({ title, items, ...props }: KanbanColumnProps) {
  return (
    <div {...props}>
      <KanbanColumnHeader title={title} />
      <ul className="flex flex-col">
        {items.map((item) => <TodoListItem value={item.title} />)}
      </ul>
      <AddKanbanItem status={title} />
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

  const handleCreateItem = (title: string, status: string) => {
    setTodos([
      ...todos,
      { id: todos.length + 1, title, completed: false, status }
    ]);
  }

  return (
    <div className="flex">
      {statuses.map(status => (
        <KanbanColumn
          title={status}
          items={todos.filter(todo => todo.status === status)}
          key={status}
          className="flex-1"
        />
      ))}
      <div className="flex-shrink h-10">
        <AddKanbanItem onSubmit={handleCreateStatus} />
      </div>
    </div >
  )
}

function App() {
  return (
    <div>
      <nav className="sticky-top bg-stone-300 h-20 flex items-center">
        <h1 className="px-8 text-2xl font-bold"><code>react-kanban</code></h1>
      </nav>
      <main className="max-w-screen-md p-8 mx-auto">
        <Kanban />
      </main>
    </div>
  )
}

export default App
