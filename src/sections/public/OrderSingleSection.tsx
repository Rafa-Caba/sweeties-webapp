import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrdersStore } from "../../store/public/useOrdersStore";
import {
    OrderWrapper,
    OrderTitle,
    OrderStatus,
    OrderItemList,
    BackButton,
} from "../../styles/public/OrderSingleStyles";

function safeDateLabel(iso: string | null): string {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}

export const OrderSingleSection = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { orders, fetchOrderDetails, loading, error, clearError } = useOrdersStore();

    const orderId = useMemo(() => String(id ?? ""), [id]);
    const order = useMemo(
        () => orders.find((o) => String(o.id) === orderId),
        [orders, orderId]
    );

    useEffect(() => {
        clearError();
        if (orderId) {
            fetchOrderDetails(orderId);
        }
    }, [orderId, fetchOrderDetails, clearError]);

    if (!order) {
        return (
            <OrderWrapper>
                <OrderTitle>Pedido no encontrado</OrderTitle>
                <p>No encontramos este pedido en tu historial local.</p>
                {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
                <BackButton onClick={() => navigate("/ordenes")}>← Volver a Pedidos</BackButton>
            </OrderWrapper>
        );
    }

    return (
        <OrderWrapper>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <OrderTitle>Pedido #{order.id}</OrderTitle>
                {loading && <span style={{ fontSize: "0.8rem", color: "#888" }}>Actualizando...</span>}
            </div>

            {error && <p style={{ color: "crimson", marginTop: "0.75rem" }}>Error: {error}</p>}

            <OrderStatus $status={order.status}>Estado: {order.status}</OrderStatus>

            <div style={{ margin: "1rem 0", lineHeight: "1.6" }}>
                <p>
                    <strong>Fecha:</strong> {safeDateLabel(order.createdAt)}
                </p>
                <p>
                    <strong>Total:</strong> ${Number(order.total).toFixed(2)} MXN
                </p>
                <p>
                    <strong>Nota:</strong> {order.note || "Sin nota"}
                </p>
            </div>

            <h3>Productos:</h3>
            <OrderItemList>
                {order.items.map((item, index) => (
                    <li key={`${item.productId}-${index}`}>
                        <strong>{item.quantity}x</strong> {item.name} — <span>${item.price.toFixed(2)} c/u</span>
                    </li>
                ))}
            </OrderItemList>

            <BackButton onClick={() => navigate("/ordenes")}>← Volver a Pedidos</BackButton>
        </OrderWrapper>
    );
};