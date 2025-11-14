import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { adminGetOrders, adminGetOrderById, adminUpdateOrderStatus } from '../../services/admin/orders';
import type { Order, OrderStatus } from '../../types';

interface AdminOrdersState {
    orders: Order[];
    currentOrder: Order | null;
    loading: boolean;
    error: string | null;
    
    // Filters
    filterStatus: OrderStatus | 'ALL';
    page: number;

    // Actions
    setFilterStatus: (status: OrderStatus | 'ALL') => void;
    setPage: (page: number) => void;
    fetchOrders: () => Promise<void>;
    fetchOrderById: (id: string) => Promise<void>;
    updateStatus: (id: string, status: OrderStatus) => Promise<boolean>;
}

export const useAdminOrdersStore = create<AdminOrdersState>()(
    devtools((set, get) => ({
        orders: [],
        currentOrder: null,
        loading: false,
        error: null,
        filterStatus: 'ALL',
        page: 0,

        setFilterStatus: (status) => set({ filterStatus: status, page: 0 }), // Reset page on filter change
        setPage: (page) => set({ page }),

        fetchOrders: async () => {
            const { filterStatus, page } = get();
            set({ loading: true, error: null });
            try {
                const data = await adminGetOrders(filterStatus, page);
                set({ orders: data });
            } catch (e: any) {
                set({ error: e.message || 'Error al cargar órdenes' });
            } finally {
                set({ loading: false });
            }
        },

        fetchOrderById: async (id) => {
            set({ loading: true, error: null, currentOrder: null });
            try {
                const data = await adminGetOrderById(id);
                set({ currentOrder: data });
            } catch (e: any) {
                set({ error: e.message || 'Error al cargar el detalle de la orden' });
            } finally {
                set({ loading: false });
            }
        },

        updateStatus: async (id, status) => {
            set({ loading: true });
            try {
                const updated = await adminUpdateOrderStatus(id, status);
                
                // Update in list
                const updatedOrders = get().orders.map(o => o.id === updated.id ? updated : o);
                
                // Update in current detail view
                set({ orders: updatedOrders, currentOrder: updated });
                return true;
            } catch (e: any) {
                set({ error: e.message || 'No se pudo actualizar el estado' });
                return false;
            } finally {
                set({ loading: false });
            }
        }
    }))
);