import styled from "styled-components";
import { Link } from "react-router-dom";

export const OrdersTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: ${({ theme }) => theme.colors.card};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadows.card};

    th,
    td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid ${({ theme }) => theme.colors.border};
        vertical-align: top;
    }

    th {
        background: ${({ theme }) => theme.colors.background};
        font-weight: 600;
        color: ${({ theme }) => theme.colors.textSecondary};
        font-size: 0.9rem;
        text-transform: uppercase;
    }

    tr:hover {
        background: ${({ theme }) => theme.colors.background};
    }
`;

export const StatusBadge = styled.span<{ $status: string }>`
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: bold;
    text-transform: uppercase;

    background-color: ${({ $status }) => {
        switch ($status) {
            case "PENDIENTE":
                return "#ffeeba";
            case "ENVIADO":
                return "#b8daff";
            case "ENTREGADO":
                return "#c3e6cb";
            default:
                return "#eee";
        }
    }};

    color: ${({ $status }) => {
        switch ($status) {
            case "PENDIENTE":
                return "#856404";
            case "ENVIADO":
                return "#004085";
            case "ENTREGADO":
                return "#155724";
            default:
                return "#333";
        }
    }};
`;

export const EmailBadge = styled.span<{ $status: string }>`
    padding: 0.28rem 0.7rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;

    background-color: ${({ $status }) => {
        switch ($status) {
            case "SENT":
                return "rgba(46, 204, 113, 0.18)";
            case "FAILED":
                return "rgba(231, 76, 60, 0.18)";
            case "PENDING":
                return "rgba(241, 196, 15, 0.18)";
            default:
                return "rgba(0,0,0,0.08)";
        }
    }};

    color: ${({ $status }) => {
        switch ($status) {
            case "SENT":
                return "rgba(46, 204, 113, 1)";
            case "FAILED":
                return "rgba(231, 76, 60, 1)";
            case "PENDING":
                return "rgba(241, 196, 15, 1)";
            default:
                return "#333";
        }
    }};
`;

export const FilterBar = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
    padding: 0.5rem 1rem;
    border-radius: 20px;
    border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.border)};
    background: ${({ theme, $active }) => ($active ? theme.colors.accent : "transparent")};
    color: ${({ theme, $active }) => ($active ? "#fff" : theme.colors.text)};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: ${({ theme }) => theme.colors.accent};
    }
`;

export const ActionLink = styled(Link)`
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    font-weight: 600;
    &:hover {
        text-decoration: underline;
    }
`;

export const TopActionsRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
`;

export const ExportButton = styled.button`
    padding: 0.6rem 1rem;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.card};
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    font-weight: 700;
    transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;

    &:hover {
        transform: translateY(-1px);
        border-color: ${({ theme }) => theme.colors.accent};
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

// Detail Styles
export const OrderDetailCard = styled.div`
    background: ${({ theme }) => theme.colors.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    padding: 2rem;
    box-shadow: ${({ theme }) => theme.shadows.card};
    display: grid;
    gap: 2rem;
`;

export const DetailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
`;

export const InfoGroup = styled.div`
    h3 {
        font-size: 0.9rem;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.textSecondary};
        margin-bottom: 0.5rem;
    }
    p {
        font-size: 1.05rem;
        color: ${({ theme }) => theme.colors.text};
        font-weight: 500;
        margin: 0.25rem 0;
    }
`;

export const ItemsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border};

    li {
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
        border-bottom: 1px solid ${({ theme }) => theme.colors.border};
        gap: 1rem;
        flex-wrap: wrap;
    }
`;