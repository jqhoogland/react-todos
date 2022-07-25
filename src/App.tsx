import { HTMLProps, useEffect, useRef, useState } from 'react';
import { AddButton } from "./components/buttons";
import { ToggleableInput } from "./components/inputs";
import { Header, Layout } from "./components/layout";
import { defaultTodoItem, defaultTodos, Status, statuses, TodoItem } from './data';


export default function App() {
  return (
    <Layout>
      <Tasks/>
    </Layout>
  )
}

function Tasks() {
  const [todos, setTodos] = useState<TodoItem[]>(defaultTodos)

  const handleCreateItem: OnCreateItem = (value = {}) => {
    setTodos([
      ...todos,
      { id: todos.length + 1, ...defaultTodoItem, ...value, }
    ]);
  };

  const handleChangeItem: OnChangeItem = ({ id, ...value }) => {
    setTodos(todos.map(todo => todo.id !== id ? todo : { ...todo, ...value }));
  };

  const handleDeleteItem: OnDeleteItem = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      {statuses.map(status => (
        <TaskSection
          key={status.label}
          {...status}
          items={todos.filter(todo => todo.status === status.value)}
          className="flex-1"
          onCreateItem={handleCreateItem}
          onChangeItem={handleChangeItem}
          onDeleteItem={handleDeleteItem} />
      ))}
    </div>
  );
}
type OnCreateItem = (item?: Partial<TodoItem>) => void;
type OnChangeItem = (item: Omit<Partial<TodoItem>, 'id'> & { id: TodoItem['id']; }) => void;
type OnDeleteItem = (id: TodoItem['id']) => void;
type TaskSectionProps = {
  items: TodoItem[];
  onCreateItem: OnCreateItem;
  onChangeItem: OnChangeItem;
  onDeleteItem: OnDeleteItem;
} & HTMLProps<HTMLDivElement> & Status;
function TaskSection({ label, value, icon, items, onCreateItem, onChangeItem, onDeleteItem, ...props }: TaskSectionProps) {
  const handleCreateItemForSection = (item: Partial<TodoItem> = {}) => onCreateItem({ status: value, ...item });


  if (items.length === 0) {
    return <></>;
  }

  return (
    <section {...props}>
      {/* @ts-expect-error union & objects are non-transitive */}
      <TaskSectionHeader label={label} value={value} icon={icon} count={items.length} onCreateItem={handleCreateItemForSection} />
      <ul className="space-y-2 px-8">
        {items.map((item) => <TodoListItem {...item} key={item.id} onChangeItem={onChangeItem} onDeleteItem={onDeleteItem} />)}
      </ul>
    </section>
  );
}

type TaskSectionHeaderProps = {
  count: number;
  onCreateItem: OnCreateItem;
} & Status;

function TaskSectionHeader({ label, count, onCreateItem }: TaskSectionHeaderProps) {
  return (
    <Header action={<AddButton onClick={() => onCreateItem()} />}>
        <h2 className='text-xl font-bold'>{label}</h2>
        <h4>{count}</h4>
    </Header>
  );
}
      
function TodoListItem({ id, value, status,  onChangeItem, onDeleteItem }: TodoItem & { onChangeItem: OnChangeItem; onDeleteItem: OnDeleteItem; }) {
  return (
    <li className="flex">
      <span className="pr-4">
        <TodoStatusSelect id={id} value={status} onChangeValue={(status) => onChangeItem({ id, status })} />
      </span>
      <ToggleableInput onChangeValue={(value) => onChangeItem({ id, value })} value={value} onDelete={() => onDeleteItem(id)} />
    </li>
  );
}

interface TodoButton {
  id: number;
}
interface TodoStatusButtonProps extends TodoButton {
  value: Status['value'];
  onChangeValue: (status: Status['value']) => void;
}
function TodoStatusSelect({ value, onChangeValue }: TodoStatusButtonProps) {
  return (
    <select value={value} onChange={e => onChangeValue(e.target.value as Status['value'])} className="border-2 rounded-lg py-0.5">
      {statuses.map(status => (
        <option key={status.value} value={status.value}>
          <span>{status.icon}</span>{" "}
          {status.label}
        </option>
      ))}
    </select>
  );
}

