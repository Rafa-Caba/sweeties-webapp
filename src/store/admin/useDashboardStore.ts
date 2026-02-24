import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getDashboardStats } from "../../services/admin/dashboard";
import type { DashboardStats } from "../../types/admin/Dashboard";

function getErrorMessage(e: any): string {
    return e?.response?.data?.message || e?.message || "Error cargando estadísticas";
}

interface DashboardState {
    stats: DashboardStats | null;
    loading: boolean;
    error: string | null;
    lastFetchedAt: number | null;

    fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>()(
    devtools((set, get) => ({
        stats: null,
        loading: false,
        error: null,
        lastFetchedAt: null,

        fetchStats: async () => {
            const now = Date.now();
            const last = get().lastFetchedAt;
            if (last && now - last < 500) return;

            set({ loading: true, error: null, lastFetchedAt: now });
            try {
                const data = await getDashboardStats();
                set({ stats: data });
            } catch (e: any) {
                set({ error: getErrorMessage(e) });
            } finally {
                set({ loading: false });
            }
        },
    }))
);