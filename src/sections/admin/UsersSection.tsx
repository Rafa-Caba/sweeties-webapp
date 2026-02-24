import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { AdminLayout } from "../../components/admin/layout/AdminLayout";
import { useUsersStore } from "../../store/admin/useUsersStore";

import { SectionBody, SectionHeader } from "../../styles/admin/DashboardStyles";
import { FancyCreateButton, UsersGrid } from "../../styles/admin/UsersStyles";
import { UserCard } from "../../components/admin/UserCard";

export const UsersSection = () => {
    const navigate = useNavigate();
    const { users, loading, error, fetchUsers, deleteUser } = useUsersStore();

    useEffect(() => {
        if (!users || users.length === 0) {
            fetchUsers();
        }
    }, [users?.length, fetchUsers]);

    const handleDelete = async (id: string) => {
        const { isConfirmed } = await Swal.fire({
            title: "¿Eliminar este usuario?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#e74c3c",
            cancelButtonColor: "#aaa",
            reverseButtons: true,
        });

        if (!isConfirmed) return;

        Swal.fire({
            title: "Eliminando...",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
        });

        const success = await deleteUser(id);

        Swal.close();

        if (success) {
            Swal.fire({
                icon: "success",
                title: "Usuario eliminado",
                timer: 1500,
                showConfirmButton: false,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error al eliminar",
                text: "No se pudo eliminar el usuario.",
            });
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/admin/users/${id}/edit`);
    };

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Usuarios</h1>
                    <p>Administra los usuarios del sistema</p>
                </div>
                <FancyCreateButton to="/admin/users/new">+ Nuevo Usuario</FancyCreateButton>
            </SectionHeader>

            <SectionBody>
                {loading && <p>Cargando usuarios…</p>}
                {error && !loading && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && users.length > 0 && (
                    <UsersGrid>
                        {users.map((user) => (
                            <div key={user.id}>
                                <UserCard user={user} onDelete={() => handleDelete(user.id)} onEdit={() => handleEdit(user.id)} />
                            </div>
                        ))}
                    </UsersGrid>
                )}
            </SectionBody>
        </AdminLayout>
    );
};