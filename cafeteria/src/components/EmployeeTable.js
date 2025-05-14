import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeTable({ employees, onEdit, onDelete }) {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Cédula</th>
                    <th>ID Usuario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.nombre}</td>
                        <td>{employee.apellido}</td>
                        <td>{employee.cedula}</td>
                        <td>{employee.id_usuario}</td>
                        <td>
                            <Button variant="primary" size="sm" className="me-2" onClick={() => onEdit(employee.id)}>
                                Editar
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => onDelete(employee.id)}>
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default EmployeeTable;