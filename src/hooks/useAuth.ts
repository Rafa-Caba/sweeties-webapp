import { useAuthStore } from '../store/admin/useAuthStore';

export const useAuth = () => {
    const {
        user,
        token,
        loading,
        login,
        logout,
        register,
        refresh,
        setUser,
        setToken,
    } = useAuthStore();

    return {
        user,
        token,
        loading,
        login,
        logout,
        register,
        refresh,
        setUser,
        setToken,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'admin',
    };
};
