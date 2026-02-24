import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
    adminExportOrdersCsv,
    adminGetOrderById,
    adminGetOrders,
    adminRetryOrderEmails,
    adminUpdateOrderStatus,
} from "../../services/admin/orders";
import type { Order, OrderStatus } from "../../types";

function getErrorMessage(e: any): string {
    return e?.response?.data?.message || e?.message || "Error";
}

interface AdminOrdersState {
    orders: Order[];
    currentOrder: Order | null;
    loading: boolean;
    error: string | null;

    filterStatus: OrderStatus | "ALL";
    page: number;

    setFilterStatus: (status: OrderStatus | "ALL") => void;
    setPage: (page: number) => void;

    fetchOrders: () => Promise<void>;
    fetchOrderById: (id: string) => Promise<void>;
    updateStatus: (id: string, status: OrderStatus) => Promise<boolean>;

    retryEmails: (id: string) => Promise<boolean>;
    exportCsv: () => Promise<boolean>;
}

export const useAdminOrdersStore = create<AdminOrdersState>()(
    devtools((set, get) => ({
        orders: [],
        currentOrder: null,
        loading: false,
        error: null,
        filterStatus: "ALL",
        page: 0,

        setFilterStatus: (status) => set({ filterStatus: status, page: 0 }),
        setPage: (page) => set({ page }),

        fetchOrders: async () => {
            const { filterStatus, page } = get();
            set({ loading: true, error: null });
            try {
                const data = await adminGetOrders(filterStatus, page);
                set({ orders: data });
            } catch (e: any) {
                set({ error: getErrorMessage(e) });
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
                set({ error: getErrorMessage(e) });
            } finally {
                set({ loading: false });
            }
        },

        updateStatus: async (id, status) => {
            set({ loading: true, error: null });
            try {
                const updated = await adminUpdateOrderStatus(id, status);

                const updatedOrders = get().orders.map((o) => (o.id === updated.id ? updated : o));
                set({ orders: updatedOrders, currentOrder: updated });
                return true;
            } catch (e: any) {
                set({ error: getErrorMessage(e) });
                return false;
            } finally {
                set({ loading: false });
            }
        },

        retryEmails: async (id) => {
            set({ loading: true, error: null });
            try {
                const updated = await adminRetryOrderEmails(id);

                const updatedOrders = get().orders.map((o) => (o.id === updated.id ? updated : o));
                set({ orders: updatedOrders, currentOrder: updated });
                return true;
            } catch (e: any) {
                set({ error: getErrorMessage(e) });
                return false;
            } finally {
                set({ loading: false });
            }
        },

        exportCsv: async () => {
            set({ error: null });
            try {
                const blob = await adminExportOrdersCsv();

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);

                return true;
            } catch (e: any) {
                set({ error: getErrorMessage(e) });
                return false;
            }
        },
    }))
);