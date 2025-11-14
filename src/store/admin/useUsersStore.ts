// /store/admin/useUsersStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { mapUserFromApi, type User } from '../../types';
import {
    adminGetAllUsers,
    adminGetUserById,
    adminCreateUser,
    adminUpdateUser,
    adminDeleteUserById,
} from '../../services/admin/users';

interface AdminUsersState {
    users: User[];
    currentUser: User | null;
    loading: boolean;
    loadingCurrent: boolean;
    error: string | null;

    fetchUsers: () => Promise<void>;
    fetchUserById: (id: string) => Promise<User | undefined>;
    clearCurrentUser: () => void;

    createUser: (form: FormData) => Promise<User | null>;
    updateUser: (id: string, form: FormData) => Promise<User | null>;
    deleteUser: (id: string) => Promise<boolean>;
}

export const useUsersStore = create<AdminUsersState>()(
    devtools(
        persist(
            (set, get) => ({
                users: [],
                currentUser: null,
                loading: false,
                loadingCurrent: false,
                error: null,

                fetchUsers: async () => {
                    set({ loading: true, error: null });
                    try {
                        const data = await adminGetAllUsers();

                        set({ users: data.map(mapUserFromApi) });
                    } catch (e: any) {
                        set({ error: e?.message || 'Error loading users' });
                    } finally {
                        set({ loading: false });
                    }
                },

                fetchUserById: async (id) => {
                    set({ loadingCurrent: true, error: null });
                    try {
                        const user = await adminGetUserById(id);
                        const currentUser = mapUserFromApi(user);

                        set({ currentUser });
                        return currentUser;
                    } catch (e: any) {
                        set({ error: e?.message || 'Error loading user' });
                    } finally {
                        set({ loadingCurrent: false });
                    }
                },

                clearCurrentUser: () => set({ currentUser: null }),

                createUser: async (form) => {
                    set({ error: null });
                    try {
                        const created = await adminCreateUser(form);
                        set({ users: [created, ...get().users] });
                        return created;
                    } catch (e: any) {
                        set({ error: e?.message || 'Error creating user' });
                        return null;
                    }
                },

                updateUser: async (id: string, form: FormData) => {
                    set({ error: null });
                    try {
                        const updated = await adminUpdateUser(id, form);
                        const mappedUser = mapUserFromApi(updated); // <-- Map the response
                        set({
                            users: get().users.map((u) => (u.id === mappedUser.id ? mappedUser : u)),
                        });

                        return mappedUser;

                    } catch (e: any) {
                        set({ error: e?.message || 'Error updating user' });
                        return null;
                    }
                },

                deleteUser: async (id) => {
                    set({ error: null });
                    try {
                        await adminDeleteUserById(id);
                        set({ users: get().users.filter((u) => u.id !== Number(id)) }); // <-- FIX
                        
                        return true;

                    } catch (e: any) {
                        set({ error: e?.message || 'Error deleting user' });
                        return false;
                    }
                },
            }),
            { name: 'admin-users-store' }
        )
    )
);
