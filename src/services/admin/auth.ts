import type {
    LoginPayload,
    AuthResponse,
    LogoutResponse,
    RefreshResponse,
    RegisterPayload,
    User,
} from "../../types";
import api from "../../api/axios.api";

// 🔁 POST /auth/refresh (cookie httpOnly, no args)
export const refreshToken = async (): Promise<RefreshResponse | null> => {
    try {
        // Body vacío; cookie viaja por withCredentials
        const { data } = await api.post<RefreshResponse>("/auth/refresh", {});
        return data;
    } catch (error: any) {
        console.warn("🔁 Refresh token error:", error.response?.data || error.message);
        return null;
    }
};

// ✅ GET /users/me (needs access token)
export const getUserProfile = async (): Promise<User> => {
    const { data } = await api.get<User>("/users/me");
    return data;
};

// ✅ POST /auth/login
export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
};

// ✅ POST /auth/register
export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
};

// ✅ POST /auth/logout (cookie-based, no refresh token needed)
export const logoutUser = async (): Promise<LogoutResponse> => {
    const { data } = await api.post<LogoutResponse>("/auth/logout", {});
    return data;
};