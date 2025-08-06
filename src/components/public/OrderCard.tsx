import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Order } from '../../types/public';
import { OrderCardItem, OrderCardWrapper, OrderItemList, OrderStatus } from '../../styles/public/OrdersStyles';

export const OrderCard = ({ order }: { order: Order }) => {
    const navigate = useNavigate();

    return (
        <OrderCardItem>
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/ordenes/${order.id}`)}
                style={{ cursor: 'pointer' }}
            >
                <OrderCardWrapper>
                    <h4>Pedido #{order.id}</h4>
                    <OrderStatus status={order.status}>Estado: {order.status}</OrderStatus>
                    <p>Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p>Total: ${order.total.toFixed(2)} MXN</p>

                    <OrderItemList>
                        {order.items.map(item => (
                            <li key={item.id}>
                                {item.quantity} x {item.name}
                            </li>
                        ))}
                    </OrderItemList>
                </OrderCardWrapper>
            </motion.div>
        </OrderCardItem>
    );
};
