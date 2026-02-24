import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getPublicSettings } from "../../services/public/settings";
import type { PublicAdminSettings } from "../../types/admin/settings";

interface PublicSettingsState {
    settings: PublicAdminSettings | null;
    loading: boolean;
    fetchPublicSettings: () => Promise<void>;
}

export const usePublicSettingsStore = create<PublicSettingsState>()(
    devtools(
        persist(
            (set) => ({
                settings: null,
                loading: false,

                fetchPublicSettings: async () => {
                    set({ loading: true });
                    try {
                        const data = await getPublicSettings();
                        set({ settings: data });
                    } catch (error) {
                        console.error("Failed to load public settings", error);
                    } finally {
                        set({ loading: false });
                    }
                },
            }),
            { name: "public-settings-store" }
        )
    )
);