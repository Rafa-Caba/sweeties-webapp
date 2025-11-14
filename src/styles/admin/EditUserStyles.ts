import styled from 'styled-components';

export const EditUserWrapper = styled.form`
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
`;

export const FormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const FormInput = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const FormTextarea = styled.textarea`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  min-height: 100px;
`;

export const FormSelect = styled.select`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const ImagePreview = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin: 1rem;
  margin-left: auto;
  margin-right: auto;
`;

export const UploadLabel = styled.label`
  background-color: #f0f0f0;
  padding: 0.5rem;
  border-radius: 8px;
  text-align: center;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.buttonText};
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }
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
  color: red;
  font-size: 0.85rem;
`;
