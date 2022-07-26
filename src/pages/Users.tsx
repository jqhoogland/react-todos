import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Dropdown, Header } from "../components/layouts";
import { defaultTodoItem, defaultTodos, priorities, Priority, Status, statuses, TodoItem, User, users } from "../data";
import { useListMethods, usePersistedState } from "../hooks";
import { ToggleableInput } from "../components/inputs";


type OnCreateItem = (item?: Partial<TodoItem>) => void
type OnUpdateItem = (id: TodoItem['id'], item: Partial<TodoItem>) => void;
type OnDeleteItem = (id: TodoItem['id']) => void


function Tasks() {
  // const { todos, handleCreateItem, handleUpdateItem, handleDeleteItem } = useTodos()
  const [parentRef] = useAutoAnimate<HTMLUListElement>()

  return (
    <section>
    <Header action={
      <button onClick={console.log} className="btn btn-xs btn-ghost">+</button>
    }>
      <h2 className="text-xl font-bold">Users</h2>
    </Header>
    <ul className="space-y-2 p-4" ref={parentRef}>
      {users.map(user => (
        <li key={user.id}>
          <UserItem {...user} />
        </li>
      ))}
    </ul>
  </section>
  )
}

export default Tasks;


function UserItem({name, }: User) {
  return (
    <>
      {name}
    </>
  )
}