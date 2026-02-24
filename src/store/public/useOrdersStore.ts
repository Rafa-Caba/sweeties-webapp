import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Order } from "../../types/public/Order";
import { trackOrder } from "../../services/public/orders";

function getErrorMessage(e: any): string {
    return e?.response?.data?.message || e?.message || "Error al actualizar el pedido.";
}

interface OrdersState {
    orders: Order[];
    loading: boolean;
    error: string | null;

    addOrder: (order: Order) => void;
    fetchOrderDetails: (orderId: string) => Promise<void>;
    clearError: () => void;
}

export const useOrdersStore = create<OrdersState>()(
    devtools(
        persist(
            (set, get) => ({
                orders: [],
                loading: false,
                error: null,

                clearError: () => set({ error: null }),

                addOrder: (order: Order) => {
                    const id = String(order.id);

                    set((state) => {
                        const exists = state.orders.some((o) => String(o.id) === id);
                        const next = exists
                            ? state.orders.map((o) => (String(o.id) === id ? order : o))
                            : [order, ...state.orders];

                        return { orders: next };
                    });
                },

                fetchOrderDetails: async (orderId: string) => {
                    const id = String(orderId);

                    set({ loading: true, error: null });
                    try {
                        const localOrder = get().orders.find((o) => String(o.id) === id);

                        if (!localOrder) {
                            set({
                                error: "Pedido no encontrado en este dispositivo. Usa el rastreo por email.",
                            });
                            return;
                        }

                        const updatedOrder = await trackOrder(id, localOrder.email);

                        set((state) => ({
                            orders: state.orders.map((o) => (String(o.id) === id ? updatedOrder : o)),
                        }));
                    } catch (e: any) {
                        set({ error: getErrorMessage(e) });
                    } finally {
                        set({ loading: false });
                    }
                },
            }),
            {
                name: "public-orders-store",
                partialize: (state) => ({ orders: state.orders }),
            }
        )
    )
);