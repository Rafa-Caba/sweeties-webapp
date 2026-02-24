import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/admin/useAuthStore";
import { refreshToken } from "../services/admin/auth";

const BASE_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:4000/api";

export const api = axios.create({
    baseURL: BASE_URL,
    // send cookies (refreshToken httpOnly)
    withCredentials: true,
});

// Add Authorization header if token is available
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = useAuthStore.getState().token;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Handle 401 Unauthorized and refresh token via cookie
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Avoid infinite loop
        if (error.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;

            try {
                // No localStorage refreshToken. Cookie is source of truth.
                const refreshed = await refreshToken();
                if (!refreshed?.accessToken) throw new Error("Token refresh failed");

                useAuthStore.getState().setToken(refreshed.accessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`;
                }

                return api(originalRequest);
            } catch (refreshError) {
                // If refresh fails, logout locally
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }

        // Optional: handle login error messages
        if (error.response?.status === 401 && error.config?.url?.includes("/auth/login")) {
            return Promise.reject(new Error("Invalid credentials"));
        }

        return Promise.reject(error);
    }
);

export default api;