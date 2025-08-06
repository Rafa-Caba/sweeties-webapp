import axios from 'axios';
import type { CheckoutData } from '../../types/public';

export const sendOrder = async (data: CheckoutData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/checkout`, data);
    return response.data;
};
