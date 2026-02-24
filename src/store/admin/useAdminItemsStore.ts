
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";


import {
    adminGetItems,
    adminCreateItem,
    adminUpdateItem,
    adminDeleteItem,
    adminGetItemById,
} from "../../services/admin/items";
import { mapItemFromApi, normalizeItemApiForForm, type Item, type ItemApi } from "../../types";

function getErrorMessage(e: any): string {
    // Axios: e.response?.data?.message
    return (
        e?.response?.data?.message ||
        e?.message ||
        "Network Error"
    );
}

interface AdminItemsState {
    // Lightweight list for cards/table
    items: Item[];
    loading: boolean;

    // Full detail record for edit pages/modals
    currentItemApi: ItemApi | null;
    loadingCurrent: boolean;

    error: string | null;

    fetchItems: () => Promise<void>;
    fetchItemById: (id: string) => Promise<void>;
    clearCurrentItem: () => void;

    createItem: (form: FormData) => Promise<ItemApi | null>;
    updateItem: (id: string, form: FormData) => Promise<ItemApi | null>;
    deleteItem: (id: string) => Promise<boolean>;
}

export const useAdminItemsStore = create<AdminItemsState>()(
    devtools(
        persist(
            (set, get) => ({
                items: [],
                loading: false,

                currentItemApi: null,
                loadingCurrent: false,

                error: null,

                fetchItems: async () => {
                    set({ loading: true, error: null });
                    try {
                        const data = await adminGetItems();
                        set({ items: (data as ItemApi[]).map(mapItemFromApi), error: null });
                    } catch (e: any) {
                        set({ error: getErrorMessage(e) });
                    } finally {
                        set({ loading: false });
                    }
                },

                fetchItemById: async (id: string) => {
                    set({ loadingCurrent: true, error: null });
                    try {
                        const data = await adminGetItemById(id);
                        // Keep the full API shape for edit screens
                        set({ currentItemApi: normalizeItemApiForForm(data), error: null });
                    } catch (e: any) {
                        set({ error: getErrorMessage(e) });
                    } finally {
                        set({ loadingCurrent: false });
                    }
                },

                clearCurrentItem: () => set({ currentItemApi: null }),

                createItem: async (form: FormData) => {
                    set({ error: null });
                    try {
                        const createdApi = await adminCreateItem(form);
                        const createdListItem = mapItemFromApi(createdApi);

                        set({ items: [createdListItem, ...get().items] });
                        return createdApi;
                    } catch (e: any) {
                        set({ error: getErrorMessage(e) || "Error al crear item" });
                        return null;
                    }
                },

                updateItem: async (id: string, form: FormData) => {
                    set({ error: null });
                    try {
                        const updatedApi = await adminUpdateItem(id, form);
                        const updatedListItem = mapItemFromApi(updatedApi);

                        set({
                            items: get().items.map((it) => (it.id === updatedListItem.id ? updatedListItem : it)),
                            currentItemApi:
                                get().currentItemApi?.id === updatedApi.id
                                    ? normalizeItemApiForForm(updatedApi)
                                    : get().currentItemApi,
                        });

                        return updatedApi;
                    } catch (e: any) {
                        set({ error: getErrorMessage(e) || "Error al actualizar item" });
                        return null;
                    }
                },

                deleteItem: async (id: string) => {
                    set({ error: null });
                    try {
                        await adminDeleteItem(id);
                        set({ items: get().items.filter((it) => it.id !== id) });

                        if (get().currentItemApi?.id === id) set({ currentItemApi: null });
                        return true;
                    } catch (e: any) {
                        set({ error: getErrorMessage(e) || "Error al eliminar item" });
                        return false;
                    }
                },
            }),
            {
                name: "admin-items-store",
                // Persist only the lightweight list for performance/stability.
                partialize: (state) => ({
                    items: state.items,
                }),
            }
        )
    )
);