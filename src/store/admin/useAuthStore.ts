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

function getErrorMessage(err: any, fallback: string): string {
    return err?.response?.data?.message || err?.message || fallback;
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
                    } catch (err: any) {
                        showErrorToast(getErrorMessage(err, "Registration failed."));
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
                        showErrorToast(getErrorMessage(err, "Login failed. Please try again."));
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
                    } catch (err: any) {
                        showErrorToast(getErrorMessage(err, "Session expired. Please log in again."));
                        await get().logout();
                        return false;
                    } finally {
                        set({ loading: false });
                    }
                },

                logout: async () => {
                    set({ loading: true });
                    try {
                        try {
                            const { message } = await logoutUser();
                            set({ user: null, token: null, role: null });
                            return message ?? "Logged out";
                        } catch {
                            set({ user: null, token: null, role: null });
                            return "Logged out";
                        }
                    } catch (err: any) {
                        showErrorToast(getErrorMessage(err, "Logout failed."));
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
                        const updatedUser = await updateUser(String(user.id), payload);

                        if (updatedUser) {
                            set({ user: updatedUser, loading: false });
                            return updatedUser;
                        }

                        throw new Error("Update failed");
                    } catch (err: any) {
                        showErrorToast(getErrorMessage(err, "Error al actualizar el perfil."));
                        set({ loading: false });
                        throw err;
                    }
                },

                updateUserTheme: async (themeId: string) => {
                    const { user } = get();
                    if (!user) return;

                    try {
                        const updatedUserApi = await updateMyTheme(String(themeId));
                        const updatedUser = mapUserFromApi(updatedUserApi);
                        set({ user: updatedUser });
                    } catch (err: any) {
                        console.error("Failed to save theme preference", err);
                        showErrorToast(getErrorMessage(err, "No se pudo guardar el tema."));
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