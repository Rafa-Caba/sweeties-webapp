import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  width: 100%;
  padding: 1rem;
  justify-items: start;
  align-items: start;
`;

export const UserCard = styled.article`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  gap: 1rem;
`;

export const UserImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 1.5rem;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

export const UserDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 1rem;

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.1rem;
  }

  span {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.textSecondary || '#888'};
  }
`;

export const UserActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-left: auto;
  flex-direction: column;

  button {
    background-color: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.buttonText};
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: ${({ theme }) => theme.colors.buttonHover};
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}50;
    }

    svg {
      width: 1.1rem;
      height: 1.1rem;
    }
  }
`;

export const UserCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border-radius: 16px;
  padding: 1.5rem;
  width: 100%;
  max-width: 580px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) =>
    theme.colors.cardHoverShadow || '0 4px 20px rgba(0, 0, 0, 0.1)'};
    background-color: ${({ theme }) =>
    theme.colors.cardHoverShadow || 'rgba(255, 255, 255, 0.02)'};
  }

  @media (max-width: 1280px) {
    // margin-left: 1rem;
  }
`;

export const UserName = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const UserMeta = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FancyCreateButton = styled(Link)`
  position: fixed;
  top: 7.5rem;
  right: 2rem;
  background-color: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.buttonText};
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: bold;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.colors.cardShadow || '0 4px 12px rgba(0,0,0,0.2)'};
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    top: 7rem;
    right: 1rem;
  }
`;