import rawAxios from "./rawAxios";
import type {
    LoginPayload,
    AuthResponse,
    LogoutResponse,
    RefreshResponse,
    RegisterPayload,
    User,
} from '../../types';
import api from "../../api/axios.api";

// 🔁 POST /auth/refresh
export const refreshToken = async (refreshToken: string): Promise<RefreshResponse | null> => {
    try {
        const { data } = await rawAxios.post<RefreshResponse>('/auth/refresh', {
            refreshToken: refreshToken,
        });
        return data;
    } catch (error: any) {
        console.warn('🔁 Refresh token error:', error.response?.data || error.message);
        return null;
    }
};

// ✅ GET /users/profile (needs token)
export const getUserProfile = async (): Promise<User> => {
    const { data } = await api.get<User>('/users/me');
    return data;
};

// ✅ POST /auth/login
export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
};

// ✅ POST /auth/register (with FormData and image)
export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await rawAxios.post<AuthResponse>('/auth/register', payload);
    return data;
};

// ✅ POST /auth/logout (with refresh token)
export const logoutUser = async (refreshToken: string): Promise<LogoutResponse> => {
    const { data } = await api.post<LogoutResponse>('/auth/logout', { 
        refreshToken: refreshToken,
    });
    return data;
};


