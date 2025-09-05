import styled, { keyframes } from 'styled-components';

export const Shell = styled.div`
  display: grid;
  grid-template-rows: 64px auto;
  height: 100dvh;

  .content {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 0;
    height: 100%;
    overflow: hidden;
  }

  @media (max-width: 900px) {
    .content {
      grid-template-columns: 1fr;
    }
  }
`;

export const NavBar = styled.nav`
  height: 90px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 0 1.2rem;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  position: sticky; top: 0; z-index: 10;
`;

export const Brand = styled.div`
  font-weight: 800;
  letter-spacing: .2px;
  text-decoration: none;
`;

export const RightZone = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  position: relative;
`;

export const AvatarBtn = styled.button`
  width: 45px; height: 45px; border-radius: 50%;
  display: grid; place-items: center;
  border: 1px solid rgba(0,0,0,.08);
  background: ${({ theme }) => theme?.colors.card || '#fff'};
  cursor: pointer;
  margin-bottom: 0.5rem;

  img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
  .initial { font-weight: 700; }
`;

export const Dropdown = styled.div`
  position: absolute; right: 0; top: 46px;
  display: grid;
  background: ${({ theme }) => theme?.colors.card || '#fff'};
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 12px;
  overflow: hidden;
  min-width: 200px;
  box-shadow: 0 10px 28px rgba(0,0,0,.12);

  a, button {
    padding: .75rem .9rem;
    text-align: left;
    background: transparent;
    border: 0;
    font: inherit;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }
  a:hover, button:hover { background: rgba(0,0,0,.04); }
`;

export const SideBar = styled.aside`
  border-right: 1px solid rgba(0,0,0,.08);
  padding: 1rem .75rem;
  margin-top: 1.6rem;
  overflow-y: auto;
  background: ${({ theme }) => theme?.colors.sidebarBg || 'rgba(255,255,255,0.6)'};

  @media (max-width: 900px) {
    display: none;
  }
`;

export const SideLink = styled.div`
  display: block;
  padding: .6rem .75rem;
  margin-bottom: .35rem;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  font-weight: 600;
  opacity: .9;

  &.active {
    background: rgba(0,0,0,.08);
  }

  &:hover {
    background: rgba(0,0,0,.06);
  }
`;

export const MainContent = styled.main`
  padding: 1rem clamp(.75rem, 2vw, 1.5rem);
  overflow-y: auto;
  background: transparent;
  margin-top: 1.6rem;
  position: relative;
  z-index: 1;
`;

const indeterminate = keyframes`
  0%   { left: -40%; width: 40%; }
  50%  { left: 20%;  width: 60%; }
  100% { left: 100%; width: 40%; }
`;

export const TopProgress = styled.div<{ $active?: boolean }>`
  position: sticky;
  top: 64px; /* sits just below your navbar height */
  height: 3px;
  width: 100%;
  background: transparent;
  z-index: 20;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.primary});
    transform: translateZ(0);
    border-radius: 999px;
    animation: ${({ $active }) => ($active ? indeterminate : 'none')} 1.2s ease-in-out infinite;
  }
`;