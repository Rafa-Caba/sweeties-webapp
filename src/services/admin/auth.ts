import rawAxios from "./rawAxios";
import type {
    LoginPayload,
    LoginResponse,
    LogoutResponse,
    RefreshResponse,
    User,
} from '../../types';
import api from "../../api/axios.api";

// 🔁 POST /auth/refresh
export const refreshToken = async (refreshToken: string): Promise<RefreshResponse | null> => {
    try {
        const { data } = await rawAxios.post<RefreshResponse>('/auth/refresh', {
            token: refreshToken,
        });
        return data;
    } catch (error: any) {
        console.warn('🔁 Refresh token error:', error.response?.data || error.message);
        return null;
    }
};

// ✅ GET /users/profile (needs token)
export const getUserProfile = async (): Promise<User> => {
    const { data } = await api.get<User>('/users/profile');
    return data;
};

// ✅ POST /auth/login
export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    return data;
};

// ✅ POST /auth/register (with FormData and image)
export const registerUser = async (formData: FormData): Promise<User> => {
    const { data } = await rawAxios.post<User>('/auth/register', formData);
    return data;
};

// ✅ POST /auth/logout (with refresh token)
export const logoutUser = async (refreshToken: string): Promise<LogoutResponse> => {
    const { data } = await api.delete<LogoutResponse>('/auth/logout', {
        data: { token: refreshToken },
    });
    return data;
};



