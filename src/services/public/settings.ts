import api from '../../api/axios.api';
import type { AdminSettings } from '../../types/admin/Settings'; // We can reuse the type, or make a specific PublicSettings type

// This calls the PUBLIC endpoint (no auth required)
export const getPublicSettings = async (): Promise<AdminSettings> => {
    const { data } = await api.get<AdminSettings>('/admin/admin-settings/public');
    return data;
};