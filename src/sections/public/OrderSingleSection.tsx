import { useParams, useNavigate } from 'react-router-dom';
import { useOrdersStore } from '../../store/public/useOrdersStore';
import { OrderWrapper, OrderTitle, OrderStatus, OrderItemList, BackButton } from '../../styles/public/OrderSingleStyles';

export const OrderSingleSection = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { orders } = useOrdersStore();
    const order = orders.find(o => o.id === id);

    if (!order) {
        return (
            <OrderWrapper>
                <OrderTitle>Pedido no encontrado</OrderTitle>
                <BackButton onClick={() => navigate('/ordenes')}>← Volver a Pedidos</BackButton>
            </OrderWrapper>
        );
    }

    return (
        <OrderWrapper>
            <OrderTitle>Detalle del Pedido #{order.id}</OrderTitle>
            <OrderStatus status={order.status}>Estado: {order.status}</OrderStatus>
            <p>Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total: ${order.total.toFixed(2)} MXN</p>

            <OrderItemList>
                {order.items.map(item => (
                    <li key={item.id}>
                        {item.quantity} x {item.name} — ${item.price.toFixed(2)} c/u
                    </li>
                ))}
            </OrderItemList>

            <BackButton onClick={() => navigate('/ordenes')}>← Volver a Pedidos</BackButton>
        </OrderWrapper>
    );
};
