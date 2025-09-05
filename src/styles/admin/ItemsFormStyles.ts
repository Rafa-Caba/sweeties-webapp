import styled, { keyframes } from 'styled-components';

export const FormWrap = styled.form`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

export const FormGrid = styled.div`
  display: grid;
  gap: .85rem;
  grid-template-columns: repeat(12, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const FormRow = styled.div<{ $full?: boolean }>`
  grid-column: ${({ $full }) => ($full ? '1 / -1' : 'span 6')};

  @media (max-width: 900px) {
    grid-column: 1 / -1;
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: 800;
  margin-bottom: .35rem;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  padding: .65rem .75rem;
  font: inherit;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(103, 58, 183, .12);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  padding: .65rem .75rem;
  font: inherit;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(103, 58, 183, .12);
  }
`;

export const ImagePicker = styled.label`
  display: inline-grid;
  place-items: center;
  padding: .6rem .9rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.buttonText};
  border-radius: 12px;
  font-weight: 800;
  width: max-content;
  cursor: pointer;
  user-select: none;
  transition: transform .12s ease, filter .12s ease;

  input {
    display: none;
  }

  &:hover { filter: brightness(1.03); transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

export const HelperText = styled.div`
  margin-top: .35rem;
  font-size: .85rem;
  opacity: .75;
`;

export const ImagePreview = styled.div`
  margin-top: .65rem;
  width: min(100%, 520px);
  aspect-ratio: 4 / 3;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(0,0,0,.04);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: .6rem;
  margin-top: .25rem;
  flex-wrap: wrap;
`;

export const PrimaryBtn = styled.button`
  appearance: none;
  border: 0;
  padding: .65rem 1rem;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.buttonText};
  box-shadow: 0 6px 20px rgba(0,0,0,.08);

  &:disabled { opacity: .6; cursor: not-allowed; }
`;

export const GhostBtn = styled.button`
  appearance: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: inherit;
  padding: .65rem 1rem;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;
`;

// /src/styles/admin/ItemsFormStyles.ts (additions)
export const RowInline = styled.div`
  display: flex;
  gap: .5rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const SmallBtn = styled.button`
  appearance: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: inherit;
  padding: .45rem .7rem;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .4rem;
  margin-top: .5rem;
`;

export const TagChip = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(0,0,0,.03);
  padding: .25rem .55rem;
  border-radius: 999px;
  font-weight: 800;
  cursor: pointer;
`;

export const SpritePreviewGrid = styled.div`
  margin-top: .65rem;
  display: grid;
  gap: .6rem;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
`;

export const SpriteThumb = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: rgba(0,0,0,.04);

  img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
  }

  button {
    position: absolute; top: 6px; right: 6px;
    border: 0; border-radius: 999px;
    background: rgba(0,0,0,.6); color: #fff;
    width: 24px; height: 24px; line-height: 24px;
    font-weight: 900; cursor: pointer;
  }
`;

const spin = keyframes`to { transform: rotate(360deg); }`;

export const LoadingOverlay = styled.div<{ $active?: boolean }>`
  display: ${({ $active }) => ($active ? 'grid' : 'none')};
  position: fixed;
  inset: 0;
  z-index: 50;
  place-items: center;
  background: ${({ theme }) => theme.isDark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.55)'};
  backdrop-filter: blur(3px);
`;

export const LoaderCard = styled.div`
  display: grid;
  place-items: center;
  gap: .6rem;
  padding: 1rem 1.25rem;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  min-width: 220px;
  text-align: center;
  font-weight: 800;
`;

export const Spinner = styled.div`
  width: 28px;
  height: 28px;
  border: 3px solid rgba(0,0,0,.08);
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: ${spin} .8s linear infinite;
`;