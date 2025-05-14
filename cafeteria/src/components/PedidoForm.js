import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PedidoForm({ pedido, onSave, onCancel, loggedInUser }) {
    const [id_usuario, setIdUsuario] = useState('');
    const [detalles, setDetalles] = useState([{ id_producto: '', cantidad: 1 }]);
    const [productosDisponibles, setProductosDisponibles] = useState([]);

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:3001/productos');
            if (!response.ok) {
                throw new Error('Error al obtener productos');
            }
            const data = await response.json();
            setProductosDisponibles(data);
        } catch (error) {
            console.error(error);
            alert('Error al obtener productos');
        }
    };

    useEffect(() => {
        fetchProductos();
        if (pedido) {
            setIdUsuario(pedido.id_usuario);
            setDetalles(pedido.detalles || [{ id_producto: '', cantidad: 1 }]); // Inicializar detalles
        } else {
            setIdUsuario(loggedInUser.id);
        }
    }, [pedido, loggedInUser]);

    const handleDetalleChange = (index, field, value) => {
        const nuevosDetalles = [...detalles];
        nuevosDetalles[index][field] = value;
        setDetalles(nuevosDetalles);
    };

    const agregarDetalle = () => {
        setDetalles([...detalles, { id_producto: '', cantidad: 1 }]);
    };

    const eliminarDetalle = (index) => {
        const nuevosDetalles = detalles.filter((_, i) => i !== index);
        setDetalles(nuevosDetalles);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const pedidoData = {
            id_usuario: id_usuario,
            detalles: detalles.filter(detalle => detalle.id_producto !== '') // Filtrar detalles vacíos
        };
        onSave(pedidoData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {detalles.map((detalle, index) => (
                <div key={index}>
                    <Form.Group className="mb-3" controlId={`formProducto${index}`}>
                        <Form.Label>Producto:</Form.Label>
                        <Form.Select
                            value={detalle.id_producto}
                            onChange={(e) => handleDetalleChange(index, 'id_producto', e.target.value)}
                        >
                            <option value="">Seleccionar Producto</option>
                            {productosDisponibles.map(producto => (
                                <option key={producto.id} value={producto.id}>
                                    {producto.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId={`formCantidad${index}`}>
                        <Form.Label>Cantidad:</Form.Label>
                        <Form.Control
                            type="number"
                            value={detalle.cantidad}
                            onChange={(e) => handleDetalleChange(index, 'cantidad', e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="outline-danger" size="sm" onClick={() => eliminarDetalle(index)}>
                        Eliminar
                    </Button>
                </div>
            ))}

            <div className="text-center mt-3">
                <Button variant="secondary" className="me-2" onClick={agregarDetalle}>
                    Agregar Producto
                </Button>
                <Button variant="primary" type="submit" className="me-2">
                    Guardar Pedido
                </Button>
                <Button variant="danger" onClick={onCancel}>
                    Cancelar
                </Button>
            </div>
        </Form>
    );
}

export default PedidoForm;