import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    NavBar,
    Brand,
    RightZone,
    AvatarBtn,
    Dropdown,
} from '../../../styles/admin/AdminLayoutStyles';
import { useAuthStore } from '../../../store/admin/useAuthStore';

export const AdminNavbar = () => {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
    const menuWrapRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const { logout, user } = useAuthStore();

    const userName = user?.name;
    const avatarUrl = user?.imageUrl;

    // Sync isMobile with screen size
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeMenu = () => setOpen(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            closeMenu();
        }
    };

    // Close dropdown on outside click or Escape key
    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (ev: PointerEvent) => {
            const path = ev.composedPath?.() || [];
            if (menuWrapRef.current && path.includes(menuWrapRef.current)) return;
            setOpen(false);
        };

        const handleKeyDown = (ev: KeyboardEvent) => {
            if (ev.key === 'Escape') setOpen(false);
        };

        document.addEventListener('pointerdown', handlePointerDown, { capture: true });
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown, { capture: true });
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    const mobileLinks = [
        { to: '/admin/my-profile', label: 'Mi Perfil' },
        { to: '/admin', label: 'Dashboard' },
        { to: '/admin/items', label: 'Items' },
        { to: '/admin/users', label: 'Users' },
        { to: '/admin/public-settings', label: 'Public Settings' },
        { to: '/admin/admin-settings', label: 'Admin Settings' },
    ];

    return (
        <NavBar>
            <Brand as={Link} to="/admin">
                Sweeties | Admin
            </Brand>

            <RightZone>
                <AvatarBtn
                    onClick={() => setOpen((prev) => !prev)}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    aria-label="User menu"
                >
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={userName} />
                    ) : (
                        <span className="initial">{userName?.[0] || 'A'}</span>
                    )}
                </AvatarBtn>

                {open && (
                    <Dropdown ref={menuWrapRef} role="menu" tabIndex={-1}>
                        {isMobile &&
                            mobileLinks.map((link) => (
                                <Link key={link.to} to={link.to} onClick={closeMenu}>
                                    {link.label}
                                </Link>
                            ))}

                        {!isMobile && (
                            <Link to="/admin/my-profile" onClick={closeMenu}>
                                Mi Perfil
                            </Link>
                        )}
                        <Link to="/admin/user-settings" onClick={closeMenu}>
                            Mis Ajustes
                        </Link>
                        {!isMobile && (
                            <Link to="/admin/admin-settings" onClick={closeMenu}>
                                Admin Settings
                            </Link>
                        )}
                        <button type="button" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </Dropdown>
                )}
            </RightZone>
        </NavBar>
    );
};
