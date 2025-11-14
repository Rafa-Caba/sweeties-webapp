import api from '../../api/axios.api';
import type { AdminSettings } from '../../types/admin/Settings';

export const getAdminSettings = async (): Promise<AdminSettings> => {
    const { data } = await api.get<AdminSettings>('/admin/admin-settings');
    return data;
};

export const updateAdminSettings = async (form: FormData): Promise<AdminSettings> => {
    const { data } = await api.put<AdminSettings>('/admin/admin-settings', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};