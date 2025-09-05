import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { SectionBody, SectionHeader, StatCard, StatsGrid } from '../../styles/admin/DashboardStyles';

export const AdminDashboardSection = () => {

    // Later: fetch real stats from /api/admin/stats (visits, items, users, orders, etc.)
    const stats = [
        { label: 'Usuarios', value: 12, hint: 'Activos' },
        { label: 'Items', value: 37, hint: 'En catálogo' },
        { label: 'Órdenes', value: 8, hint: 'Pendientes' },
        { label: 'Visitas', value: 421, hint: 'Últimos 7 días' },
    ];

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Dashboard</h1>
                    <p>Resumen general del panel administrativo</p>
                </div>
            </SectionHeader>

            <SectionBody>
                <StatsGrid>
                    {stats.map((s) => (
                        <StatCard key={s.label}>
                            <span className="value">{s.value}</span>
                            <span className="label">{s.label}</span>
                            <span className="hint">{s.hint}</span>
                        </StatCard>
                    ))}
                </StatsGrid>


            </SectionBody>
        </AdminLayout>
    );
};
