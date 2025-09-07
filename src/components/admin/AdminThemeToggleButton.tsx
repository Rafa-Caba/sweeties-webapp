import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useThemeContext } from '../../context/ThemeContext';
import { AdminThemeToggleBtn } from '../../styles/ThemeToggleStyles';

export const AdminThemeToggleButton = () => {
    const { isDark, toggleTheme } = useThemeContext();
    const icon = isDark ? '🌞' : '🌙';
    const [isFlipping, setIsFlipping] = useState(false);

    const handleToggle = () => {
        setIsFlipping(true);
        toggleTheme();
    };

    useEffect(() => {
        if (isFlipping) {
            const timeout = setTimeout(() => setIsFlipping(false), 600);
            return () => clearTimeout(timeout);
        }
    }, [isFlipping]);

    return (
        <>
            <AdminThemeToggleBtn
                onClick={handleToggle}
                data-tooltip-id="themeTip"
                data-tooltip-content={isDark ? 'Cambiar a Claro' : 'Cambiar a Oscuro'}
            >
                <span className={`theme-toggle-icon ${isFlipping ? 'flipping' : ''}`}>{icon}</span>
            </AdminThemeToggleBtn>

            <Tooltip id="themeTip" place="left" />
        </>
    );
};
