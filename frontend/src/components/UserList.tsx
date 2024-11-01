import { User } from "../types/User";
import { api } from "../api";
import UserForm from "./UserForm";
import { useEffect, useState } from "react";

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const fetchUsers = async () => {
        const response = await api.get("/users");
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        await api.delete(`/users/${id}`);
        fetchUsers();
    };

    const handleAddUser = () => {
        setEditingUser(null);
    };

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.name} - {user.email} - {user.age}
                        <button onClick={() => setEditingUser(user)}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(user._id || "")}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <UserForm
                user={editingUser ?? undefined}
                onSuccess={() => {
                    fetchUsers();
                    setEditingUser(null);
                }}
            />
        </div>
    );
};

export default UserList;
