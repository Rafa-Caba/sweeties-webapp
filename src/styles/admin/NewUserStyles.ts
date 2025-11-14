import styled from 'styled-components';

export const NewUserWrapper = styled.form`
  width: 75%;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    width: 95%;
    padding: 1.5rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const FormLabel = styled.label`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const FormInput = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.6rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}40;
  }
`;

export const FormSelect = styled.select`
  padding: 0.8rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.6rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}40;
  }
`;

export const FormTextarea = styled.textarea`
  padding: 0.8rem 1rem;
  min-height: 120px;
  resize: vertical;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.6rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}40;
  }
`;

export const UploadLabel = styled.label`
  display: inline-block;
  padding: 0.6rem 1rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.buttonText};
  border-radius: 0.6rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }
`;

export const ImagePreview = styled.img`
  width: 175px;
  height: 175px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: 0.6rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: -1rem;
`;