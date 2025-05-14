import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PedidoTable({ pedidos, onEdit, onDelete }) {
    return (
        <Table striped bordered hover responsive>
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
                            <Button variant="primary" size="sm" className="me-2" onClick={() => onEdit(pedido.id)}>
                                Editar
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => onDelete(pedido.id)}>
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default PedidoTable;