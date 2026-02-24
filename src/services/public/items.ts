import api from "../../api/axios.api";
import type { ItemApi } from "../../types";

export const getAllItems = async (): Promise<ItemApi[]> => {
  const { data } = await api.get<ItemApi[]>("/items");
  return data;
};

export const getItemById = async (id: string): Promise<ItemApi> => {
  const { data } = await api.get<ItemApi>(`/items/${id}`);
  return data;
};