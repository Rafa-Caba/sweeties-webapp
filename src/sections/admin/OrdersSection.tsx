import { useEffect } from "react";
import { useAdminOrdersStore } from "../../store/admin/useAdminOrdersStore";
import { AdminLayout } from "../../components/admin/layout/AdminLayout";
import { SectionBody, SectionHeader } from "../../styles/admin/DashboardStyles";
import { OrdersTable, StatusBadge, FilterBar, FilterButton, ActionLink } from "../../styles/admin/OrderStyles";
import type { OrderStatus } from "../../types";

function formatDate(iso: string | null | undefined): string {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString();
}

export const OrdersSection = () => {
    const { orders, loading, error, fetchOrders, filterStatus, setFilterStatus, page, setPage } = useAdminOrdersStore();

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders, filterStatus, page]);

    const handleFilter = (status: OrderStatus | "ALL") => {
        setFilterStatus(status);
        setPage(0);
    };

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Pedidos</h1>
                    <p>Gestiona las órdenes de compra</p>
                </div>
            </SectionHeader>

            <SectionBody>
                <FilterBar>
                    {(["ALL", "PENDIENTE", "ENVIADO", "ENTREGADO"] as const).map((s) => (
                        <FilterButton key={s} $active={filterStatus === s} onClick={() => handleFilter(s)} type="button">
                            {s === "ALL" ? "Todos" : s}
                        </FilterButton>
                    ))}
                </FilterBar>

                {loading && <p>Cargando pedidos...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && orders.length === 0 && <p>No hay pedidos.</p>}

                {!loading && !error && orders.length > 0 && (
                    <>
                        <div style={{ overflowX: "auto" }}>
                            <OrdersTable>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Cliente</th>
                                        <th>Total</th>
                                        <th>Fecha</th>
                                        <th>Estado</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>#{order.id}</td>
                                            <td>
                                                {order.name}
                                                <br />
                                                <small style={{ opacity: 0.7 }}>{order.email}</small>
                                            </td>
                                            <td>${Number(order.total).toFixed(2)}</td>
                                            <td>{formatDate(order.createdAt)}</td>
                                            <td>
                                                <StatusBadge $status={order.status}>{order.status}</StatusBadge>
                                            </td>
                                            <td>
                                                <ActionLink to={`/admin/orders/${order.id}`}>Ver Detalle</ActionLink>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </OrdersTable>
                        </div>

                        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
                            <button type="button" disabled={page === 0} onClick={() => setPage(page - 1)}>
                                Anterior
                            </button>
                            <span>Página {page + 1}</span>
                            <button type="button" disabled={orders.length < 20} onClick={() => setPage(page + 1)}>
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
            </SectionBody>
        </AdminLayout>
    );
};