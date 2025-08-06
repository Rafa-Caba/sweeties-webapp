// AboutStyles.ts
import styled from 'styled-components';

export const AboutContainer = styled.section`
    padding: 9rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (max-width: 768px) {
        padding: 8rem 1.5rem;
    }
`;

export const Title = styled.h2`
    font-size: 3rem;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Pacifico', cursive; /* optional sweet font */

    @media (max-width: 768px) {
        font-size: 2.2rem;
    }
`;

export const BioBox = styled.div`
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    @media (min-width: 768px) {
        flex-direction: row;
        text-align: left;
    }
`;

export const CreatorImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 12px rgba(0,0,0,0.1);

    @media (max-width: 768px) {
        margin-bottom: 0rem;
    }
`;

export const StoryText = styled.p`
    font-size: 1.1rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.text};
    max-width: 500px;
`;
