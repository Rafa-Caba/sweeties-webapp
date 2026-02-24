import api from "../../api/axios.api";
import type { User, Role } from "../../types";

export type PaginatedUsersResponse = {
    page: number;
    limit: number;
    total: number;
    items: User[];
};

export type CreateUserPayload = {
    name: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    bio: string | null;
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

// POST /api/users (JSON body)
// Backend route currently validates CreateUserSchema (JSON) and does NOT accept `user` multipart field.
export const adminCreateUser = async (payload: CreateUserPayload): Promise<User> => {
    const { data } = await api.post<User>("/users", payload);
    return data;
};

// PATCH /api/users/:id (multipart)
// Backend expects: `user` JSON STRING + optional `image` file
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