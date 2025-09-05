import api from '../../api/axios.api';
import type { Item } from '../../types';

export const getAllItems = async (): Promise<Item[]> => {
  const res = await api.get('/items');
  return res.data;
};

export const getItemById = async (id: string): Promise<Item> => {
  const res = await api.get(`/items/${id}`);
  return res.data;
};
