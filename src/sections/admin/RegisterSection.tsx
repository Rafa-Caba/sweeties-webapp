import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/admin/useAuthStore';
import { AuthWrapper, AuthCard, AuthTitle, AuthForm, AuthInput, AuthButton, AuthLink } from '../../styles/admin/AuthStyles';
import type { RegisterFormDataFields } from '../../types';

export const RegisterSection = () => {
    const { register, loading } = useAuthStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<RegisterFormDataFields>({
        name: '',
        username: '',
        email: '',
        password: '',
        bio: '',
        image: null,
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

        const payload = new FormData();

        // Append string fields
        payload.append('name', formData.name);
        payload.append('username', formData.username);
        payload.append('email', formData.email);
        payload.append('password', formData.password);
        payload.append('bio', formData.bio);

        // Append image only if selected
        if (formData.image) {
            payload.append('image', formData.image);
        }

        try {
            await register(payload);
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
                    <AuthInput type="text" name="bio" placeholder="Biografía" onChange={handleChange} />
                    <AuthInput type="file" name="image" accept="image/*" onChange={handleChange} />
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
