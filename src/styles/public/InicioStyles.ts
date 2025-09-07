import styled from 'styled-components';

export const MainWrapper = styled.div`
    text-align: center;
    position: relative;
    overflow: hidden;
`;

export const TopSection = styled.div`
    position: relative;
    z-index: 2;
    text-align: center;
    padding-top: 120px;

    @media (max-width: 768px) {
        padding-top: 7rem;
    }
`;

export const WaveBottom = styled.div`
    background: ${({ theme }) => theme.colors.waveBottom};
    height: 200px;
    border-top-left-radius: 100% 80px;
    border-top-right-radius: 100% 80px;
`;

export const Signature = styled.p`
    font-family: ${({ theme }) => theme.fonts.handwritten};
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.accent};
    margin-top: 1rem;
`;

export const ButtonRow = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem 0 3rem;
`;

export const CircleButton = styled.button`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.button};
    color: white;
    font-weight: bold;
    font-size: 0.9rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.buttonHover};
        transform: scale(1.05);
    }
`;

export const LogoImg = styled.img`
    position: absolute;
    top: 1rem;
    left: 2rem;
    width: 80px;
`;

export const NeedleIcon = styled.img`
    position: absolute;
    top: 4rem;
    right: 3rem;
    width: 250px;
    z-index: 2;

    @media (max-width: 980px) {
        width: 160px;
        top: 6.7rem;
        right: 2rem;
    }

    @media (max-width: 580px) {
        width: 70px;
        top: 7rem;
        right: 1rem;
    }
`;

export const Title = styled.h1`
    font-family: 'Caveat', cursive;
    font-size: 11rem;
    color: ${({ theme }) => theme.colors.mainTitle};
    margin-bottom: 0.5rem;

    text-shadow: ${({ theme }) =>
        theme.colors.background === '#1e1e1e' ? '0 0 8px rgba(255, 255, 255, 0.3)' : 'none'};

    @media (max-width: 1270px) {
        margin-bottom: 0rem;
        font-size: 8rem;
    }

    @media (max-width: 980px) {
        font-size: 7rem;
    }

    @media (max-width: 768px) {
        font-size: 4rem;
    }
`;

export const Subtitle = styled.h2`
    font-size: 4rem;
    font-family: ${({ theme }) => theme.fonts.boldHandwritten};
    font-weight: 400;
    color: ${({ theme }) => theme.colors.mainSubtitle};
    margin-bottom: 8rem;

    @media (max-width: 1270px) {
        margin-bottom: 6rem;
        font-size: 3rem;
    }

    @media (max-width: 980px) {
        font-size: 2.5rem;
    }

    @media (max-width: 768px) {
        margin-bottom: 2rem;
        font-size: 1.7rem;
    }
`;

export const CreatorName = styled.p`
    font-family: ${({ theme }) => theme.fonts.handwritten};
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.creatorName};
    font-style: italic;

    @media (max-width: 980px) {
        font-size: 1.7rem;
    }

    @media (max-width: 768px) {
        font-size: 1.1rem;
        margin-bottom: 4rem;
    }
`;

export const NavButtonsWrapper = styled.div`
    margin-top: 3rem;
    margin-bottom: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 3rem;
    z-index: 3;
    position: relative;

    @media (max-width: 1270px) {
        margin: 1rem 2rem 8.5rem;
        gap: 3rem;
    }

    @media (max-width: 980px) {
        margin: 13rem 4rem 2rem;
        gap: 5rem;
    }

    @media (max-width: 768px) {
        margin: 11rem 0.5rem 1rem;
        gap: 2rem;
    }

    @media (max-width: 408px) {
        margin: 9rem 2rem 1rem;
        gap: 1.7rem;
    }
`;

interface ButtonProps {
    $position?: 'left' | 'left-center' | 'center' | 'right-center' | 'right';
}

export const NavCircleButton = styled.button<ButtonProps>`
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.buttonText};
    font-weight: 500;
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: 1.4rem;
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;

    &:hover {
        transform: scale(1.2);
        font-weight: 700;
        background-color: ${({ theme }) => theme.colors.buttonHover};
    }

    @media (max-width: 1150px) {
        width: 140px;
        height: 140px;
        font-size: 1.3rem;
    }

    @media (max-width: 980px) {
        width: 140px;
        height: 140px;
        font-size: 1.3rem;
    }

    @media (max-width: 768px) {
        width: 100px;
        height: 100px;
        font-size: 0.9rem;
    }

    @media (max-width: 408px) {
        width: 90px;
        height: 90px;
        font-size: 0.8rem;
    }

    ${({ $position }) =>
        $position === 'left' &&
        `
      top: 4rem;
      left: -12rem;

      @media (max-width: 1270px) {
        top: 1.5rem;
        left: -4rem;
      }

      @media (max-width: 980px) {
        order: 1;
        top: 0rem;
        left: 0rem;
      }

      @media (max-width: 768px) {
        order: 1;
        top: 0rem;
        left: 0rem;
      }
    `}

    ${({ $position }) =>
        $position === 'left-center' &&
        `
      top: 8.5rem;
      left: -7rem;

      @media (max-width: 1270px) {
        top: 5.5rem;
        left: -2rem;
      }

      @media (max-width: 980px) {
        order: 3;
        top: 0rem;
        left: 0rem;
      }

      @media (max-width: 768px) {
        order: 3;
        top: 0rem;
        left: 0rem;
      }
    `}

  ${({ $position }) =>
        $position === 'center' &&
        `
      top: 11rem;
      left: 0rem;
      right: 0rem;

      @media (max-width: 1270px) {
        top: 7.5rem;
        left: 0rem;
      }

      @media (max-width: 980px) {
        order: 2;
        top: 1.5rem;
      }

      @media (max-width: 768px) {
        order: 2;
        top: 1.5rem;
      }
    `}

  ${({ $position }) =>
        $position === 'right-center' &&
        `
      top: 8.5rem;
      right: -7rem;

      @media (max-width: 1270px) {
        top: 5.5rem;
        right: -2rem;
      }

      @media (max-width: 980px) {
        order: 4;
        top: 0.5rem;
        right: 0rem;
      }

      @media (max-width: 768px) {
        order: 4;
        top: 0.5rem;
        right: 0rem;
      }
    `}

  ${({ $position }) =>
        $position === 'right' &&
        `
      top: 4rem;
      right: -12rem;

      @media (max-width: 1270px) {
        top: 1.5rem;
        right: -4rem;
      }

      @media (max-width: 980px) {
        order: 5;
        top: 0.5rem;
        right: 0rem;
      }

      @media (max-width: 768px) {
        order: 5;
        top: 0.5rem;
        right: 0rem;
      }
    `}
`;
