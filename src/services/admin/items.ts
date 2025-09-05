
import api from '../../api/axios.api';
import type { Item } from '../../types';

export const adminGetItems = async (): Promise<Item[]> => {
    const { data } = await api.get<Item[]>('/items');
    return data;
};

export const adminGetItemById = async (id: string): Promise<Item> => {
    const { data } = await api.get<Item>(`/items/${id}`);
    return data;
};

// ⬇️ Accept FormData directly
export const adminCreateItem = async (form: FormData): Promise<Item> => {
    const { data } = await api.post<Item>('/items', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};

// ⬇️ Accept FormData directly (partial updates OK)
export const adminUpdateItem = async (id: string, form: FormData): Promise<Item> => {
    const { data } = await api.put<Item>(`/items/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};

export const adminDeleteItem = async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete<{ message: string }>(`/items/${id}`);
    return data;
};
