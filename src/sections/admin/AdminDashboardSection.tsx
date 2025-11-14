import { useEffect } from 'react';
import { useDashboardStore } from '../../store/admin/useDashboardStore';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { SectionBody, SectionHeader, StatCard, StatsGrid } from '../../styles/admin/DashboardStyles';

export const AdminDashboardSection = () => {
    const { stats, fetchStats, loading, error } = useDashboardStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    // Format currency
    const formatMoney = (amount: number) => 
        new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

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
                {error && <p style={{color:'red'}}>{error}</p>}

                {!loading && stats && (
                    <StatsGrid>
                        <StatCard>
                            <span className="value">{stats.userCount}</span>
                            <span className="label">Usuarios</span>
                            <span className="hint">Totales registrados</span>
                        </StatCard>

                        <StatCard>
                            <span className="value">{stats.itemCount}</span>
                            <span className="label">Items</span>
                            <span className="hint">En catálogo</span>
                        </StatCard>

                        <StatCard style={{borderColor: stats.pendingOrdersCount > 0 ? '#f1c40f' : 'inherit'}}>
                            <span className="value">{stats.pendingOrdersCount}</span>
                            <span className="label">Órdenes</span>
                            <span className="hint">Pendientes de envío</span>
                        </StatCard>

                        <StatCard>
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