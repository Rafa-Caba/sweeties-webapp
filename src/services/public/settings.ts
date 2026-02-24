import api from "../../api/axios.api";
import type { PublicAdminSettings } from "../../types/admin/settings";

// Public settings (no auth)
export const getPublicSettings = async (): Promise<PublicAdminSettings> => {
    const { data } = await api.get<PublicAdminSettings>("/admin/admin-settings/public");
    return data;
};