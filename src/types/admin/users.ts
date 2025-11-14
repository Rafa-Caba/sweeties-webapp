
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: 'ADMIN' | 'EDITOR' | 'VIEWER' | 'GUEST';
    bio?: string;
    imageUrl?: string;
    imagePublicId?: string;
    themeId?: number;
}

export const mapUserFromApi = (user: any): User => ({
    id: user.id,
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    role: (user.role || 'guest').toUpperCase(),
    bio: user.bio || '',
    imageUrl: user.imageUrl || '',
    imagePublicId: user.imagePublicId || '',
    themeId: user.themeId,
});