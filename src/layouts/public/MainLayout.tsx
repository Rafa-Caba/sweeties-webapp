import { Outlet, useLocation } from 'react-router-dom';
import {
    LayoutContainer,
    YarnIcon,
    HeroWaveBackground,
} from '../../styles/public/MainLayoutStyles';
import yarnImg from '../../assets/yarn-icon.png';
import { ThemeToggleButton } from '../../components/public/ThemeToggleButton';
import { PublicNavbar } from '../../components/public/PublicNavbar';

export const MainLayout = () => {
    const location = useLocation();
    const isInicio = location.pathname === '/';

    return (
        <LayoutContainer>
            <header>
                <ThemeToggleButton />
                {!isInicio && <PublicNavbar />}
            </header>

            <YarnIcon src={yarnImg} alt="Yarn Icon" />

            <HeroWaveBackground $isInicio={isInicio}>
                <Outlet />
            </HeroWaveBackground>
        </LayoutContainer>
    );
};
