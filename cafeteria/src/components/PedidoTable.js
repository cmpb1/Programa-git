import React from 'react';

function PedidoTable({ pedidos, onEdit, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha/Hora</th>
                    <th>ID Usuario</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                        <td>{pedido.id}</td>
                        <td>{pedido.fecha_hora}</td>
                        <td>{pedido.id_usuario}</td>
                        <td>{pedido.total}</td>
                        <td>{pedido.estado}</td>
                        <td>
                            <button onClick={() => onEdit(pedido.id)}>Editar</button>
                            <button onClick={() => onDelete(pedido.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default PedidoTable;