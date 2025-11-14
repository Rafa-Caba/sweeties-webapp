// store/public/useCartStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { CartItem } from '../../types/public/CartItem';
import { showAddRemoveiTemToast } from '../../utils/untilsFunctions';

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    updateQuantity: (id: number, quantity: number) => void;
    getTotal: () => number;
    getQuantityById: (id: number) => number;
}

export const useCartStore = create<CartState>()(
    devtools(
        persist(
            immer((set, get) => ({
                items: [],

                addItem: (item) => {
                    const existing = get().items.find((i) => i.id === item.id);
                    if (existing) {
                        set((state) => {
                            const found = state.items.find((i: CartItem) => i.id === item.id);
                            if (found) found.quantity += 1;
                        });
                    } else {
                        set((state) => {
                            state.items.push({ ...item, quantity: 1 });
                        });
                    }

                    showAddRemoveiTemToast();
                },

                removeItem: (id) => {
                    set((state) => {
                        state.items = state.items.filter((i: CartItem) => i.id !== id);
                    });

                    showAddRemoveiTemToast();
                },

                updateQuantity: (id, quantity) => {
                    set((state) => {
                        const item = state.items.find((i: CartItem) => i.id === id);
                        if (item) item.quantity = quantity;
                    });

                    showAddRemoveiTemToast();
                },

                clearCart: () => {
                    set((state) => {
                        state.items = [];
                    });
                },

                getTotal: () => {
                    return get().items.reduce((total, item) => {
                        return total + item.price * item.quantity;
                    }, 0);
                },

                getQuantityById: (id) => {
                    const item = get().items.find((i) => i.id === id);
                    return item ? item.quantity : 0;
                },
            })),
            {
                name: 'sweeties-cart-storage', // localStorage key
                partialize: (state) => ({ items: state.items }),
            }
        )
    )
);
