import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../types/public";
import { OrderCardItem, OrderCardWrapper, OrderItemList, OrderStatus } from "../../styles/public/OrdersStyles";

function formatDateLabel(iso: string | null): string {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString();
}

export const OrderCard = ({ order }: { order: Order }) => {
    const navigate = useNavigate();

    return (
        <OrderCardItem>
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/ordenes/${order.id}`)}
                style={{ cursor: "pointer" }}
            >
                <OrderCardWrapper>
                    <h4>Pedido #{order.id}</h4>

                    {/* Keep prop name as-is, matching your styled component */}
                    <OrderStatus status={order.status}>Estado: {order.status}</OrderStatus>

                    <p>Fecha: {formatDateLabel(order.createdAt)}</p>
                    <p>Total: ${Number(order.total).toFixed(2)} MXN</p>

                    <OrderItemList>
                        {order.items.map((item, idx) => (
                            <li key={`${item.productId}-${idx}`}>
                                {item.quantity} x {item.name}
                            </li>
                        ))}
                    </OrderItemList>
                </OrderCardWrapper>
            </motion.div>
        </OrderCardItem>
    );
};