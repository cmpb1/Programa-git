import React, { useState, useEffect } from 'react';

function EmployeeForm({ employee, onSave, onCancel }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');
    const [id_usuario, setIdUsuario] = useState('');

    useEffect(() => {
        if (employee) {
            setNombre(employee.nombre);
            setApellido(employee.apellido);
            setCedula(employee.cedula);
            setIdUsuario(employee.id_usuario);
        } else {
            setNombre('');
            setApellido('');
            setCedula('');
            setIdUsuario('');
        }
    }, [employee]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({ nombre, apellido, cedula, id_usuario });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
                <label>Apellido:</label>
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>
            <div>
                <label>Cédula:</label>
                <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} />
            </div>
            <div>
                <label>ID Usuario:</label>
                <input type="number" value={id_usuario} onChange={(e) => setIdUsuario(e.target.value)} />
            </div>
            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
}

export default EmployeeForm;