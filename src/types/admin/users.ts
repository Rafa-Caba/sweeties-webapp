export type Role = "admin" | "editor" | "viewer" | "guest";

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    role: Role;

    bio: string | null;
    imageUrl: string | null;
    imagePublicId: string | null;
    themeId: string | null;
}

export const mapUserFromApi = (user: any): User => ({
    id: String(user?.id ?? ""),
    name: user?.name ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    role: (user?.role ?? "guest") as Role,

    bio: user?.bio ?? null,
    imageUrl: user?.imageUrl ?? null,
    imagePublicId: user?.imagePublicId ?? null,
    themeId: user?.themeId ?? null,
});