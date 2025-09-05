// src/store/admin/useAuthStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getUserProfile, loginUser, logoutUser, refreshToken, registerUser } from '../../services/admin/auth';
import type { LoginPayload, User } from '../../types';
import { showErrorToast } from '../../utils/showToast';

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;

    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: FormData) => Promise<void>;
    logout: () => Promise<string>;
    refresh: () => Promise<boolean>;

    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                user: null,
                token: null,
                loading: false,

                setUser: (user) => set({ user }),
                setToken: (token) => set({ token }),
                setLoading: (val) => set({ loading: val }),

                register: async (payload) => {
                    set({ loading: true });
                    try {
                        const user = await registerUser(payload);
                        set({ user });
                    } catch (err) {
                        showErrorToast('Registration failed.');
                    } finally {
                        set({ loading: false });
                    }
                },

                login: async (payload) => {
                    set({ loading: true });
                    try {
                        const data = await loginUser(payload);
                        if (!data) throw new Error('Login failed');

                        const { token, refreshToken, user } = data;
                        set({ user, token });
                        localStorage.setItem('refreshToken', refreshToken);
                    } catch (err: any) {
                        showErrorToast('Login failed. Please try again.');
                        throw err;
                    } finally {
                        set({ loading: false });
                    }
                },

                refresh: async () => {
                    set({ loading: true });
                    try {
                        const refreshTokenValue = localStorage.getItem('refreshToken');
                        if (!refreshTokenValue) throw new Error('No refresh token');

                        const res = await refreshToken(refreshTokenValue);
                        if (!res) throw new Error('Refresh failed');

                        const { accessToken } = res;
                        set({ token: accessToken });

                        const user = await getUserProfile();
                        set({ user });

                        return true;
                    } catch (error) {
                        showErrorToast('Session expired. Please log in again.');
                        await get().logout();
                        return false;
                    } finally {
                        set({ loading: false });
                    }
                },

                logout: async () => {
                    set({ loading: true });

                    try {
                        const refreshTokenValue = localStorage.getItem('refreshToken');

                        if (refreshTokenValue) {
                            const { message } = await logoutUser(refreshTokenValue);
                            localStorage.removeItem('refreshToken');
                            set({ user: null, token: null });
                            return message;
                        }

                        set({ user: null, token: null });
                        return 'Logged out';
                    } catch (err) {
                        showErrorToast('Logout failed.');
                        throw err;
                    } finally {
                        set({ loading: false });
                    }
                },
            }),
            {
                name: 'AuthStore',
                partialize: (state) => ({
                    user: state.user,
                    token: state.token,
                }),
            }
        )
    )
);
