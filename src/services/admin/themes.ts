import api from "../../api/axios.api";
import type { User } from "../../types";

// PUT /api/themes/me (Authenticated)
// Backend expects: { themeId: "<mongoId>" }
export const updateMyTheme = async (themeId: string): Promise<User> => {
    const { data } = await api.put<User>("/themes/me", { themeId });
    return data;
};