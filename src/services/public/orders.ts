import api from "../../api/axios.api";
import type { Order } from "../../types/public/Order";

// Public tracking (guest/browser)
export const trackOrder = async (orderId: string, email: string): Promise<Order> => {
    const { data } = await api.post<Order>("/public/orders/track", {
        orderId,
        email,
    });
    return data;
};