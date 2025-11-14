// ... imports same as before ...
import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { useAuthStore } from '../../store/admin/useAuthStore';
import { SectionBody, SectionHeader } from '../../styles/admin/DashboardStyles';
import { GhostBtn } from '../../styles/admin/ItemsFormStyles'; // Import GhostBtn
import { ErrorMessage, FormGroup, FormInput, FormLabel, FormTextarea, ImagePreview, ProfileWrapper, SubmitButton, UploadLabel } from '../../styles/admin/ProfileStyles';
import { showErrorToast, showSuccessToast } from '../../utils/showToast';

interface Props {
    onCancel: () => void; // <-- Add this prop
}

export const EditProfileSection = ({ onCancel }: Props) => { // Accept the prop
    const { user, updateProfile, loading } = useAuthStore();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '', // For changing password
        bio: '',
        image: null as File | null,
        imagePreview: '',
    });

    // Pre-fill the form when the component loads or user changes
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                username: user.username,
                email: user.email,
                password: '', // Always blank on load
                bio: user.bio || '',
                image: null,
                imagePreview: user.imageUrl || '',
            });
        }
    }, [user]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
        if (!formData.username.trim()) newErrors.username = 'El nombre de usuario es obligatorio.';
        if (!formData.email.trim()) newErrors.email = 'El correo electrónico es obligatorio.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    image: file,
                    imagePreview: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            showErrorToast('Por favor completa todos los campos requeridos.');
            return;
        }

        // 1. Create the DTO (this matches the UpdateUserDTO)
        // We DON'T send 'role' here, as users can't change their own role
        const userDTO = {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            bio: formData.bio,
            // Only add password if the user typed one in
            ...(formData.password && { password: formData.password }),
        };

        // 2. Create the FormData
        const data = new FormData();
        data.append('user', new Blob([JSON.stringify(userDTO)], {
            type: 'application/json'
        }));

        if (formData.image) {
            data.append('image', formData.image);
        }

        const updatedUser = await updateProfile(data);

        if (updatedUser) {
            showSuccessToast('Perfil actualizado con éxito');
            onCancel(); // <-- SWITCH BACK TO VIEW MODE ON SUCCESS
        }
    };

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Editar Perfil</h1>
                    <p>Actualiza tus datos</p>
                </div>
            </SectionHeader>

            <SectionBody>
                <ProfileWrapper onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>Nombre</FormLabel>
                        <FormInput name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Usuario</FormLabel>
                        <FormInput name="username" value={formData.username} onChange={handleChange} />
                        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormInput type="email" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Nueva Contraseña</FormLabel>
                        <FormInput type="password" name="password" value={formData.password} onChange={handleChange} />
                        <small>Dejar en blanco para no cambiar la contraseña.</small>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Biografía</FormLabel>
                        <FormTextarea name="bio" value={formData.bio} onChange={handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            marginBottom: '2.5rem'
                        }}>
                            <FormLabel>Imagen de Perfil</FormLabel>
                            {formData.imagePreview && <ImagePreview src={formData.imagePreview} alt="Preview" />}
                            <UploadLabel htmlFor="image">Actualizar Imagen</UploadLabel>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            </div>
                    </FormGroup>

                    {/* UPDATE THE BUTTONS AREA */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                        <GhostBtn type="button" onClick={onCancel}>
                            Cancelar
                        </GhostBtn>
                        <SubmitButton type="submit" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </SubmitButton>
                    </div>
                </ProfileWrapper>
            </SectionBody>
        </AdminLayout>
    );
};