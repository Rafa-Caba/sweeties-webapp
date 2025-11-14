import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { mapItemFromApi, type Item, type ItemApi } from '../../types'; // Import ItemApi
import { getAllItems } from '../../services/public/items';

interface ItemsState {
    items: Item[];
    loading: boolean;
    error: string | null;
    fetchItems: () => Promise<void>;
}

export const useItemsStore = create<ItemsState>()(
    devtools(
        persist(
            (set) => ({
                items: [],
                loading: false,
                error: null,

                fetchItems: async () => {
                    // 1. Set loading state to true
                    set({ loading: true, error: null }); 
                    try {
                        // 2. Fetch the raw API data
                        const data: ItemApi[] = await getAllItems(); 
                        
                        // 3. Map it and set state
                        set({ items: data.map(mapItemFromApi), loading: false });
                    } catch (err: any) {
                        // 4. Set error state if the fetch fails
                        const errorMessage = err?.message || 'Error al cargar productos.';
                        set({ loading: false, error: errorMessage });
                        console.error("Failed to fetch items:", errorMessage);
                    }
                },
            }),
            { name: 'items-store' }
        )
    )
);