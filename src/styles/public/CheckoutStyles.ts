import styled from 'styled-components';

export const CheckoutWrapper = styled.section`
    padding: 11rem 1rem 2rem;
    max-width: 800px;
    margin: auto;

    @media (max-width: 768px) {
        padding: 8.5rem 1.5rem 1rem;
    }
`;

export const CheckoutTitle = styled.h2`
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

export const CheckoutForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.text};
    }
`;

export const Input = styled.input`
    padding: 0.6rem 1rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.buttonHover || '#ccc'};
    font-size: 1rem;
`;

export const Textarea = styled.textarea`
    padding: 0.6rem 1rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.buttonHover || '#ccc'};
    font-size: 1rem;
    resize: vertical;
`;

export const SubmitButton = styled.button`
    display: block;
    margin: 2rem auto;
    padding: 0.8rem 1.5rem;
    background-color: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.buttonText};
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    align-self: flex-start;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.buttonHover};
    }
`;
