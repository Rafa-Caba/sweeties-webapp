import styled from 'styled-components';

export const NavbarWrapper = styled.nav<{ $scrolled?: boolean }>`
  position: fixed;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  padding: 0.5rem 1rem;
  border-radius: 12px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s;

  background-color: ${({ theme, $scrolled }) =>
    $scrolled
      ? theme.isDark
        ? 'rgba(0, 0, 0, 0.85)'
        : 'rgba(255, 255, 255, 0.9)'
      : theme.isDark
        ? 'rgba(0, 0, 0, 0.4)'
        : 'rgba(255, 255, 255, 0.5)'};

  border: ${({ $scrolled }) =>
    $scrolled ? '2px solid rgba(255, 255, 255, 0.6)' : '2px solid transparent'};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? '0 0 12px rgba(255, 255, 255, 0.4)' : 'none'};

  backdrop-filter: blur(8px);
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 6px rgba(0, 0, 0, 0.1)'};

  /* Optional Hover Glow Effect */
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  .desktop-links {
    display: flex;
    gap: 0.5rem;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .nav-icon {
    transition: transform 0.2s ease;
    &:hover {
      animation: pulse 0.5s ease;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.08);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (min-width: 769px) {
    background-color: transparent;
    box-shadow: none;
    backdrop-filter: none;
    position: absolute;
    top: 1rem;
    right: 4.5rem;
    left: auto;
  }
`;

export const NavbarItem = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(1.1);
  }
`;

export const CartIcon = styled(NavbarItem)`
  padding: 0.4rem 0.6rem;

  svg {
    font-size: 1rem;
  }
`;

export const HamburgerIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
    margin-top: 0.2rem;
    font-size: 1.6rem;
    z-index: 1001;
  }
`;

export const MobileMenuBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

export const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.background};
  width: 80%;
  max-width: 280px;
  height: 100vh;
  padding: 4rem 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: slideInFromLeft 0.3s ease forwards;

  @keyframes slideInFromLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const MobileMenuItem = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  text-align: left;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;
