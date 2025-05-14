import React, { useState, useEffect } from 'react';

function PedidoForm({ pedido, onSave, onCancel, loggedInUser }) { // Recibir loggedInUser
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
        } else {
            setIdUsuario(loggedInUser.id); // Usar el ID del usuario logueado
        }
    }, [pedido, loggedInUser]); // Agregar loggedInUser como dependencia

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const pedidoData = {
        id_usuario: id_usuario,
        detalles: detalles,
    };
    console.log("PedidoForm - Datos a enviar: ", pedidoData);
    onSave(pedidoData);
};

    return (
        <form onSubmit={handleSubmit}>
            {detalles.map((detalle, index) => (
                <div key={index}>
                    <label>Producto:</label>
                    <select
                        value={detalle.id_producto}
                        onChange={(e) => handleDetalleChange(index, 'id_producto', e.target.value)}
                    >
                        <option value="">Seleccionar Producto</option>
                        {productosDisponibles.map(producto => (
                            <option key={producto.id} value={producto.id}>
                                {producto.nombre}
                            </option>
                        ))}
                    </select>

                    <label>Cantidad:</label>
                    <input
                        type="number"
                        value={detalle.cantidad}
                        onChange={(e) => handleDetalleChange(index, 'cantidad', e.target.value)}
                    />

                    <button type="button" onClick={() => eliminarDetalle(index)}>Eliminar</button>
                </div>
            ))}

            <button type="button" onClick={agregarDetalle}>Agregar Producto</button>
            <button type="submit">Guardar Pedido</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
}

export default PedidoForm;
