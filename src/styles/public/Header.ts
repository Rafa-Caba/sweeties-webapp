import styled from 'styled-components';

export const HeaderContainer = styled.div`
  background: ${({ theme }) => theme.colors.waveTop};
  text-align: center;
  padding: 2rem 1rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 100px;
    background: ${({ theme }) => theme.colors.waveBottom};
    border-top-left-radius: 100% 50px;
    border-top-right-radius: 100% 50px;
  }
`;