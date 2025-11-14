import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItemsStore } from '../../store/public/useItemsStore';
import { 
    GaleriaItemCard, 
    GaleriaItemImage, 
    GaleriaItemName, 
    GaleriaTitle, 
    GaleriaWrapper, 
    ItemsGrid, 
    PaginationButton, 
    PaginationWrapper 
} from '../../styles/public/GaleriaStyles';
import { ItemButton } from '../../styles/GeneralStyles';

export const GaleriaSection = () => {
    const navigate = useNavigate();
    const { items, loading, error, fetchItems } = useItemsStore();

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Change to 6 if you prefer a smaller grid

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (items.length === 0) {
            fetchItems();
        }
    }, [items.length, fetchItems]);

    // --- Pagination Logic ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        // Optional: Scroll to top of grid when changing page
        const gridElement = document.getElementById('galeria-grid');
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const handleClick = (id: number) => {
        navigate(`/galeria/item/${id}`);
    };

    const renderContent = () => {
        if (loading) return <p>Cargando productos...</p>;
        if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
        if (items.length === 0) return <p>No hay productos en la galería todavía.</p>;

        return (
            <ItemsGrid id="galeria-grid">
                {/* Render only the sliced items for the current page */}
                {currentItems.map((item) => (
                    <GaleriaItemCard
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <GaleriaItemImage src={item.imageUrl || '/placeholder.png'} alt={item.name} />
                        <GaleriaItemName>{item.name}</GaleriaItemName>
                    </GaleriaItemCard>
                ))}
            </ItemsGrid>
        );
    };

    return (
        <GaleriaWrapper>
            <GaleriaTitle>Galería</GaleriaTitle>
            
            {renderContent()}

            {/* Dynamic Pagination */}
            {!loading && !error && items.length > itemsPerPage && (
                <PaginationWrapper>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationButton 
                            key={index + 1} 
                            $active={currentPage === index + 1}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </PaginationButton>
                    ))}
                </PaginationWrapper>
            )}

            <ItemButton onClick={() => handleNavigate('/')}>Volver</ItemButton>
        </GaleriaWrapper>
    );
};