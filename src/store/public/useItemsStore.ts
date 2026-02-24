import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ItemApi } from "../../types";
import { getAllItems, getItemById } from "../../services/public/items";

function getErrorMessage(e: any): string {
    return e?.response?.data?.message || e?.message || "Error al cargar productos.";
}

interface ItemsState {
    items: ItemApi[];
    loading: boolean;
    error: string | null;

    fetchItems: () => Promise<void>;
    fetchItemById: (id: string) => Promise<ItemApi | null>;
}

export const useItemsStore = create<ItemsState>()(
    devtools(
        persist(
            (set, get) => ({
                items: [],
                loading: false,
                error: null,

                fetchItems: async () => {
                    set({ loading: true, error: null });
                    try {
                        const data = await getAllItems();
                        set({ items: data, loading: false });
                    } catch (e: any) {
                        set({ loading: false, error: getErrorMessage(e) });
                    }
                },

                fetchItemById: async (id: string) => {
                    const targetId = String(id);

                    // 1) Try local cache first
                    const cached = get().items.find((it) => String(it.id) === targetId);
                    if (cached) return cached;

                    // 2) Fetch from API if not in cache
                    set({ loading: true, error: null });
                    try {
                        const data = await getItemById(targetId);

                        // merge/update cache
                        const exists = get().items.some((it) => String(it.id) === targetId);
                        set({
                            items: exists
                                ? get().items.map((it) => (String(it.id) === targetId ? data : it))
                                : [data, ...get().items],
                            loading: false,
                        });

                        return data;
                    } catch (e: any) {
                        set({ loading: false, error: getErrorMessage(e) });
                        return null;
                    }
                },
            }),
            {
                name: "public-items-store",
                partialize: (state) => ({ items: state.items }),
            }
        )
    )
);