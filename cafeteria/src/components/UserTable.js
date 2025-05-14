import React from 'react';

function UserTable({ users, onEdit, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Contraseña</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.rol}</td>
                        <td>
                            <button onClick={() => onEdit(user.id)}>Editar</button>
                            <button onClick={() => onDelete(user.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserTable;