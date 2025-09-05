import { NavLink } from 'react-router-dom';
import { SideBar, SideLink } from '../../../styles/admin/AdminLayoutStyles';

export const AdminSidebar = () => {
    return (
        <SideBar>
            <SideLink as={NavLink} to="/admin" end>Dashboard</SideLink>
            <SideLink as={NavLink} to="/admin/items">Items</SideLink>
            <SideLink as={NavLink} to="/admin/users">Users</SideLink>
            <SideLink as={NavLink} to="/admin/public-settings">Public Settings</SideLink>
            <SideLink as={NavLink} to="/admin/admin-settings">Admin Settings</SideLink>
            <SideLink as={NavLink} to="/admin/my-profile">Mi Perfil</SideLink>
        </SideBar>
    );
};
