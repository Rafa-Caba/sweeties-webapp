import api from '../../api/axios.api';
import type { User } from '../../types';

export const adminGetAllUsers = async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');
    console.log({ adminGetAllUsers: data });
    return data;
};

export const adminGetUserById = async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
};

export const adminCreateUser = async (form: FormData): Promise<User> => {
    const { data } = await api.post<User>('/users', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log({ adminCreateUser: data });
    return data;
};

export const adminUpdateUser = async (id: string, form: FormData): Promise<User> => {
    const { data } = await api.put<User>(`/users/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};

export const adminDeleteUserById = async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete<{ message: string }>(`/users/${id}`);
    return data;
};
