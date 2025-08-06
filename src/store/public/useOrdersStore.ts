import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Order } from '../../types/public/Order';

interface OrdersState {
    orders: Order[];
    loading: boolean;
    fetchOrders: () => Promise<void>;
}

export const useOrdersStore = create<OrdersState>()(
    devtools(
        immer((set) => ({
            orders: [],
            loading: false,

            fetchOrders: async () => {
                try {
                    set((state) => { state.loading = true });

                    // Dummy for now (can later replace with `getOrders()` service call)
                    const dummyOrders: Order[] = [
                        {
                            id: 'ORD-001',
                            createdAt: '2025-08-06T12:00:00Z',
                            status: 'pendiente',
                            total: 150,
                            items: [
                                { id: '1', name: 'Muñeco Conejito', price: 50, quantity: 3 },
                            ],
                        },
                    ];

                    set((state) => { state.orders = dummyOrders });
                } catch (error) {
                    console.error('Error loading orders:', error);
                } finally {
                    set((state) => { state.loading = false });
                }
            }
        }))
    )
);
