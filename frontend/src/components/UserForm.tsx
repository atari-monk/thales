import { useState } from "react";
import { User } from "../types/User";
import { api } from "../api";

type UserFormProps = {
    user?: User;
    onSuccess: () => void;
};

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess }) => {
    const [formData, setFormData] = useState<User>(
        user || { name: "", email: "", age: 0 }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "age" ? Number(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            await api.put(`/users/${user._id}`, formData);
        } else {
            await api.post("/users", formData);
        }
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default UserForm;
