import { Nav } from 'react-bootstrap';
import { usePublicSettingsStore } from '../../store/public/usePublicSettingsStore';
import { LogoImg } from '../../styles/public/InicioStyles';

export const NavbarPublic = () => {
    const { settings } = usePublicSettingsStore();

    // Use the DB logo if available, fallback to local assets
    const logoSrc = settings?.logoLightUrl || '/assets/logo-default.png';
    const siteName = settings?.siteName || 'Sweeties';

    return (
        <Nav>
            <LogoImg src={logoSrc} alt={siteName} />
            {/* ... */}
        </Nav>
    );
};