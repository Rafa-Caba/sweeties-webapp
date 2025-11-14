import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { mapItemFromApi, type Item } from '../../types';
import {
    adminGetItems,
    adminCreateItem,
    adminUpdateItem,
    adminDeleteItem,
    adminGetItemById,
} from '../../services/admin/items';

interface AdminItemsState {
    items: Item[];
    loading: boolean;
    currentItem: Item | null;
    loadingCurrent: boolean;
    error: string | null;

    fetchItems: () => Promise<void>;
    fetchItemById: (id: number) => Promise<void>
    clearCurrentItem: () => void;

    createItem: (form: FormData) => Promise<Item | null>;
    updateItem: (id: number, form: FormData) => Promise<Item | null>;
    deleteItem: (id: string) => Promise<boolean>;
}

export const useAdminItemsStore = create<AdminItemsState>()(
    devtools(
        persist(
            (set, get) => ({
                items: [],
                loading: false,
                currentItem: null,
                loadingCurrent: false,
                error: null,

                fetchItems: async () => {
                    set({ loading: true, error: null });
                    try {
                        const data = await adminGetItems();
                        set({ items: data.map(mapItemFromApi) });
                    } catch (e: any) {
                        set({ error: e?.message || 'Error al cargar items' });
                    } finally {
                        set({ loading: false });
                    }
                },

                fetchItemById: async (id) => {
                    set({ loadingCurrent: true, error: null });
                    try {
                        const data = await adminGetItemById(id);
                        set({ currentItem: mapItemFromApi(data) });
                    } catch (e: any) {
                        set({ error: e?.message || 'Error al cargar item' });
                    } finally {
                        set({ loadingCurrent: false });
                    }
                },

                clearCurrentItem: () => set({ currentItem: null }),

                createItem: async (form) => {
                    set({ error: null });
                    try {
                        const createdApi = await adminCreateItem(form); // 1. Get the raw API response
                        if (!createdApi) return null; // Handle null/undefined case

                        // 2. Map the raw API data to your clean Item type
                        const created = mapItemFromApi(createdApi); 

                        // 3. Add the *mapped* object to the state
                        set({ items: [created, ...get().items] });
                        
                        return created;
                    } catch (e: any) {
                        set({ error: e?.message || 'Error al crear item' });
                        return null;
                    }
                },

                updateItem: async (id, form) => {
                    set({ error: null });
                    try {
                        const updatedApi = await adminUpdateItem(id, form);
                        const updated = mapItemFromApi(updatedApi);
                        set({
                            items: get().items.map((it) => (it.id === updated.id ? updated : it)),
                        });
                        return updated;
                    } catch (e: any) {
                        set({ error: e?.message || 'Error al actualizar item' });
                        return null;
                    }
                },

                deleteItem: async (id) => {
                    set({ error: null });
                    try {
                        await adminDeleteItem(id);
                        // Compare number to string, so we must convert
                        set({ items: get().items.filter((it) => it.id !== Number(id)) });
                        return true;
                    } catch (e: any) {
                        set({ error: e?.message || 'Error al eliminar item' });
                        return false;
                    }
                },
            }),
            { name: 'admin-items-store' }
        )
    )
);
