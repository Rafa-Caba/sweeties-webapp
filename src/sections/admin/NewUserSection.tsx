import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useUsersStore } from '../../store/admin/useUsersStore';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { SectionBody, SectionHeader } from '../../styles/admin/DashboardStyles';
import {
    NewUserWrapper,
    FormGroup,
    FormLabel,
    FormInput,
    FormTextarea,
    FormSelect,
    ImagePreview,
    UploadLabel,
    SubmitButton,
    ErrorMessage
} from '../../styles/admin/NewUserStyles';
import { Link } from 'react-router-dom';

export const NewUserSection = () => {
    const navigate = useNavigate();
    const { createUser, loading } = useUsersStore();

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        role: 'viewer',
        bio: '',
        image: null as File | null,
        imagePreview: '',
    });

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
        if (!formData.username.trim()) newErrors.username = 'El nombre de usuario es obligatorio.';
        if (!formData.email.trim()) newErrors.email = 'El correo electrónico es obligatorio.';
        if (!formData.password.trim()) newErrors.password = 'La contraseña es obligatoria.';
        if (!formData.role.trim()) newErrors.role = 'El rol es obligatorio.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

        console.log("clicking submit");

        if (!validateForm()) {
            Swal.fire({
                icon: 'error',
                title: 'Campos obligatorios',
                text: 'Por favor completa todos los campos requeridos.',
            });
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('role', formData.role);
        data.append('bio', formData.bio);
        if (formData.image) data.append('image', formData.image);

        const success = await createUser(data);

        if (success) {
            Swal.fire('¡Usuario creado!', '', 'success');
            navigate('/admin/users');
        } else {
            Swal.fire('Error', 'Ocurrió un error al crear el usuario.', 'error');
        }
    };

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Nuevo Usuario</h1>
                    <p>Crea un nuevo usuario con datos básicos e imagen de perfil</p>
                </div>
            </SectionHeader>

            <SectionBody>
                <NewUserWrapper onSubmit={handleSubmit}>
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
                        <FormLabel>Contraseña</FormLabel>
                        <FormInput type="password" name="password" value={formData.password} onChange={handleChange} />
                        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Rol</FormLabel>
                        <FormSelect name="role" value={formData.role} onChange={handleChange}>
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                            <option value="guest">Guest</option>
                        </FormSelect>
                        {errors.role && <ErrorMessage>{errors.role}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Biografía</FormLabel>
                        <FormTextarea name="bio" value={formData.bio} onChange={handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Imagen de Perfil</FormLabel>
                        {formData.imagePreview && <ImagePreview src={formData.imagePreview} alt="Preview" />}
                        <UploadLabel htmlFor="image">Subir Imagen</UploadLabel>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </FormGroup>

                    <div className='d-flex flex-column gap-3'>
                        <SubmitButton type="submit" disabled={loading}>
                            {loading ? 'Creando...' : 'Crear Usuario'}
                        </SubmitButton>
                        <Link to="/admin/users" className='btn btn-secondary mt-0'>Volver</Link>
                    </div>
                </NewUserWrapper>
            </SectionBody>
        </AdminLayout>
    );
};
