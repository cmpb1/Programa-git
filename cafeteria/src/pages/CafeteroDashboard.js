import React, { useState, useEffect } from 'react';
import PedidoTable from '../components/PedidoTable';
import PedidoForm from '../components/PedidoForm';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                body: JSON.stringify(pedidoData),
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
            <header style={{ backgroundColor: 'gray', color: 'white', padding: '10px', textAlign: 'center', height: "9vh" }}>
                <h2>Dashboard de Cafetero</h2>
            </header>

            <Container>
                <Row className="mt-4">
                    <Col xs={12}>
                        <h3>Pedidos</h3>
                    </Col>
                    <Col xs={12} className="mb-3">
                        <PedidoTable
                            pedidos={pedidos}
                            onEdit={(id) => {
                                const pedido = pedidos.find(pedido => pedido.id === id);
                                setSelectedPedido(pedido);
                                setIsPedidoFormOpen(true);
                            }}
                            onDelete={deletePedido}
                        />
                    </Col>
                    <Col xs={12} className="text-center mb-3">
                        <Button variant="primary" onClick={() => setIsPedidoFormOpen(true)}>Crear Pedido</Button>
                    </Col>
                </Row>

                {isPedidoFormOpen && (
                    <Row className="justify-content-center mt-4">
                        <Col xs={12} md={8} lg={6}>
                            <PedidoForm
                                pedido={selectedPedido}
                                loggedInUser={loggedInUser} // Pasar loggedInUser
                                onSave={selectedPedido ? (pedidoData) => updatePedido(selectedPedido.id, pedidoData) : createPedido}
                                onCancel={() => {
                                    setIsPedidoFormOpen(false);
                                    setSelectedPedido(null);
                                }}
                            />
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default CafeteroDashboard;