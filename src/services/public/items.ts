import api from '../../api/axios.api';
import type { ItemApi } from '../../types';

export const getAllItems = async (): Promise<ItemApi[]> => {
  const res = await api.get<ItemApi[]>('/items');
  return res.data;
};

export const getItemById = async (id: number): Promise<ItemApi> => {
  const res = await api.get<ItemApi>(`/items/${id}`);
  return res.data;
};
