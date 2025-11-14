import api from '../../api/axios.api';
import type { ThemeDefinition } from '../../types/admin/theme';

// GET /api/themes (Public)
export const getAllThemes = async (): Promise<ThemeDefinition[]> => {
    const { data } = await api.get<ThemeDefinition[]>('/themes');
    return data;
};