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
  overflow: visible;
  overflow-x: hidden;
  min-height: ${({ $isInicio }) => ($isInicio ? '100vh' : 'auto')};

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

    @media (min-width: 1920px) {
      bottom: 25vw;
    }
    
    @media (max-width: 1920px) {
      bottom: 22vw;
    }

    @media (max-width: 1270px) {
      bottom: 21vw;
    }

    @media (max-width: 900px) {
      bottom: 67vw;
    }

    @media (max-width: 768px) {
      bottom: 113vw;
    }

    @media (max-width: 408px) {
      bottom: 110vw;
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
    width: 300px;
    top: 4.7rem;
    left: 0.5rem;
  }

  @media (max-width: 980px) {
    width: 250px;
  }

  @media (max-width: 580px) {
    width: 130px;
    top: 5.5rem;
    left: 0.5rem;
  }
`;
