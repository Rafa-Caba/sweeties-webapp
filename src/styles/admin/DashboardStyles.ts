import styled from "styled-components";

export const DashboardWrapper = styled.section`
    padding: 9rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const InfoCard = styled.div`
    background-color: ${({ theme }) => theme.colors.card};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => theme.shadows.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    padding: 2rem;
    max-width: 500px;
    margin: 2rem auto;
`;

export const LogoutButton = styled.button`
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.button};
    color: ${({ theme }) => theme.colors.buttonText};
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadows.card};
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.buttonHover};
        transform: scale(1.05);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const SectionHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 1.5rem;

    h1 {
        margin: 0;
        font-size: clamp(2.3rem, 2vw, 2rem);
        line-height: 1.2;
    }

    p {
        margin: 0.25rem 0 0;
        opacity: 0.8;
        font-size: 0.95rem;
    }

    @media (max-width: 768px) {
        justify-content: center;
        align-items: center;
        margin-top: 2.2rem;
        flex-direction: column;

        h1,
        p {
            text-align: center;
        }
    }
`;

export const SectionBody = styled.section`
    display: grid;
    gap: 1rem;
`;

/** ✅ New: topic-based grouping layout */
export const StatsGroups = styled.div`
    width: 100%;
    display: grid;
    gap: 1.25rem;
`;

export const StatsGroup = styled.section`
    width: 100%;
    background: ${({ theme }) => theme.colors.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 18px;
    padding: 1rem 1rem 1.1rem;
    box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const StatsGroupHeader = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.9rem;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const StatsGroupTitle = styled.h3`
    margin: 0;
    font-size: 1.05rem;
    font-weight: 850;
    letter-spacing: -0.01em;
`;

export const StatsGroupHint = styled.p`
    margin: 0.15rem 0 0;
    font-size: 0.9rem;
    opacity: 0.75;
`;

export const StatsGroupMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.8;
    font-size: 0.85rem;
`;

/** Grid inside each group */
export const StatsGroupGrid = styled.div`
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
        background: rgba(103, 58, 183, 0.1);
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

    .icon--danger {
        background: rgba(231, 76, 60, 0.14);
        border-color: rgba(231, 76, 60, 0.25);
        color: rgba(231, 76, 60, 1);
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