import styled from 'styled-components';

export const SettingsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const TabsContainer = styled.div`
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    overflow-x: auto;
`;

export const TabButton = styled.button<{ $active: boolean }>`
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.textSecondary)};
    border-bottom: 2px solid ${({ theme, $active }) => ($active ? theme.colors.accent : 'transparent')};
    transition: all 0.2s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.text};
    }
`;

export const FormSection = styled.div`
    background: ${({ theme }) => theme.colors.card};
    padding: 2rem;
    border-radius: 16px;
    box-shadow: ${({ theme }) => theme.shadows.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    animation: fadeIn 0.3s ease-in-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const SectionTitle = styled.h3`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding-bottom: 0.5rem;
`;

export const GridTwo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ToggleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    cursor: pointer;
`;

export const ToggleSwitch = styled.div<{ $checked: boolean; $disabled?: boolean }>`
    width: 44px;
    height: 24px;
    background-color: ${({ $checked, theme }) => ($checked ? theme.colors.accent : theme.colors.border)};
    border-radius: 24px;
    position: relative;
    transition: background-color 0.2s;
    opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
    
    &::after {
        content: '';
        position: absolute;
        top: 2px;
        left: ${({ $checked }) => ($checked ? '22px' : '2px')};
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        transition: left 0.2s;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
`;

export const EditModeHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => theme.colors.background};
    padding: 1rem 1.5rem;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    margin-bottom: 1rem;
`;

export const ImageLabeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
`;

// Re-use existing form styles
export { FormGroup, FormLabel, FormInput, FormTextarea, ImagePreview, UploadLabel } from './ProfileStyles';