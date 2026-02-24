import api from '../../api/axios.api';

export type CreateOrderResponse = { orderId: string; message: string };

export interface CreateOrderPayload {
    name: string;
    email: string;
    phone: string;
    note?: string;
    total: number;
    items: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
    }[];
}

export const sendOrder = async (data: CreateOrderPayload) => {
    // FIX: Use the 'api' instance and the correct endpoint
    const { data: response } = await api.post<CreateOrderResponse>('/orders', data);
    return response;
};