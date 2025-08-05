import { useEffect } from 'react';
import {
    GaleriaWrapper,
    GaleriaTitle,
    ItemsGrid,
    GaleriaItemCard,
    GaleriaItemImage,
    GaleriaItemName,
    PaginationWrapper,
    PaginationButton,
} from '../../styles/public/GaleriaStyles';

// Dummy placeholder data (replace with real Cloudinary images later)
const dummyItems = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    imageUrl: '',
}));

export const GaleriaSection = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <GaleriaWrapper>
            <GaleriaTitle>Galería</GaleriaTitle>

            <ItemsGrid>
                {dummyItems.map((item) => (
                    <GaleriaItemCard key={item.id}>
                        <GaleriaItemImage src={item.imageUrl || '/placeholder.png'} alt={item.name} />
                        <GaleriaItemName>{item.name}</GaleriaItemName>
                    </GaleriaItemCard>
                ))}
            </ItemsGrid>

            <PaginationWrapper>
                <PaginationButton $active={true} >1</PaginationButton>
                <PaginationButton>2</PaginationButton>
                <PaginationButton>3</PaginationButton>
                <PaginationButton>4</PaginationButton>
                <PaginationButton>5</PaginationButton>
            </PaginationWrapper>
        </GaleriaWrapper>
    );
};
