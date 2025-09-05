import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface Props {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <p>Loading...</p>; // Or a spinner

    return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};
