import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getAdminSettings, updateAdminSettings } from '../../services/admin/settings';
import type { AdminSettings } from '../../types/admin/Settings';

interface SettingsState {
    settings: AdminSettings | null;
    loading: boolean;
    error: string | null;

    fetchSettings: () => Promise<void>;
    saveSettings: (form: FormData) => Promise<boolean>;
}

export const useSettingsStore = create<SettingsState>()(
    devtools((set) => ({
        settings: null,
        loading: false,
        error: null,

        fetchSettings: async () => {
            set({ loading: true, error: null });
            try {
                const data = await getAdminSettings();
                set({ settings: data });
            } catch (e: any) {
                set({ error: e?.message || 'Error cargando configuración' });
            } finally {
                set({ loading: false });
            }
        },

        saveSettings: async (form: FormData) => {
            set({ loading: true, error: null });
            try {
                const updated = await updateAdminSettings(form);
                set({ settings: updated });
                return true;
            } catch (e: any) {
                set({ error: e?.message || 'Error guardando configuración' });
                return false;
            } finally {
                set({ loading: false });
            }
        },
    }))
);