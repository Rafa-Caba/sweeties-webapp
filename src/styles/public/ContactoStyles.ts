import styled from 'styled-components';

export const ContactoWrapper = styled.section`
  padding: 9rem 1rem 4rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 8.5rem 1rem 4rem;
  }
`;

export const ContactoTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ContactoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-x: hidden;

  @media (max-width: 768px) {
    gap: 0rem;
  }
`;

export const ContactoLabel = styled.label`
  text-align: left;
  font-weight: bold;
  font-size: 1rem;
`;

export const ContactoInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
`;

export const ContactoTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  outline: none;
`;

export const ContactoFileInput = styled.input`
  font-size: 1rem;
`;

export const ContactoButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
    transform: scale(1.05);
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 1.5rem;

  label {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  input,
  textarea {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.background};
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    resize: none;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
    }
  }

  input[type='file'] {
    max-width: 100%;
    overflow: hidden;
  }
`;

export const ContactoInfoBox = styled.div`
    background: ${({ theme }) => theme.colors.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    box-shadow: ${({ theme }) => theme.shadows.card};

    p {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.text};
    }

    span {
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.textSecondary};
    }

    .whatsapp-button {
        display: inline-block;
        background-color: #25D366;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 50px;
        text-decoration: none;
        font-weight: bold;
        font-size: 1rem;
        transition: all 0.2s ease;

        &:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }
    }
`;