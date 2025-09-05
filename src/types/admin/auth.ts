import type { User } from "./users";

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    username: string;
    email: string;
    password: string;
    bio: string;
    image: File | null;
}

export interface LoginResponse {
    message: string;
    token: string;
    refreshToken: string;
    user: User;
}

export interface RefreshResponse {
    accessToken: string;
}

export interface LogoutResponse {
    message: string;
}

export interface RegisterFormDataFields {
    name: string;
    username: string;
    email: string;
    password: string;
    bio: string;
    image: File | null;
}
