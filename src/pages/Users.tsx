import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Dropdown, Header } from "../components/layouts";
import { TodoItem, User } from "../data";
import { useListMethods, usePersistedState } from "../hooks";
import { ToggleableInput } from "../components/inputs";


type OnCreateItem = (item?: Partial<TodoItem>) => void
type OnUpdateItem = (id: TodoItem['id'], item: Partial<TodoItem>) => void;
type OnDeleteItem = (id: TodoItem['id']) => void

const useUsers = () => {
  const [users, setAndSaveUsers] = usePersistedState<User[]>('users', [])
  const { create, update, remove } = useListMethods(users, setAndSaveUsers)

  const handleCreateUser: OnCreateItem = (item = {}) => {
    create({ name: "", ...item })
  }

  return { users, setAndSaveUsers, handleCreateUser, handleUpdateUser: update, handleDeleteUser: remove }
}


function Tasks() {
  const {users, handleCreateUser, handleUpdateUser, handleDeleteUser} = useUsers()
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
    <ToggleableInput value={name} onChangeValue={console.log} onDelete={console.log} />
  )
}