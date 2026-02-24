import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { CartItem } from "../../types/public/CartItem";
import { showAddRemoveiTemToast } from "../../utils/untilsFunctions";

function toId(v: unknown): string {
    return typeof v === "string" ? v : String(v ?? "");
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
    getTotal: () => number;
    getQuantityById: (id: string) => number;
}

export const useCartStore = create<CartState>()(
    devtools(
        persist(
            immer((set, get) => ({
                items: [],

                addItem: (item) => {
                    const id = toId(item.id);
                    const existing = get().items.find((i) => toId(i.id) === id);

                    if (existing) {
                        set((state) => {
                            const found = state.items.find((i: CartItem) => toId(i.id) === id);
                            if (found) found.quantity += 1;
                        });
                    } else {
                        set((state) => {
                            state.items.push({ ...item, id, quantity: 1 });
                        });
                    }

                    showAddRemoveiTemToast();
                },

                removeItem: (rawId) => {
                    const id = toId(rawId);

                    set((state) => {
                        state.items = state.items.filter((i: CartItem) => toId(i.id) !== id);
                    });

                    showAddRemoveiTemToast();
                },

                updateQuantity: (rawId, quantity) => {
                    const id = toId(rawId);

                    set((state) => {
                        const item = state.items.find((i: CartItem) => toId(i.id) === id);
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
                    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
                },

                getQuantityById: (rawId) => {
                    const id = toId(rawId);
                    const item = get().items.find((i) => toId(i.id) === id);
                    return item ? item.quantity : 0;
                },
            })),
            {
                name: "sweeties-cart-storage",
                partialize: (state) => ({ items: state.items }),
            }
        )
    )
);