import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useThemeContext } from '../../context/ThemeContext';
import { ThemeToggleBtn } from '../../styles/ThemeToggleStyles';

export const ThemeToggleButton = () => {
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
            <ThemeToggleBtn
                onClick={handleToggle}
                data-tooltip-id="themeTip"
                data-tooltip-content={isDark ? 'Cambiar a Claro' : 'Cambiar a Oscuro'}
            >
                <span className={`theme-toggle-icon ${isFlipping ? 'flipping' : ''}`}>{icon}</span>
            </ThemeToggleBtn>
            <Tooltip id="themeTip" place="left" />
        </>
    );
};
