import styled from 'styled-components';

export const ThemeToggleBtn = styled.button`
    position: fixed;
    top: 1rem;
    right: 2rem;
    z-index: 1002;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    transition: color 0.3s;

    &:hover {
        color: ${({ theme }) => theme.colors.accent};
    }

    .theme-toggle-icon {
        display: inline-block;
        transition: transform 0.3s ease;
        &.flipping {
            animation: flip 0.6s ease;
        }
    }

    @keyframes flip {
        0% {
            transform: rotateY(0);
        }
        50% {
            transform: rotateY(90deg);
            opacity: 0;
        }
        51% {
            transform: rotateY(270deg);
            opacity: 0;
        }
        100% {
            transform: rotateY(360deg);
            opacity: 1;
        }
    }
`;

export const AdminThemeToggleBtn = styled.button`
    position: fixed;
    top: 1.2rem;
    right: 4.8rem;
    z-index: 1002;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    transition: color 0.3s;

    &:hover {
        color: ${({ theme }) => theme.colors.accent};
    }

    .theme-toggle-icon {
        display: inline-block;
        transition: transform 0.3s ease;
        &.flipping {
            animation: flip 0.6s ease;
        }
    }

    @keyframes flip {
        0% {
            transform: rotateY(0);
        }
        50% {
            transform: rotateY(90deg);
            opacity: 0;
        }
        51% {
            transform: rotateY(270deg);
            opacity: 0;
        }
        100% {
            transform: rotateY(360deg);
            opacity: 1;
        }
    }
`;
