import styled from 'styled-components';

export const GaleriaSectionContainer = styled.section`
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    overflow-y: auto;
    max-height: unset;
    padding-bottom: 5rem;
  }
`;

export const GaleriaWrapper = styled.section`
  margin-top: 6rem;
  padding: 4rem 1rem 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  overflow-y: auto;
  z-index: 2;
  position: relative;

  @media (max-width: 768px) {
    padding-top: 1rem;
    padding-bottom: 4rem;
    overflow-y: auto;
  }
`;

export const GaleriaTitle = styled.h2`
    font-family: ${({ theme }) => theme.fonts.boldHandwritten};
    font-size: 3rem;
    margin-bottom: 4rem;

    z-index: 2;
    position: relative;
`;

export const ItemsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto 3rem;

    z-index: 2;
    position: relative;
`;

export const GaleriaItemCard = styled.div`
    background: ${({ theme }) => theme.colors.waveTop};
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease-in-out;
    z-index: 2;
    position: relative;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const GaleriaItemImage = styled.img`
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    z-index: 2;
    position: relative;
`;

export const GaleriaItemName = styled.p`
    font-weight: bold;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    z-index: 2;
    position: relative;
    color: ${({ theme }) => theme.colors.text};
`;

interface PaginationButtonProps {
  $active?: boolean;
}

export const PaginationButton = styled.button<PaginationButtonProps>`
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.accent : theme.colors.button};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  margin: 0 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
`;
