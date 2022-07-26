import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Dropdown, Header } from "../components/layouts";
import { defaultTodoItem, defaultTodos, priorities, Priority, Status, statuses, TodoItem, User } from "../data";
import { useListMethods, usePersistedState } from "../hooks";
import { ToggleableInput } from "../components/inputs";
import { Link } from "react-router-dom";
import { useUsers } from "./Users";
import { useCallback, useMemo } from "react";


const useTodos = () => {
  const [todos, setAndSaveTodos] = usePersistedState<TodoItem[]>('todos', defaultTodos)
  const { create, update, remove } = useListMethods(todos, setAndSaveTodos)

  const handleCreateItem: OnCreateItem = useCallback((item = {}) => {
    create({ ...defaultTodoItem, ...item })
  }, [create])

  return { todos, setAndSaveTodos, handleCreateItem, handleUpdateItem: update, handleDeleteItem: remove }
}


export default function Tasks() {
  console.log("Render Tasks", new Date().getTime());
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

function TodoList({ title, status, todos, onCreateItem, ...props }: TodoListProps) {
  console.log("Render TodoList", new Date().getTime());

  const [parentRef] = useAutoAnimate<HTMLUListElement>()

  const handleCreateItem = useCallback(
    () => onCreateItem({ status }),
    [onCreateItem, status]
  )
  const orderedTodos = useMemo(() => todos.sort((a, b) => b.priority - a.priority), [todos]);

  return (
    <section>
      <Header action={
        <button onClick={handleCreateItem} className="btn btn-xs btn-ghost">+</button>
      }>
        <h2 className="text-xl font-bold">{title}</h2>
      </Header>
      <ul className="space-y-2 p-4" ref={parentRef}>
        {orderedTodos.map(todo => (
          <TodoListItem
            {...todo}
            {...props}
            key={todo.id}
          />
        ))}
      </ul>
    </section>
  )
}

interface TodoItemProps extends TodoItem {
  onUpdateItem: OnUpdateItem
  onDeleteItem: OnDeleteItem
}

function TodoListItem({ id, value, status, priority, assigned, onUpdateItem, onDeleteItem }: TodoItemProps) {
  console.log("Render TodoListItem", new Date().getTime());

  // Memoization is required because it's passed down
  const handleChangeStatus = useCallback((status: Status['value']) => onUpdateItem(id, { status }), [onUpdateItem]);
  const handleChangePriority = useCallback((priority: Priority['value']) => onUpdateItem(id, { priority }), [onUpdateItem]);
  const handleChangeText = useCallback((value: string) => onUpdateItem(id, { value }), [onUpdateItem]);
  const handleToggleAssigned = useCallback((userId: User['id']) => {
    if (assigned.includes(userId)) {
      onUpdateItem(id, { assigned: assigned.filter(uid => uid !== userId) })
    } else {
      onUpdateItem(id, { assigned: [...assigned, userId] })
    }
  }, [assigned, onUpdateItem])
  const handleDelete = useCallback(() => onDeleteItem(id), [onDeleteItem, id])

  return (
    <li className="flex gap-2">
      <TodoStatusSelect value={status} onChangeValue={handleChangeStatus} />
      <TodoPrioritySelect value={priority} onChangeValue={handleChangePriority} />
      <ToggleableInput value={value} onChangeValue={handleChangeText} onDelete={handleDelete} />
      <TodoAssignedSelect value={assigned} onChangeValue={handleToggleAssigned} />
    </li>
  )
}


interface TodoStatusSelectProps { value: Status['value'], onChangeValue: (value: Status['value']) => void }
function TodoStatusSelect({ value, onChangeValue }: TodoStatusSelectProps) {
  console.log("Render TodoStatusSelect", new Date().getTime());

  // Memoization isn't necessary because strings are compared by value
  const icon = statuses.find(status => status.value === value)?.icon;

  return (
    <Dropdown trigger={<label className="btn btn-xs btn-ghost" tabIndex={0}>{icon}</label>}>
      <li className="menu-title"><span>Status</span></li>
      {statuses.map(status => (
        <TodoStatusItem {...status} key={status.value} selected={status.value === value} onChangeValue={onChangeValue} />
      ))}
    </Dropdown>
  );
}

function TodoStatusItem({ icon, label, value, selected, onChangeValue }: { icon: string, label: string, value: Status['value'], onChangeValue: (value: Status['value']) => void, selected: boolean }) {
  console.log("Render TodoStatusItem", new Date().getTime());

  const handleToggle = useCallback(() => onChangeValue(value), [onChangeValue, value])

  return (
    <li key={value} className={selected ? "bg-base-200" : ""}>
      <a onClick={handleToggle}>
        <span>{icon}</span>{" "}
        {label}
      </a>
    </li>
  )
}


interface TodoPrioritySelectProps { value: Priority['value'], onChangeValue: (value: Priority['value']) => void }
function TodoPrioritySelect({ value, onChangeValue }: TodoPrioritySelectProps) {
  console.log("Render TodoPrioritySelect", new Date().getTime());

  // Memoization isn't necessary because strings are compared by value
  const icon = priorities.find(priority => priority.value === value)?.icon;

  return (
    <Dropdown trigger={<label className="btn btn-xs btn-ghost" tabIndex={0}>{icon}</label>}>
      <li className="menu-title"><span>Priority</span></li>
      {priorities.map(priority => (
        <TodoPriorityItem {...priority} key={priority.value} selected={priority.value === value} onChangeValue={onChangeValue} />
      ))}
    </Dropdown>
  );
}
  
function TodoPriorityItem({ icon, label, value, selected, onChangeValue }: { icon: string, label: string, value: Priority['value'], onChangeValue: (value: Priority['value']) => void, selected: boolean }) {
  const handleToggle = useCallback(() => onChangeValue(value), [onChangeValue, value])

  return (
    <li key={value} className={value === value ? "bg-base-200" : ""}>
      <a onClick={handleToggle}>
        <span>{icon}</span>{" "}
        {label}
      </a>
    </li>
  )
}

interface TodoAssignedSelectProps { value: User['id'][], onChangeValue: (value: User['id']) => void }
function TodoAssignedSelect({ value, onChangeValue }: TodoAssignedSelectProps) {
  console.log("Render TodoAssignedSelect", new Date().getTime());
  const { users } = useUsers()

  // Memoization is necessary because arrays are compared by reference
  const initials = useMemo(() => value.map(userId => users.find(user => user.id === userId)?.name[0]), [value]);

  return (
    <Dropdown
      className="dropdown-end"
      trigger={
        <label className="btn btn-sm py-0 btn-ghost avatar-group -space-x-4 w-28" tabIndex={0}>
          {initials.length === 0 && <span className="text-gray-500">None</span>}
          {initials.map(initial => <div className="avatar rounded-full w-8 h-8 bg-rose-200 text-slate-800 flex justify-center items-center text-center">{initial}</div>)}
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
      <li>
        <Link to="/users" className="uppercase font-bold text-xs">
          Edit Users
        </Link>
      </li>
    </Dropdown>
  );
}

