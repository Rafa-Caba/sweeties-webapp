import styled from 'styled-components';

export const CartWrapper = styled.section`
    padding: 11rem 1rem 2rem;
    max-width: 900px;
    margin: auto;

    @media (max-width: 768px) {
        padding: 8.5rem 1.5rem 1rem;
    }
`;

export const CartTitle = styled.h2`
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.primary};

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

export const CartEmpty = styled.p`
    text-align: center;
    margin-top: 4rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

export const CartItemCardWrapper = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 1rem 0;

    @media (max-width: 768px) {
        padding: 1rem 1rem;
    }
`;

export const CartItemImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
`;

export const CartItemInfo = styled.div`
    flex: 1;
`;

export const CartItemActions = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    button {
        background-color: ${({ theme }) => theme.colors.primary};
        border: none;
        color: white;
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        cursor: pointer;

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }
`;

export const CartTotal = styled.h3`
    text-align: right;
    margin-top: 2rem;
    margin-bottom: 0;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.creatorName};
`;

export const EmptyCartButton = styled.button`
    display: inline-block;
    margin-top: 2rem;
    padding: 0.5rem 1.5rem;
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(255, 107, 107, 0.3);

    &:hover {
        background-color: #ff4d4d;
        box-shadow: 0 6px 14px rgba(255, 77, 77, 0.5);
        transform: translateY(-2px);
    }

    &:active {
        transform: scale(0.98);
    }

    @media (max-width: 768px) {
        margin-top: 1.5rem;
        order: 2;
    }
`;

export const CartTotalWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    gap: 1rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        align-items: center;
        gap: 0rem;
        flex-direction: column;
    }
`;

export const CheckoutButton = styled.button`
  display: block;
  margin: 2rem auto; 
  padding: 0.9rem 1.6rem;
  background-color: ${({ theme }) => theme.colors.button};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(239, 154, 197, 0.4);
  animation: pulse 2s infinite;

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
    transform: scale(1.03);
    box-shadow: 0 6px 18px rgba(239, 154, 197, 0.6);
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.03); }
    100% { transform: scale(1); }
  }
`;