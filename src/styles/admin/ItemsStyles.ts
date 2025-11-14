import styled from 'styled-components';

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;

  @media (max-width: 786px) {
    margin-top: 1rem;
  }
`;

export const NewItemBtn = styled.button`
  appearance: none;
  border: 0;
  padding: .65rem 1rem;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.buttonText};
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  transition: transform .12s ease, filter .12s ease;

  &:hover { filter: brightness(1.02); transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`;

export const ItemCard = styled.article`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: grid;
  grid-template-rows: auto 1fr;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 28px rgba(0,0,0,0.12);
  }
`;

export const ItemImageWrap = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const PriceTag = styled.div`
  position: absolute;
  left: .75rem;
  bottom: .75rem;
  padding: .35rem .55rem;
  border-radius: 10px;
  font-weight: 900;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,.18);
  font-size: .9rem;
`;

export const StockBadge = styled.div<{ $isOut?: boolean }>`
  position: absolute;
  right: .75rem;
  bottom: .75rem;
  padding: .35rem .6rem;
  border-radius: 999px;
  font-weight: 800;
  font-size: .8rem;
  background: ${({ $isOut }) => ($isOut ? '#ffe8e8' : 'rgba(168, 143, 247, 0.35)')};
  color: ${({ $isOut }) => ($isOut ? '#b30b0b' : '#52138dff')};
  border: 1px solid ${({ $isOut }) => ($isOut ? '#ffcccc' : 'rgba(122, 44, 196, .25)')};
  backdrop-filter: blur(6px);
`;

export const ItemInfo = styled.div`
  padding: .85rem .9rem 1rem;
  display: grid;
  gap: .4rem;
`;

export const ItemName = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.25;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.mainTitle};
  display: -webkit-box;
  -webkit-line-clamp: 2; /* clamp to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ItemMeta = styled.div`
  display: flex;
  gap: .4rem;
  align-items: center;
  font-size: .85rem;
  opacity: .8;

  code {
    background: rgba(0,0,0,.04);
    padding: .15rem .35rem;
    border-radius: 8px;
  }
`;

export const ItemActions = styled.div`
  display: flex;
  gap: .5rem;
  margin-top: .35rem;

  button {
    border: 0;
    padding: .5rem .7rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 800;
    background: rgba(0,0,0,.06);
  }

  .danger {
    background: #ffe8e8;
    color: #b30b0b;
  }

  button:hover { filter: brightness(0.98); }
`;
