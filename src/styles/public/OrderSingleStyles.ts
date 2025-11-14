import styled from 'styled-components';

export const OrderWrapper = styled.section`
    padding: 9rem 6rem;
    max-width: 800px;
    margin: auto;

    @media (max-width: 768px) {
        padding: 8.5rem 1rem 2rem;
        margin: auto 2rem;
    }
`;

export const OrderTitle = styled.h2`
    font-size: 2.5rem;
    text-align: center;
    padding-top: 3rem;
    margin-bottom: 4rem;

    @media (max-width: 768px) {
        font-size: 1.2rem;
        padding-top: 0;
        margin: 1rem auto 4rem;
    }

    @media (max-width: 408px) {
        font-size: 1.1rem;
    }
`;

export const OrderStatus = styled.p<{ $status: string }>`
    font-weight: bold;
    margin-bottom: 1rem;

    color: ${({ $status }) => {
        if ($status === 'PENDIENTE') return '#e67e22';
        if ($status === 'ENVIADO') return '#3498db';
        if ($status === 'ENTREGADO') return '#27ae60';
        return '#333';
    }};
`;

export const OrderItemList = styled.ul`
    margin-top: 1rem;
    padding-left: 1.5rem;

    li {
        margin-bottom: 0.5rem;
    }
`;

export const BackButton = styled.button`
    display: block;
    margin: 3rem auto 0;
    padding: 0.5rem 1.2rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.buttonText};
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.button};
    }

    @media (max-width: 768px) {
        margin: 5.5rem auto 0;
    }

    @media (max-width: 408px) {
        margin: 5rem auto 0;
    }
`;
