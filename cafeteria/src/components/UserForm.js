import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserForm({ user, onSave, onCancel }) {
    const [username, setUsername] = useState('');
    const [rol, setRol] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setPassword(user.password);
            setRol(user.rol);
        } else {
            setUsername('');
            setPassword('');
            setRol('');
        }
    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({ username, password, rol });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresa el username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Ingresa la contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRol">
                <Form.Label>Rol:</Form.Label>
                <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="Administrador">Administrador</option>
                    <option value="Cafetero">Cafetero</option>
                </Form.Select>
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

export default UserForm;