import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { getUserProfile, loginUser, logoutUser, refreshToken, registerUser } from "../../services/admin/auth";
import { type LoginPayload, type User, type RegisterPayload, mapUserFromApi } from "../../types";
import { showErrorToast } from "../../utils/showToast";
import { updateMyTheme } from "../../services/admin/themes";
import { useUsersStore } from "./useUsersStore";

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
    updateUserTheme: (themeId: string) => Promise<void>;

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
                        const data = await registerUser(payload);
                        const { accessToken, role } = data;

                        set({ token: accessToken, role });

                        const user = await getUserProfile();
                        set({ user });
                    } catch {
                        showErrorToast("Registration failed.");
                    } finally {
                        set({ loading: false });
                    }
                },

                login: async (payload) => {
                    set({ loading: true });
                    try {
                        const data = await loginUser(payload);
                        const { accessToken, role } = data;

                        set({ token: accessToken, role });

                        const user = await getUserProfile();
                        set({ user });
                    } catch (err: any) {
                        showErrorToast("Login failed. Please try again.");
                        throw err;
                    } finally {
                        set({ loading: false });
                    }
                },

                refresh: async () => {
                    set({ loading: true });
                    try {
                        const res = await refreshToken();
                        if (!res?.accessToken) throw new Error("Refresh failed");

                        set({ token: res.accessToken });

                        const user = await getUserProfile();
                        set({ user });

                        return true;
                    } catch {
                        showErrorToast("Session expired. Please log in again.");
                        await get().logout();
                        return false;
                    } finally {
                        set({ loading: false });
                    }
                },

                logout: async () => {
                    set({ loading: true });
                    try {
                        // Cookie-based logout (best-effort)
                        try {
                            const { message } = await logoutUser();
                            set({ user: null, token: null, role: null });
                            return message ?? "Logged out";
                        } catch {
                            set({ user: null, token: null, role: null });
                            return "Logged out";
                        }
                    } catch (err) {
                        showErrorToast("Logout failed.");
                        throw err;
                    } finally {
                        set({ loading: false });
                    }
                },

                updateProfile: async (payload: FormData) => {
                    const { user } = get();
                    if (!user) {
                        showErrorToast("No user found to update.");
                        return null;
                    }

                    set({ loading: true });
                    try {
                        const { updateUser } = useUsersStore.getState();
                        const updatedUser = await updateUser(user.id.toString(), payload);

                        if (updatedUser) {
                            set({ user: updatedUser, loading: false });
                            return updatedUser;
                        } else {
                            throw new Error("Update failed");
                        }
                    } catch (err: any) {
                        showErrorToast(err.response?.data?.message || "Error al actualizar el perfil.");
                        set({ loading: false });
                        throw err;
                    }
                },

                updateUserTheme: async (themeId: string) => {
                    try {
                        const updatedUserApi = await updateMyTheme(themeId);
                        const updatedUser = mapUserFromApi(updatedUserApi);
                        set({ user: updatedUser });
                    } catch (error) {
                        console.error("Failed to save theme preference", error);
                    }
                },
            }),
            {
                name: "AuthStore",
                partialize: (state) => ({
                    user: state.user,
                    token: state.token,
                    role: state.role,
                }),
            }
        )
    )
);