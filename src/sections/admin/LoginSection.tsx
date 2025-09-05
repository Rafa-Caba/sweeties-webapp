import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/admin/useAuthStore';
import { AuthWrapper, AuthCard, AuthTitle, AuthForm, AuthInput, AuthButton, AuthLink } from '../../styles/admin/AuthStyles';

export const LoginSection = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ username, password });
            navigate('/admin');
        } catch { }
    };

    return (
        <AuthWrapper>
            <AuthCard>
                <AuthTitle>Iniciar Sesión</AuthTitle>
                <AuthForm onSubmit={handleSubmit}>
                    <AuthInput type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <AuthInput type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <AuthButton type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Entrar'}
                    </AuthButton>
                </AuthForm>

                <AuthLink>
                    ¿No tienes cuenta?{' '}
                    <span className="link" onClick={() => navigate('/admin/register')}>
                        Regístrate
                    </span>
                </AuthLink>
            </AuthCard>
        </AuthWrapper>
    );
};
