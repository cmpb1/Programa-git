import React, { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import EmployeeTable from '../components/EmployeeTable';
import UserForm from '../components/UserForm';
import EmployeeForm from '../components/EmployeeForm';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isUserFormOpen, setIsUserFormOpen] = useState(false);
    const [isEmployeeFormOpen, setIsEmployeeFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Funciones para manejar la comunicación con la API (Backend)
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3001/usuarios');
            if (!response.ok) {
                throw new Error('Error al obtener usuarios');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3001/empleados');
            if (!response.ok) {
                throw new Error('Error al obtener empleados');
            }
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createUser = async (userData) => {
        try {
            const response = await fetch('http://localhost:3001/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error('Error al crear usuario');
            }
            const data = await response.json();
            setUsers([...users, data]); // Actualizar la lista localmente
            setIsUserFormOpen(false);
        } catch (error) {
            console.error(error);
            alert('Error al crear usuario');
        }
    };

    const updateUser = async (id, userData) => {
        try {
            const response = await fetch(`http://localhost:3001/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar usuario');
            }
            const data = await response.json();
            setUsers(users.map(user => (user.id === id ? data : user))); // Actualizar la lista localmente
            setIsUserFormOpen(false);
        } catch (error) {
            console.error(error);
            alert('Error al actualizar usuario');
        }
    };

    const deleteUser = async (id) => {
        console.log("Eliminar usuario con ID:", id);
        try {
            const response = await fetch(`http://localhost:3001/usuarios/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar usuario');
            }
            setUsers(users.filter(user => user.id !== id)); // Actualizar la lista localmente
        } catch (error) {
            console.error(error);
            alert('Error al eliminar usuario');
        }
    };

    const createEmployee = async (employeeData) => {
        
        try {
            const response = await fetch('http://localhost:3001/empleados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });
            if (!response.ok) {
                throw new Error('Error al crear empleado');
            }
            const data = await response.json();
            setEmployees([...employees, data]);
            setIsEmployeeFormOpen(false);
        } catch (error) {
            console.error(error);
            alert('Error al crear empleado');
        }
    };

    const updateEmployee = async (id, employeeData) => {
        try {
            const response = await fetch(`http://localhost:3001/empleados/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar empleado');
            }
            const data = await response.json();
            setEmployees(employees.map(employee => (employee.id === id ? data : employee)));
            setIsEmployeeFormOpen(false);
        } catch (error) {
            console.error(error);
            alert('Error al actualizar empleado');
        }
    };

    const deleteEmployee = async (id) => {
        console.log("Eliminar empleado con ID:", id);
        try {
            const response = await fetch(`http://localhost:3001/empleados/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar empleado');
            }
            setEmployees(employees.filter(employee => employee.id !== id));
        } catch (error) {
            console.error(error);
            alert('Error al eliminar empleado');
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchEmployees();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Módulo de Administración</h2>

            <div>
                <h3>Usuarios</h3>
                <button onClick={() => setIsUserFormOpen(true)}>Crear Usuario</button>
                <UserTable
                    users={users}
                    onEdit={(id) => {
                        const user = users.find(user => user.id === id);
                        setSelectedUser(user);
                        setIsUserFormOpen(true);
                    }}
                    onDelete={deleteUser}
                />
                {isUserFormOpen && (
                    <UserForm
                        user={selectedUser}
                        onSave={selectedUser ? (userData) => updateUser(selectedUser.id, userData) : createUser}
                        onCancel={() => {
                            setIsUserFormOpen(false);
                            setSelectedUser(null);
                        }}
                    />
                )}
            </div>

            <div>
                <h3>Empleados</h3>
                <button onClick={() => setIsEmployeeFormOpen(true)}>Crear Empleado</button>
                <EmployeeTable
                    employees={employees}
                    onEdit={(id) => {
                        const employee = employees.find(employee => employee.id === id);
                        setSelectedEmployee(employee);
                        setIsEmployeeFormOpen(true);
                    }}
                    onDelete={deleteEmployee}
                />
                {isEmployeeFormOpen && (
                    <EmployeeForm
                        employee={selectedEmployee}
                        onSave={selectedEmployee ? (employeeData) => updateEmployee(selectedEmployee.id, employeeData) : createEmployee}
                        onCancel={() => {
                            setIsEmployeeFormOpen(false);
                            setSelectedEmployee(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;