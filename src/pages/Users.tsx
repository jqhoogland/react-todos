import autoAnimate from '@formkit/auto-animate';
import { useRef, useEffect } from 'react';
import { User, defaultUsers } from '../data';
import { ToggleableInput } from '../components/inputs';
import { AddButton } from '../components/buttons';
import { Header } from '../components/layout';
import { usePersistedState } from '../hooks';

type OnCreateUser = (user?: Partial<User>) => void;
type OnChangeUser = (user: Omit<Partial<User>, 'id'> & { id: User['id']; }) => void;
type OnDeleteUser = (id: User['id']) => void;

export default function Users() {    
    const [users, setUsers] = usePersistedState('users', defaultUsers);

    const handleCreateUser: OnCreateUser = (user) => {
        console.log("handleCreateUser", user);
        setUsers([
            ...users,
            { id: users.length + 1, name: "", ...user }
        ]);
    }
    const handleChangeUser: OnChangeUser = ({ id, ...user }) => {
        console.log("handleChangeUser", user);
        setUsers(users.map(u => u.id !== id ? u : { ...u, ...user }));
    }
    const handleDeleteUser: OnDeleteUser = (id) => {
        console.log("handleDeleteUser", id);
        setUsers(users.filter(u => u.id !== id));
    }

    return (
        <>
            <Header action={<AddButton onClick={() => handleCreateUser()} />}>
                <h1 className="text-xl font-bold">Users</h1>
            </Header>
            <UsersList users={users} onChangeUser={handleChangeUser} onDeleteUser={handleDeleteUser} />
        </>
    )
}


interface UsersListProps {
    users: User[];
    onChangeUser: OnChangeUser;
    onDeleteUser: OnDeleteUser;
}

function UsersList({ users, onChangeUser, onDeleteUser}: UsersListProps) {
    const parentRef = useRef<HTMLOListElement | null>(null);

    useEffect(() => {
        if (parentRef.current) {
          autoAnimate(parentRef.current);
        }
      }, [parent]);
  
    return (
        <ul className="flex flex-col divide-y divide-base-100" ref={parentRef}>
            {
                users.map(({ name, id }) => (
                    <li key={id} className="px-8 py-4 bg-base-200 hover:bg-base-100">
                        <div className="flex flex-row items-center">
                            <ToggleableInput
                                value={name}
                                onChangeValue={name => onChangeUser({ id, name })}
                                onDelete={() => onDeleteUser(id)} />
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}