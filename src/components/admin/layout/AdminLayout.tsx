import { type PropsWithChildren } from 'react';
import { AdminNavbar } from './AdminNavbar';
import { AdminSidebar } from './AdminSidebar';
import { Shell, MainContent } from '../../../styles/admin/AdminLayoutStyles';

export const AdminLayout = ({ children }: PropsWithChildren) => {
    return (
        <Shell>
            <AdminNavbar />
            <div className="content">
                <AdminSidebar />
                <MainContent>{children}</MainContent>
            </div>
        </Shell>
    );
};
