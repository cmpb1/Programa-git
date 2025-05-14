import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar los estilos de Bootstrap

function UserTable({ users, onEdit, onDelete }) {
    return (
        <Table striped bordered hover responsive> {/* Añadido el prop responsive */}
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
                            <Button variant="primary" size="sm" className="me-2" onClick={() => onEdit(user.id)}> {/* Añadido className="me-2" */}
                                Editar
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => onDelete(user.id)}>
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default UserTable;