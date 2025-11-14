import { NavLink } from 'react-router-dom';
import { SideBar, SideLink } from '../../../styles/admin/AdminLayoutStyles';

export const AdminSidebar = () => {
    return (
        <SideBar>
            <SideLink as={NavLink} to="/admin" end>Dashboard</SideLink>
            <SideLink as={NavLink} to="/admin/items">Artículos</SideLink>
            <SideLink as={NavLink} to="/admin/users">Usuarios</SideLink>
            <SideLink as={NavLink} to="/admin/orders">Órdenes</SideLink>
            <SideLink as={NavLink} to="/admin/admin-settings">Ajustes de Administración</SideLink>
            <SideLink as={NavLink} to="/admin/my-profile">Mi Perfil</SideLink>
        </SideBar>
    );
};
