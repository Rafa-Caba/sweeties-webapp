import styled from 'styled-components';

export const ProfileWrapper = styled.form`
    background: ${({ theme }) => theme.colors.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FormInput = styled.input`
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    background: ${({ theme }) => theme.colors.cardBackground};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.text};

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.accent};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}40;
    }
`;

export const FormTextarea = styled.textarea`
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-family: inherit;
    background: ${({ theme }) => theme.colors.cardBackground};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.text};
    resize: vertical;
    min-height: 100px;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.accent};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}40;
    }
`;

export const ImagePreview = styled.img`
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid ${({ theme }) => theme.colors.accent};
    margin-bottom: 1rem;
`;

export const UploadLabel = styled.label`
    display: inline-block;
    padding: 0.6rem 1.2rem;
    text-align: center;
    max-width: 165px;
    background: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.buttonText};
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.buttonHover};
    }
`;

export const SubmitButton = styled.button`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        filter: brightness(1.1);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

export const ErrorMessage = styled.p`
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.5rem;
`;

// --- STYLES FOR VIEW MODE ---

export const ProfileCard = styled.div`
    background: ${({ theme }) => theme.colors.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 16px;
    box-shadow: ${({ theme }) => theme.shadows.card};
    padding: 3rem;
    width: 80%;
    max-width: 750px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media (min-width: 1920px) {
        max-width: 1200px;
    }

    @media (max-width: 750px) {
        max-width: 100%;
        width: 100%
    }
`;

export const AvatarLarge = styled.img`
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid ${({ theme }) => theme.colors.accent};
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

export const ProfileName = styled.h2`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
`;

export const ProfileRole = styled.span`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-transform: uppercase;
    letter-spacing: 1px;
`;

export const InfoGrid = styled.div`
    display: grid;
    gap: 1rem;
    width: 100%;
    text-align: left;
    margin: 1rem 0;
    background: ${({ theme }) => theme.colors.background};
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
`;

export const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    
    strong {
        font-size: 0.85rem;
        color: ${({ theme }) => theme.colors.textSecondary};
        text-transform: uppercase;
        margin-bottom: 0.25rem;
    }
    
    span {
        font-size: 1.1rem;
        color: ${({ theme }) => theme.colors.text};
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    width: 100%;
    
    button, a {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }
`;