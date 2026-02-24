import type { User, Role } from "./users";

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    username: string;
    email: string;
    password: string;
}

// ✅ Backend shape (Node BE)
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    role: Role;
    user: User;
}

// ✅ Backend refresh response
export interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
    role: Role;
}

export interface LogoutResponse {
    message: string;
}