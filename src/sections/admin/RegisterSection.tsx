import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/admin/useAuthStore';
import { AuthWrapper, AuthCard, AuthTitle, AuthForm, AuthInput, AuthButton, AuthLink } from '../../styles/admin/AuthStyles';
import type { RegisterPayload } from '../../types';

export const RegisterSection = () => {
    const { register, loading } = useAuthStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<RegisterPayload>({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Append image only if selected

        try {
            await register(formData);
            navigate('/admin');
        } catch (err) {
            console.error('❌ Registration failed:', err);
        }
    };

    return (
        <AuthWrapper>
            <AuthCard>
                <AuthTitle>Crear Cuenta</AuthTitle>
                <AuthForm onSubmit={handleSubmit}>
                    <AuthInput type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
                    <AuthInput type="text" name="username" placeholder="Usuario" onChange={handleChange} required />
                    <AuthInput type="email" name="email" placeholder="Correo" onChange={handleChange} required />
                    <AuthInput type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
                    <AuthButton type="submit" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </AuthButton>
                </AuthForm>

                <AuthLink>
                    ¿Ya tienes cuenta? {' '}
                    <span className="link" onClick={() => navigate('/admin/login')}>
                        Inicia sesión
                    </span>
                </AuthLink>
            </AuthCard>
        </AuthWrapper>
    );
};
