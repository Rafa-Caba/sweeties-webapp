import styled from "styled-components";

export const DashboardWrapper = styled.section`
    padding: 8.5rem 1.5rem 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;

    @media (max-width: 768px) {
        padding: 7.5rem 1rem 2rem;
    }
`;

export const InfoCard = styled.div`
    width: 100%;
    max-width: 980px;
    background-color: ${({ theme }) => theme.colors.card};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => theme.shadows.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 16px;
    padding: 1.5rem 1.75rem;
    margin: 1.25rem auto;

    @media (max-width: 768px) {
        padding: 1.25rem;
        border-radius: 14px;
    }
`;

export const LogoutButton = styled.button`
    margin-top: 1.5rem;
    padding: 0.85rem 1.25rem;
    font-size: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.buttonText};
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadows.card};
    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;

    &:hover {
        transform: translateY(-1px);
        filter: brightness(1.03);
        box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
    }

    &:active {
        transform: translateY(0px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: ${({ theme }) => theme.shadows.card};
    }
`;

export const SectionHeader = styled.header`
    width: 100%;
    max-width: 980px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    margin: 0 auto 1.25rem;

    h1 {
        margin: 0;
        font-size: clamp(1.75rem, 2.2vw, 2.25rem);
        line-height: 1.15;
        letter-spacing: -0.02em;
    }

    p {
        margin: 0.35rem 0 0;
        opacity: 0.78;
        font-size: 0.95rem;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-top: 1.25rem;

        h1 {
            font-size: 1.8rem;
        }
    }
`;

export const SectionBody = styled.section`
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const StatsGrid = styled.div`
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    @media (max-width: 1100px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 820px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
`;

export const StatCard = styled.div`
    position: relative;
    border-radius: 18px;
    padding: 1.1rem 1.15rem;
    background: ${({ theme }) => theme.colors.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.card};
    display: grid;
    align-content: center;
    min-height: 120px;
    overflow: hidden;
    transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;

    /* Subtle gradient glow */
    &::before {
        content: "";
        position: absolute;
        inset: -2px;
        background: radial-gradient(
            600px circle at 30% 10%,
            rgba(103, 58, 183, 0.14),
            transparent 55%
        );
        opacity: 0.9;
        pointer-events: none;
    }

    .value,
    .label,
    .hint {
        position: relative;
    }

    .value {
        font-size: clamp(1.55rem, 2.6vw, 2.05rem);
        font-weight: 850;
        line-height: 1.05;
        letter-spacing: -0.01em;
        padding-right: 3rem; /* leaves room for the icon bubble */
    }

    .label {
        margin-top: 0.35rem;
        font-weight: 650;
        opacity: 0.92;
        padding-right: 3rem;
    }

    .hint {
        margin-top: 0.35rem;
        font-size: 0.85rem;
        opacity: 0.72;
        padding-right: 3rem;
    }

    .icon {
        position: absolute;
        top: 0.9rem;
        right: 0.9rem;
        width: 38px;
        height: 38px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: rgba(103, 58, 183, 0.10);
        border: 1px solid rgba(103, 58, 183, 0.18);
        color: ${({ theme }) => theme.colors.accent || "rgba(103, 58, 183, 1)"};
        box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
        pointer-events: none;
        z-index: 2;

        svg {
            font-size: 1.05rem;
        }
    }

    .icon--warn {
        background: rgba(241, 196, 15, 0.14);
        border-color: rgba(241, 196, 15, 0.25);
        color: rgba(241, 196, 15, 1);
    }

    .icon--info {
        background: rgba(52, 152, 219, 0.14);
        border-color: rgba(52, 152, 219, 0.25);
        color: rgba(52, 152, 219, 1);
    }

    .icon--success {
        background: rgba(46, 204, 113, 0.14);
        border-color: rgba(46, 204, 113, 0.25);
        color: rgba(46, 204, 113, 1);
    }

    .icon--money {
        background: rgba(241, 196, 15, 0.14);
        border-color: rgba(241, 196, 15, 0.25);
        color: rgba(241, 196, 15, 1);
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 34px rgba(0, 0, 0, 0.12);
        border-color: ${({ theme }) => theme.colors.accent || theme.colors.border};
    }

    &:active {
        transform: translateY(-1px);
        box-shadow: 0 10px 26px rgba(0, 0, 0, 0.1);
    }
`;