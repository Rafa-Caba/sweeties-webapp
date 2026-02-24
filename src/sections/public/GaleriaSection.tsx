import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItemsStore } from "../../store/public/useItemsStore";
import {
    GaleriaItemCard,
    GaleriaItemImage,
    GaleriaItemName,
    GaleriaTitle,
    GaleriaWrapper,
    ItemsGrid,
    PaginationButton,
    PaginationWrapper,
} from "../../styles/public/GaleriaStyles";
import { ItemButton } from "../../styles/GeneralStyles";

function isNonEmptyString(v: unknown): v is string {
    return typeof v === "string" && v.trim().length > 0;
}

export const GaleriaSection = () => {
    const navigate = useNavigate();
    const { items, loading, error, fetchItems } = useItemsStore();

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);

    // If later you want to sync with admin settings: settings.gallery.itemsPerPage
    const itemsPerPage = 9;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (items.length === 0) {
            fetchItems();
        }
    }, [items.length, fetchItems]);

    // --- Pagination Logic ---
    const totalPages = useMemo(() => Math.max(1, Math.ceil(items.length / itemsPerPage)), [items.length, itemsPerPage]);

    // If items shrink, keep currentPage in range
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
        if (currentPage < 1) setCurrentPage(1);
    }, [currentPage, totalPages]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const gridElement = document.getElementById("galeria-grid");
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    // id is string in backend/types
    const handleClick = (id: string) => {
        navigate(`/galeria/item/${id}`);
    };

    const renderContent = () => {
        if (loading) return <p>Cargando productos...</p>;
        if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
        if (items.length === 0) return <p>No hay productos en la galería todavía.</p>;

        return (
            <ItemsGrid id="galeria-grid">
                {currentItems.map((item: any) => {
                    const id = String(item.id);
                    const imageSrc = isNonEmptyString(item.imageUrl) ? item.imageUrl : "/placeholder.png";

                    return (
                        <GaleriaItemCard
                            key={id}
                            onClick={() => handleClick(id)}
                            style={{ cursor: "pointer" }}
                            role="button"
                        >
                            <GaleriaItemImage src={imageSrc} alt={item.name ?? "Producto"} />
                            <GaleriaItemName>{item.name}</GaleriaItemName>
                        </GaleriaItemCard>
                    );
                })}
            </ItemsGrid>
        );
    };

    return (
        <GaleriaWrapper>
            <GaleriaTitle>Galería</GaleriaTitle>

            {renderContent()}

            {!loading && !error && items.length > itemsPerPage && (
                <PaginationWrapper>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationButton
                            key={index + 1}
                            $active={currentPage === index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            type="button"
                        >
                            {index + 1}
                        </PaginationButton>
                    ))}
                </PaginationWrapper>
            )}

            <ItemButton onClick={() => handleNavigate("/")}>Volver</ItemButton>
        </GaleriaWrapper>
    );
};