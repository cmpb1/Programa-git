import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Credenciales incorrectas');
            }

            const data = await response.json();
            setLoggedInUser(data);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {loggedInUser ? (
                <AdminDashboard />
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
