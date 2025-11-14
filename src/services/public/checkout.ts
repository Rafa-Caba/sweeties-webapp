import api from '../../api/axios.api';
// import type { CheckoutData } from '../../types/public';

// Use 'CreateOrderDTO' structure
export interface CreateOrderPayload {
    name: string;
    email: string;
    phone: string;
    note?: string;
    total: number;
    items: {
        productId: string; // Backend expects 'productId'
        name: string;
        price: number;
        quantity: number;
    }[];
}

export const sendOrder = async (data: CreateOrderPayload) => {
    // FIX: Use the 'api' instance and the correct endpoint
    const { data: response } = await api.post('/orders', data);
    return response;
};