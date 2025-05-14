import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicNombre">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresa el nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicApellido">
                <Form.Label>Apellido:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresa el apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCedula">
                <Form.Label>Cédula:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresa la cédula"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIdUsuario">
                <Form.Label>ID Usuario:</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Ingresa el ID de usuario"
                    value={id_usuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                />
            </Form.Group>

            <div className="text-center">
                <Button variant="primary" type="submit" className="me-2">
                    Guardar
                </Button>
                <Button variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
            </div>
        </Form>
    );
}

export default EmployeeForm;