import api from '../../api/axios.api';
import type { Order } from '../../types/public/Order';

export const getOrderById = async (id: string): Promise<Order> => {
    const { data } = await api.get<Order>(`/orders/${id}`);
    return data;
};

export const trackOrder = async (orderId: number, email: string): Promise<Order> => {
    const { data } = await api.post<Order>('/public/orders/track', { 
        orderId, 
        email 
    });
    return data;
};