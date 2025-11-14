import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Order } from '../../types/public/Order';
import { trackOrder } from '../../services/public/orders';

interface OrdersState {
    orders: Order[];
    loading: boolean;
    error: string | null;
    
    // Call this after successful checkout
    addOrder: (order: Order) => void; 
    
    // Fetch updates for a specific order
    fetchOrderDetails: (id: number) => Promise<void>;
}

export const useOrdersStore = create<OrdersState>()(
    devtools(
        persist(
            (set, get) => ({
                orders: [],
                loading: false,
                error: null,

                addOrder: (order: Order) => {
                    // Add new order to the top of the list
                    set((state) => ({ 
                        orders: [order, ...state.orders] 
                    }));
                },

                fetchOrderDetails: async (id: number) => {
                    set({ loading: true, error: null });
                    try {
                        // 1. Find the local order to get the email
                        const localOrder = get().orders.find(o => o.id === id);
                        
                        if (!localOrder) {
                            throw new Error("Orden no encontrada localmente");
                        }

                        // 2. Call the secure endpoint with ID + Email
                        const updatedOrder = await trackOrder(id, localOrder.email);
                        
                        // 3. Update state
                        set((state) => ({
                            orders: state.orders.map(o => o.id === id ? updatedOrder : o)
                        }));
                    } catch (error: any) {
                        console.error('Error updating order status:', error);
                        // Don't block the UI, just leave the old data
                    } finally {
                        set({ loading: false });
                    }
                },
            }),
            { name: 'public-orders-store' }
        )
    )
);