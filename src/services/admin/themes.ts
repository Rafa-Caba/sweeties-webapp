import api from '../../api/axios.api';
import type { User } from '../../types'; // Your User type

// PUT /api/themes/me (Authenticated)
export const updateMyTheme = async (themeId: number): Promise<User> => {
    // The backend expects a Map<String, Long> payload: { "themeId": 1 }
    const { data } = await api.put<User>('/themes/me', { themeId });
    return data;
};