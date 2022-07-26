import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Dropdown, Header } from "../components/layouts";
import { defaultUsers, TodoItem, User } from "../data";
import { useListMethods, usePersistedState } from "../hooks";
import { ToggleableInput } from "../components/inputs";


type OnCreateItem = (item?: Partial<TodoItem>) => void
type OnUpdateItem = (id: TodoItem['id'], item: Partial<TodoItem>) => void;
type OnDeleteItem = (id: TodoItem['id']) => void

export const useUsers = () => {
  const [users, setAndSaveUsers] = usePersistedState<User[]>('users', defaultUsers)
  const { create, update, remove } = useListMethods(users, setAndSaveUsers)

  const handleCreateUser: OnCreateItem = () => {
    create({ name: "" })
  }

  return { users, setAndSaveUsers, handleCreateUser, handleUpdateUser: update, handleDeleteUser: remove }
}


function Tasks() {
  const {users, handleCreateUser, handleUpdateUser, handleDeleteUser} = useUsers()
  const [parentRef] = useAutoAnimate<HTMLUListElement>()

  return (
    <section>
      <Header action={
        <button onClick={() => handleCreateUser()} className="btn btn-xs btn-ghost">+</button>
      }>
        <h2 className="text-xl font-bold">Users</h2>
      </Header>
      <ul className="space-y-2 p-4" ref={parentRef}>
        {users.map(user => (
          <li key={user.id}>
            <UserItem
              {...user}
              onChangeName={(name) => handleUpdateUser(user.id, { name })}
              onDelete={() => handleDeleteUser(user.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Tasks;


interface UserItemProps extends User {
  onChangeName: (name: string) => void
  onDelete: () => void
}

function UserItem({name, onChangeName, onDelete }: UserItemProps) {
  return (
    <ToggleableInput value={name} onChangeValue={onChangeName} onDelete={onDelete} />
  )
}