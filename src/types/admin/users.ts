
export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'editor' | 'viewer' | 'guest';
    bio?: string;
    imageUrl?: string;
    imagePublicId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export const mapUserFromApi = (user: any): User => ({
    _id: user._id,
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    password: user.password || '',
    role: user.role || 'guest',
    bio: user.bio || '',
    imageUrl: user.imageUrl || '',
    imagePublicId: user.imagePublicId || '',
    createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
    updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
});