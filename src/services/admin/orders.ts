import api from "../../api/axios.api";
import type { Order, OrderStatus } from "../../types";

// GET /api/orders?status=...&page=...
export const adminGetOrders = async (status?: string, page = 0): Promise<Order[]> => {
    const params: any = { page, size: 20 };
    if (status && status !== "ALL") params.status = status;

    const { data } = await api.get<Order[]>("/orders", { params });
    return data;
};

// GET /api/orders/{id}
export const adminGetOrderById = async (id: string): Promise<Order> => {
    const { data } = await api.get<Order>(`/orders/${id}`);
    return data;
};

// PATCH /api/orders/{id}/status
export const adminUpdateOrderStatus = async (id: string, status: OrderStatus): Promise<Order> => {
    const { data } = await api.patch<Order>(`/orders/${id}/status`, { status });
    return data;
};

// PATCH /api/orders/{id}/retry-emails
export const adminRetryOrderEmails = async (id: string): Promise<Order> => {
    const { data } = await api.patch<Order>(`/orders/${id}/retry-emails`, {});
    return data;
};

// GET /api/orders/export (csv)
export const adminExportOrdersCsv = async (): Promise<Blob> => {
    const { data } = await api.get("/orders/export", { responseType: "blob" });
    return data as Blob;
};