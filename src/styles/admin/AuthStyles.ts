import styled from 'styled-components';

export const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const AuthCard = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 100%;
  max-width: 420px;
`;

export const AuthTitle = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AuthInput = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
`;

export const AuthButton = styled.button`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.button};
  }
`;

export const AuthLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;

  .link {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.accent};
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.buttonHover};
      text-decoration: underline;
    }
  }
`;
