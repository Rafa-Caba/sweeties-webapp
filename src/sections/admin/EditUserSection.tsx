import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { SectionBody, SectionHeader } from '../../styles/admin/DashboardStyles';
import {
    EditUserWrapper,
    FormGroup,
    FormLabel,
    FormInput,
    FormTextarea,
    FormSelect,
    ImagePreview,
    UploadLabel,
    SubmitButton,
    ErrorMessage
} from '../../styles/admin/EditUserStyles';
import { useUsersStore } from '../../store/admin/useUsersStore';

export const EditUserSection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchUserById, updateUser, loading } = useUsersStore();

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

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;
            const user = await fetchUserById(id);
            if (user) {
                setFormData({
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    password: '',
                    role: user.role.toLowerCase(),
                    bio: user.bio || '',
                    image: null,
                    imagePreview: user.imageUrl || '',
                });
            }
        };
        fetchUser();
    }, [id, fetchUserById]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
        if (!formData.username.trim()) newErrors.username = 'El nombre de usuario es obligatorio.';
        if (!formData.email.trim()) newErrors.email = 'El correo electrónico es obligatorio.';
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

        if (!validateForm()) return;

        // 1. Create the DTO object that matches UpdateUserDTO
        const userDTO = {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            role: formData.role,
            bio: formData.bio,
            // Only include password if the user entered a new one
            ...(formData.password && { password: formData.password })
        };

        // 2. Create the FormData
        const data = new FormData();

        // 3. Append the DTO as a JSON string Blob
        data.append('user', new Blob([JSON.stringify(userDTO)], {
            type: 'application/json'
        }));

        // 4. Append the image file (if it exists)
        if (formData.image) {
            data.append('image', formData.image);
        }

        // 5. Send the FormData
        const success = await updateUser(id!, data);

        if (success) {
            Swal.fire('¡Usuario actualizado!', '', 'success');
            navigate('/admin/users');
        } else {
            Swal.fire('Error', 'Ocurrió un error al actualizar el usuario.', 'error');
        }
    };

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Editar Usuario</h1>
                    <p>Modifica los datos del usuario y actualiza su imagen de perfil</p>
                </div>
            </SectionHeader>

            <SectionBody>
                <EditUserWrapper onSubmit={handleSubmit}>
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
                        <small>Dejar en blanco para mantener la misma contraseña</small>
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
                        <UploadLabel htmlFor="image">Actualizar Imagen</UploadLabel>
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
                            {loading ? 'Actualizando...' : 'Guardar Cambios'}
                        </SubmitButton>
                        <Link to="/admin/users" className='btn btn-secondary mt-0'>Volver</Link>
                    </div>
                </EditUserWrapper>
            </SectionBody>
        </AdminLayout>
    );
};
