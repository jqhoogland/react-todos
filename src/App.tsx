import autoAnimate from "@formkit/auto-animate";
import { UserIcon } from "@heroicons/react/solid";
import clsx from 'clsx';
import React, { HTMLProps, useEffect, useRef, useState } from 'react';
import { AddButton, IconButton, IconButtonWithDropdown } from "./components/buttons";
import { Layout } from "./components/layout";
import ThemeProvider from './components/ThemeProvider';
import { defaultTodoItem, defaultTodos, priorities, Priority, Status, statuses, TodoItem, User, users } from "./data";
import { usePersistedState } from './hooks';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <TaskSections />
      </Layout>
    </ThemeProvider>
  )
}

export default App


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

type OnCreateItem = (item?: Partial<TodoItem>) => void;
type OnChangeItem = (item: Omit<Partial<TodoItem>, 'id'> & { id: TodoItem['id'] }) => void;
type OnDeleteItem = (id: TodoItem['id']) => void;

type TaskSectionProps = {
  items: TodoItem[];
  onCreateItem: OnCreateItem;
  onChangeItem: OnChangeItem;
  onDeleteItem: OnDeleteItem;
} & HTMLProps<HTMLDivElement> & Status;

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
    <section {...props}>
      {/* @ts-expect-error union & objects are non-transitive */}
      <TaskSectionHeader label={label} value={value} icon={icon} count={items.length} onCreateItem={handleCreateItemForSection} />
      <ul className="flex flex-col divide-y divide-base-100" ref={parentRef}>
        {orderedItems.map((item) => <TodoListItem {...item} key={item.id} onChangeItem={onChangeItem} onDeleteItem={onDeleteItem} />)}
      </ul>
    </section>
  )
}


type TaskSectionHeaderProps = {
  count: number;
  onCreateItem: OnCreateItem
} & Status;

function TaskSectionHeader({ label, count, onCreateItem }: TaskSectionHeaderProps) {
  return (
    <header className="flex items-center gap-2 px-4 py-2 bg-base-100 justify-between sticky top-20 z-10">
      <span className="flex gap-2 items-baseline">
        <h2 className='text-xl font-bold'>{label}</h2>
        <h4>{count}</h4>
      </span>
      <AddButton onClick={() => onCreateItem()} />
    </header>
  )
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

