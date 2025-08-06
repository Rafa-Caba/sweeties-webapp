import styled from 'styled-components';

export const OrdersWrapper = styled.section`
    padding: 9.5rem 1rem 2rem;
    max-width: 900px;
    margin: auto;

    @media (max-width: 768px) {
        padding: 8.5rem 1rem 2rem;
    }
`;

export const OrdersTitle = styled.h2`
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

export const OrderCardItem = styled.div`
    background: ${({ theme }) => theme.colors.waveTop};
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

export const OrderStatus = styled.p<{ status: string }>`
  font-weight: bold;
  color: ${({ status }) => {
        if (status === 'pendiente') return '#e67e22';
        if (status === 'enviado') return '#3498db';
        if (status === 'entregado') return '#27ae60';
        return '#333';
    }};
`;

export const OrderItemList = styled.ul`
  margin-top: 1rem;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.3rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const OrderCardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.waveTop};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  h4 {
    margin-bottom: 0.5rem;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0.3rem 0;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;