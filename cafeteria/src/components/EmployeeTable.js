import React from 'react';

function EmployeeTable({ employees, onEdit, onDelete }) {
    return (
        <table>
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
                            <button onClick={() => onEdit(employee.id)}>Editar</button>
                            <button onClick={() => onDelete(employee.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default EmployeeTable;