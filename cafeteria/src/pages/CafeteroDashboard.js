import React, { useState, useEffect } from 'react';
import PedidoTable from '../components/PedidoTable';
import PedidoForm from '../components/PedidoForm';

function CafeteroDashboard({ loggedInUser }) {
    const [pedidos, setPedidos] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [isPedidoFormOpen, setIsPedidoFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPedidos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:3001/pedidos?id_usuario=${loggedInUser.id}`);
            if (!response.ok) {
                throw new Error('Error al obtener pedidos');
            }
            const data = await response.json();
            setPedidos(data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createPedido = async (pedidoData) => {
    try {
        const response = await fetch('http://localhost:3001/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedidoData), // ya viene con id_usuario y detalles correctos
        });
        if (!response.ok) {
            throw new Error('Error al crear pedido');
        }
        const data = await response.json();
        setPedidos([...pedidos, data]);
        setIsPedidoFormOpen(false);
        setSelectedPedido(null);
    } catch (error) {
        console.error(error);
        setError(error.message);
        alert('Error al crear pedido');
    }
};

    const updatePedido = async (id, pedidoData) => {
        try {
            const response = await fetch(`http://localhost:3001/pedidos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pedidoData),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar pedido');
            }
            const data = await response.json();
             // Actualizar el estado del pedido en la lista
            setPedidos(pedidos.map(p => p.id === id ? { ...p, ...data } : p));
            setIsPedidoFormOpen(false);
            setSelectedPedido(null);
        } catch (error) {
            console.error(error);
            alert('Error al actualizar pedido');
        }
    };

    const deletePedido = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/pedidos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar pedido');
            }
            setPedidos(pedidos.filter(pedido => pedido.id !== id));
        } catch (error) {
            console.error(error);
            alert('Error al eliminar pedido');
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Dashboard de Cafetero</h2>

            <div>
                <h3>Pedidos</h3>
                <button onClick={() => setIsPedidoFormOpen(true)}>Crear Pedido</button>
                <PedidoTable
                    pedidos={pedidos}
                    onEdit={(id) => {
                        const pedido = pedidos.find(pedido => pedido.id === id);
                        setSelectedPedido(pedido);
                        setIsPedidoFormOpen(true);
                    }}
                    onDelete={deletePedido}
                />
                {isPedidoFormOpen && (
                    <PedidoForm
                        pedido={selectedPedido}
                        loggedInUser={loggedInUser} // Pasar loggedInUser
                        onSave={selectedPedido ? (pedidoData) => updatePedido(selectedPedido.id, pedidoData) : createPedido}
                        onCancel={() => {
                            setIsPedidoFormOpen(false);
                            setSelectedPedido(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default CafeteroDashboard;