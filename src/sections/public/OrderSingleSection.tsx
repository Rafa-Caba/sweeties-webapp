import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrdersStore } from '../../store/public/useOrdersStore';
import { 
    OrderWrapper, 
    OrderTitle, 
    OrderStatus, 
    OrderItemList, 
    BackButton 
} from '../../styles/public/OrderSingleStyles';

export const OrderSingleSection = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { orders, fetchOrderDetails, loading } = useOrdersStore();
    
    const orderId = Number(id);
    const order = orders.find(o => o.id === orderId);

    // Try to refresh the order status from the backend when viewing
    useEffect(() => {
        if (orderId) {
            fetchOrderDetails(orderId);
        }
    }, [orderId, fetchOrderDetails]);

    if (!order) {
        return (
            <OrderWrapper>
                <OrderTitle>Pedido no encontrado</OrderTitle>
                <p>No encontramos este pedido en tu historial local.</p>
                <BackButton onClick={() => navigate('/ordenes')}>← Volver a Pedidos</BackButton>
            </OrderWrapper>
        );
    }

    return (
        <OrderWrapper>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <OrderTitle>Pedido #{order.id}</OrderTitle>
                {loading && <span style={{fontSize: '0.8rem', color: '#888'}}>Actualizando...</span>}
            </div>

            {/* Status Badge */}
            <OrderStatus $status={order.status}>
                Estado: {order.status}
            </OrderStatus>

            <div style={{ margin: '1rem 0', lineHeight: '1.6' }}>
                <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)} MXN</p>
                <p><strong>Nota:</strong> {order.note || 'Sin nota'}</p>
            </div>

            <h3>Productos:</h3>
            <OrderItemList>
                {order.items.map((item, index) => (
                    <li key={`${item.productId}-${index}`}>
                        <strong>{item.quantity}x</strong> {item.name} — 
                        <span>${item.price.toFixed(2)} c/u</span>
                    </li>
                ))}
            </OrderItemList>

            <BackButton onClick={() => navigate('/ordenes')}>← Volver a Pedidos</BackButton>
        </OrderWrapper>
    );
};