import styled from 'styled-components';

export const ItemWrapper = styled.section`
    padding: 10rem 1rem 2rem;
    text-align: center;

    @media (max-width: 768px) {
        padding: 8rem 1rem 6rem;
    }
`;

export const ItemTitle = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 2rem;
`;

export const MainImageCard = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

export const MainImage = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    cursor: zoom-in;

    &:hover {
        transform: scale(1.02);
    }
`;

export const ThumbnailsWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
`;

export const Thumbnail = styled.img<{ $active?: boolean }>`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: ${({ $active }) =>
        $active ? '0 0 8px 2px #a855f7' : '0 2px 4px rgba(0,0,0,0.1)'};
    opacity: ${({ $active }) => ($active ? 1 : 0.6)};
    cursor: pointer;
    transition: all 0.3s ease;

    cursor: zoom-in;

    &:hover {
        transform: scale(1.1);
        opacity: 1;
    }

    @media (max-width: 768px) {
        width: 90px;
        height: 90px;
    }
`;

export const ItemInfoWrapper = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;

    @media (min-width: 768px) {
        flex-direction: column;
        justify-content: center;
        margin-top: 1rem;
        gap: 2rem;
    }
`;

export const ItemInfo = styled.div`
    margin-top: 1.5rem;
`;

export const ItemMaterialsSizes = styled.div`
    display: flex;
    gap: 3rem;
    align-items: start;
    padding: 0 1rem 1rem;

    @media (max-width: 768px) {
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 2rem;
    }
`;

export const InfoTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: 1rem;
`;

export const InfoText = styled.p`
    max-width: 800px;
    margin: 0 auto 2rem;
    font-size: 1.1rem;
    line-height: 1.7;
`;

export const MaterialsList = styled.ul`
    list-style: none;
    padding: 0;
    margin-bottom: 2rem;
`;

export const MaterialItem = styled.li`
    font-size: 1rem;
    margin-bottom: 0.3rem;
`;

export const Sizes = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
`
export const ItemButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border: none;
    border-radius: 999px;
    padding: 0.6rem 2rem;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        filter: brightness(1.1);
    }
`;

export const InfoSizeList = styled.ul`
  padding-left: 1.5rem;
  margin: 0;

  li {
    margin-bottom: 0.3rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const InfoMaterialsList = styled.ul`
  padding-left: 1.5rem;
  margin: 0;
  text-align: left;

  li {
    margin-bottom: 0.3rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
  }
`;
