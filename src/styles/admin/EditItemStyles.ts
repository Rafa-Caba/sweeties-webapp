import styled from "styled-components";

export const SectionWrapper = styled.div`
  padding: 2rem;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  input, textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
`;

export const PrimaryBtn = styled.button`
  background: #e295d3;
  color: white;
  font-weight: bold;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;