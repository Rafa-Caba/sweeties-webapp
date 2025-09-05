import { Outlet } from 'react-router-dom';
import {
    LayoutContainer,
    YarnIcon,
    HeroWaveBackground,
} from '../../styles/public/MainLayoutStyles';
import yarnImg from '../../assets/yarn-icon.png';
import { ThemeToggleButton } from '../../components/ThemeToggleButton';

export const AdminLayout = () => {
    return (
        <LayoutContainer>
            <header>
                <ThemeToggleButton />
                {/* You can later add AdminNavbar or sidebar here */}
            </header>

            <YarnIcon src={yarnImg} alt="Yarn Icon" />

            <HeroWaveBackground $isInicio={false}>
                <Outlet />
            </HeroWaveBackground>
        </LayoutContainer>
    );
};
