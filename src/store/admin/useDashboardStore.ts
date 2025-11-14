import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getDashboardStats } from '../../services/admin/dashboard';
import type { DashboardStats } from '../../types/admin/Dashboard';

interface DashboardState {
    stats: DashboardStats | null;
    loading: boolean;
    error: string | null;
    fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>()(
    devtools((set) => ({
        stats: null,
        loading: false,
        error: null,

        fetchStats: async () => {
            set({ loading: true, error: null });
            try {
                const data = await getDashboardStats();
                set({ stats: data });
            } catch (e: any) {
                set({ error: e.message || 'Error cargando estadísticas' });
            } finally {
                set({ loading: false });
            }
        },
    }))
);