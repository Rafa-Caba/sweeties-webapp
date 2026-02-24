import { useEffect, useMemo } from "react";
import { AdminLayout } from "../../components/admin/layout/AdminLayout";
import { SectionBody, SectionHeader, StatCard, StatsGrid } from "../../styles/admin/DashboardStyles";
import { useDashboardStore } from "../../store/admin/useDashboardStore";

import {
    FaUsers,
    FaBoxOpen,
    FaClipboardList,
    FaHourglassHalf,
    FaTruck,
    FaCheckCircle,
    FaCoins,
} from "react-icons/fa";

function toNumber(v: unknown, fallback = 0): number {
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : fallback;
}

export const AdminDashboardSection = () => {
    const { stats, fetchStats, loading, error } = useDashboardStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const formatMoney = useMemo(() => {
        const fmt = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
        return (amount: unknown) => fmt.format(toNumber(amount, 0));
    }, []);

    const pending = toNumber(stats?.ordersPending, 0);
    const shipped = toNumber(stats?.ordersShipped, 0);
    const delivered = toNumber(stats?.ordersDelivered, 0);
    const totalOrders = toNumber(stats?.ordersTotal, pending + shipped + delivered);

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Dashboard</h1>
                    <p>Resumen en tiempo real</p>
                </div>
            </SectionHeader>

            <SectionBody>
                {loading && <p>Cargando estadísticas...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!loading && !stats && !error && <p>No hay estadísticas disponibles.</p>}

                {!loading && stats && (
                    <StatsGrid>
                        <StatCard>
                            <div className="icon">
                                <FaUsers />
                            </div>
                            <span className="value">{toNumber(stats.userCount, 0)}</span>
                            <span className="label">Usuarios</span>
                            <span className="hint">Totales registrados</span>
                        </StatCard>

                        <StatCard>
                            <div className="icon">
                                <FaBoxOpen />
                            </div>
                            <span className="value">{toNumber(stats.itemCount, 0)}</span>
                            <span className="label">Items</span>
                            <span className="hint">En catálogo</span>
                        </StatCard>

                        <StatCard>
                            <div className="icon">
                                <FaClipboardList />
                            </div>
                            <span className="value">{totalOrders}</span>
                            <span className="label">Órdenes</span>
                            <span className="hint">Totales</span>
                        </StatCard>

                        <StatCard style={pending > 0 ? { borderColor: "#f1c40f" } : undefined}>
                            <div className="icon icon--warn">
                                <FaHourglassHalf />
                            </div>
                            <span className="value">{pending}</span>
                            <span className="label">Pendientes</span>
                            <span className="hint">Por enviar</span>
                        </StatCard>

                        <StatCard>
                            <div className="icon icon--info">
                                <FaTruck />
                            </div>
                            <span className="value">{shipped}</span>
                            <span className="label">Enviadas</span>
                            <span className="hint">En tránsito</span>
                        </StatCard>

                        <StatCard>
                            <div className="icon icon--success">
                                <FaCheckCircle />
                            </div>
                            <span className="value">{delivered}</span>
                            <span className="label">Entregadas</span>
                            <span className="hint">Completadas</span>
                        </StatCard>

                        <StatCard>
                            <div className="icon icon--money">
                                <FaCoins />
                            </div>
                            <span className="value">{formatMoney(stats.totalRevenue)}</span>
                            <span className="label">Ingresos</span>
                            <span className="hint">Total histórico</span>
                        </StatCard>
                    </StatsGrid>
                )}
            </SectionBody>
        </AdminLayout>
    );
};