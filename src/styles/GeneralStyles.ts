import styled from "styled-components";

export const ItemButton = styled.button`
    background-color: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.buttonText};
    border: none;
    border-radius: 999px;
    padding: 0.6rem 2rem;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    margin: 4rem auto 1rem;

    display: flex;
    align-items: center;
    align-self: center;
    justify-content: center;

    &:hover {
        filter: brightness(1.1);
        background-color: ${({ theme }) => theme.colors.buttonHover};
    }
`;