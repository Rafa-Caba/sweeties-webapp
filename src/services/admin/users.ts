import api from "../../api/axios.api";
import type { User } from "../../types";

export type PaginatedUsersResponse = {
    page: number;
    limit: number;
    total: number;
    items: User[];
};

// GET /api/users (admin) -> { page, limit, total, items }
export const adminGetAllUsers = async (): Promise<PaginatedUsersResponse> => {
    const { data } = await api.get<PaginatedUsersResponse>("/users");
    return data;
};

export const adminGetUserById = async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
};

// multipart/form-data (user JSON blob + optional image file)
export const adminCreateUser = async (form: FormData): Promise<User> => {
    const { data } = await api.post<User>("/users", form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
};

// PATCH /api/users/:id (multipart)
export const adminUpdateUser = async (id: string, form: FormData): Promise<User> => {
    const { data } = await api.patch<User>(`/users/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
};

export const adminDeleteUserById = async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete<{ message: string }>(`/users/${id}`);
    return data;
};