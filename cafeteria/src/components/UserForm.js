import React, { useState, useEffect } from 'react';

function UserForm({ user, onSave, onCancel }) {
    const [username, setUsername] = useState('');
    const [rol, setRol] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setPassword(user.password)
            setRol(user.rol);
        } else {
            setUsername('');
            setPassword('');
            setRol('');
        }
    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({ username,password, rol });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label>Rol:</label>
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="Administrador">Administrador</option>
                    <option value="Cafetero">Cafetero</option>
                </select>
            </div>
            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
}

export default UserForm;