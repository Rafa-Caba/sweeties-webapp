import { useEffect } from 'react';
import { useOrdersStore } from '../../store/public/useOrdersStore';
import { OrdersWrapper, OrdersTitle } from '../../styles/public/OrdersStyles';
import { OrderCard } from '../../components/public/OrderCard';

export const OrdersSection = () => {
    const { orders, fetchOrders, loading } = useOrdersStore();

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <OrdersWrapper>
            <OrdersTitle>🧾 Tus Pedidos</OrdersTitle>

            {loading && <p>Cargando pedidos...</p>}

            {!loading && orders.length === 0 && <p>No tienes pedidos aún.</p>}

            {orders.map(order => (
                <OrderCard
                    key={order.id}
                    order={order}
                />
            ))}
        </OrdersWrapper>
    );
};
