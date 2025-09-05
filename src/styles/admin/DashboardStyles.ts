import styled from "styled-components";

export const DashboardWrapper = styled.section`
    padding: 9rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const InfoCard = styled.div`
    background-color: ${({ theme }) => theme.colors.card};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => theme.shadows.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    padding: 2rem;
    max-width: 500px;
    margin: 2rem auto;
`;

export const LogoutButton = styled.button`
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.buttonText};
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadows.card};
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.buttonHover};
        transform: scale(1.05);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const SectionHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 1rem;

    h1 {
        margin: 0;
        font-size: clamp(2.3rem, 2vw, 2rem);
        line-height: 1.2;
    }

    p {
        margin: .25rem 0 0;
        opacity: .8;
        font-size: .95rem;
    }

    @media (max-width: 768px) {
        justify-content: center;
        align-items: center;
        margin-top: 1.8rem;

        h1, p {
            text-align: center;
        }
    }
`;

export const SectionBody = styled.section`
  display: grid;
  gap: 1rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

export const StatCard = styled.div`
  border-radius: 16px;
  padding: 1rem 1.25rem;
  background: ${({ theme }) => theme?.colors.background || 'rgba(255,255,255,0.7)'};
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  backdrop-filter: blur(6px);
  display: grid;
  align-content: center;
  min-height: 110px;
  transition: transform .15s ease, box-shadow .15s ease;

  .value {
    font-size: clamp(1.6rem, 3vw, 2rem);
    font-weight: 800;
    line-height: 1;
  }
  .label {
    margin-top: .25rem;
    font-weight: 600;
    opacity: .9;
  }
  .hint {
    margin-top: .35rem;
    font-size: .85rem;
    opacity: .7;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0,0,0,0.12);
  }
`;
