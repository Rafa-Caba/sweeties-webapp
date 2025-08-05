import styled from 'styled-components';

export const LayoutContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.waveBottom};
  overflow-x: hidden;
`;

export const HeroWaveBackground = styled.div<{ $isInicio?: boolean }>`
  background-color: ${({ theme }) => theme.colors.waveBottom};
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  min-height: ${({ $isInicio }) => ($isInicio ? '100vh' : 'auto')};
  max-height: 100vh;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 200vw;
    height: 200vw;
    background-color: ${({ theme }) => theme.colors.waveTop};
    border-radius: 50%;
    z-index: 1;

    @media (max-width: 1920px) {
      bottom: 22vw;
    }

    @media (max-width: 1520px) {
      bottom: 25vw;
    }

    @media (max-width: 768px) {
      bottom: 123vw;
    }
  }

  @media (max-width: 768px) {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

export const YarnIcon = styled.img`
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  width: 370px;
  z-index: 2;
  
  @media (max-width: 1270px) {
    width: 200px;
    top: 4.7rem;
    left: 0.5rem;
  }

  @media (max-width: 768px) {
    width: 130px;
    top: 4.5rem;
    left: 0.5rem;
  }
`;
