import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { mapItemFromApi, type Item } from '../../types';
import { getAllItems } from '../../services/public/items';

interface ItemsState {
    items: Item[];
    fetchItems: () => Promise<void>;
}

export const useItemsStore = create<ItemsState>()(
    devtools(
        persist(
            (set) => ({
                items: [],

                fetchItems: async () => {
                    const data = await getAllItems();
                    set({ items: data.map(mapItemFromApi) });
                },
            }),
            { name: 'items-store' }
        )
    )
);
