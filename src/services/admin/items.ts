
import api from '../../api/axios.api';
import type { ItemApi } from '../../types';

export const adminGetItems = async (): Promise<ItemApi[]> => {
    const { data } = await api.get<ItemApi[]>('/items');
    return data;
};

export const adminGetItemById = async (id: number): Promise<ItemApi> => {
    const { data } = await api.get<ItemApi>(`/items/${id}`);
    return data;
};

// ⬇️ Accept FormData directly
export const adminCreateItem = async (form: FormData): Promise<ItemApi> => {
    const { data } = await api.post<ItemApi>('/items', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};

// ⬇️ Accept FormData directly (partial updates OK)
export const adminUpdateItem = async (id: number, form: FormData): Promise<ItemApi> => {
    const { data } = await api.put<ItemApi>(`/items/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};

export const adminDeleteItem = async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete<{ message: string }>(`/items/${id}`);
    return data;
};
