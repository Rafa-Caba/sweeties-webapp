// src/store/admin/useAuthStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getUserProfile, loginUser, logoutUser, refreshToken, registerUser } from '../../services/admin/auth';
import { type LoginPayload, type User, type RegisterPayload, mapUserFromApi } from '../../types';
import { showErrorToast } from '../../utils/showToast';
import { adminUpdateUser } from '../../services/admin/users';
import { updateMyTheme } from '../../services/admin/themes';

interface AuthState {
    user: User | null;
    role: string | null;
    token: string | null;
    loading: boolean;

    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => Promise<string>;
    refresh: () => Promise<boolean>;
    updateProfile: (payload: FormData) => Promise<User | null>;
    updateUserTheme: (themeId: number) => Promise<void>;

    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                user: null,
                role: null,
                token: null,
                loading: false,

                setUser: (user) => set({ user }),
                setToken: (token) => set({ token }),
                setLoading: (val) => set({ loading: val }),

                register: async (payload) => {
                    set({ loading: true });
                    try {
                        // 2. Call registerUser with the JSON payload
                        const data = await registerUser(payload);
                        
                        // 3. Handle the AuthResponseDTO
                        const { accessToken, refreshToken,role } = data;
                        set({ token: accessToken });
                        localStorage.setItem('refreshToken', refreshToken);

                        // 4. Fetch the user profile
                        const user = await getUserProfile();
                        set({ user, role });

                    } catch {
                        showErrorToast('Registration failed.');
                    } finally {
                        set({ loading: false });
                    }
                },

                login: async (payload) => {
                    set({ loading: true });
                    try {
                        // 1. Call loginUser
                        const data = await loginUser(payload); // payload is { email, password }
                        if (!data) throw new Error('Login failed');

                        // 2. Destructure the *correct* response from Spring Boot
                        const { accessToken, refreshToken, role } = data; 
                        
                        // 3. Set the access token and refresh token
                        set({ token: accessToken });
                        localStorage.setItem('refreshToken', refreshToken);

                        // 4. NOW, fetch the user profile (which uses the token you just set)
                        const user = await getUserProfile();
                        set({ user, role })

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
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                            set({ user: null, token: null, role: null });
                            return message;
                        }

                        set({ user: null, token: null, role: null });
                        
                        return 'Logged out';
                    } catch (err) {
                        showErrorToast('Logout failed.');
                        throw err;
                    } finally {
                        set({ loading: false });
                    }
                },

                updateProfile: async (payload: FormData) => {
                    const { user } = get();
                    if (!user) {
                        showErrorToast('No user found to update.');
                        return null;
                    }

                    set({ loading: true });
                    try {
                        // We re-use the existing adminUpdateUser service
                        const updatedApiUser = await adminUpdateUser(user.id.toString(), payload);
                        const updatedUser = mapUserFromApi(updatedApiUser);

                        set({ user: updatedUser, loading: false }); // <-- Update the user in the store
                        return updatedUser;
                    } catch (err: any) {
                        showErrorToast(err.response?.data?.message || 'Error al actualizar el perfil.');
                        set({ loading: false });
                        throw err;
                    }
                },

                updateUserTheme: async (themeId: number) => {
                    // No loading state needed here usually, as it should be instant/optimistic
                    try {
                        // 1. Call API
                        const updatedUserApi = await updateMyTheme(themeId);
                        
                        // 2. Map response
                        const updatedUser = mapUserFromApi(updatedUserApi);

                        // 3. Update local state immediately
                        set({ user: updatedUser });
                        
                        // Optional: You could show a toast, but visual theme change is usually enough feedback
                    } catch (error) {
                        console.error("Failed to save theme preference", error);
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
