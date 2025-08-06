import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import {
    ItemWrapper,
    ItemTitle,
    InfoTitle,
    InfoText,
    MainImage,
    ThumbnailsWrapper,
    Thumbnail,
    ItemInfo,
    ItemInfoWrapper,
    ItemMaterialsSizes,
    ItemButton,
    MainImageCard,
    InfoSizeList,
    InfoMaterialsList,
} from '../../styles/public/ItemStyles';
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { useCartStore } from '../../store/public/useCartStore';
import type { Item } from '../../types/public/Item';

// Dummy data list for now
const dummyItems: Item[] = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    name: `Item ${i + 1}`,
    imageUrl: '/placeholder.png',
    sprites: Array.from({ length: 5 }, () => '/placeholder.png'),
    info: 'Este es un ítem de ejemplo con información básica sobre el producto.',
    materials: [
        'Hilo de algodón',
        'relleno',
        'ojos de seguridad'
    ],
    size: [
        { alto: 10, ancho: 8 }
    ],
    price: 50,
    available: true
}));

export const ItemSection = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { items, getQuantityById, addItem, removeItem, updateQuantity } = useCartStore();

    const [showModal, setShowModal] = useState(false);
    const [modalIndex, setModalIndex] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(0);

    const item = dummyItems.find((item) => item.id === id);
    const allImages = [item?.imageUrl, ...item?.sprites || []];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);


    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const openModal = (index: number) => {
        setModalIndex(index);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalIndex(null);
    };

    const nextImage = () => {
        if (modalIndex !== null) {
            setModalIndex((modalIndex + 1) % allImages.length);
        }
    };

    const prevImage = () => {
        if (modalIndex !== null) {
            setModalIndex((modalIndex - 1 + allImages.length) % allImages.length);
        }
    };

    if (!item) {
        return (
            <ItemWrapper>
                <ItemTitle>Item no encontrado</ItemTitle>
            </ItemWrapper>
        );
    }

    useEffect(() => {
        if (item) {
            const quantity = getQuantityById(item.id);
            setQuantity(quantity);
        }
    }, [item, getQuantityById, items]);

    return (
        <ItemWrapper>
            <ItemTitle>{item.name}</ItemTitle>
            <MainImageCard>
                <MainImage
                    src={item.imageUrl}
                    alt={item.name}
                    onClick={() => openModal(0)}
                    role="button"
                />
            </MainImageCard>

            <ThumbnailsWrapper>
                {item.sprites.map((src, index) => (
                    <Thumbnail
                        key={index}
                        src={src}
                        alt={`Vista ${index + 1}`}
                        onClick={() => openModal(index + 1)}
                        role="button"
                    />
                ))}
            </ThumbnailsWrapper>


            <ItemInfoWrapper>
                {quantity > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ItemButton onClick={() => {
                            if (quantity > 1) {
                                updateQuantity(item.id, quantity - 1);
                            } else {
                                removeItem(item.id);
                            }
                        }}>
                            <FaMinus />
                        </ItemButton>

                        <span style={{ minWidth: '2rem', textAlign: 'center' }}>{quantity}</span>

                        <ItemButton onClick={() => addItem({
                            id: item.id,
                            name: item.name,
                            imageUrl: item.imageUrl,
                            price: item.price,
                        })}>
                            <FaPlus />
                        </ItemButton>
                    </div>
                ) : (
                    <ItemButton onClick={() => addItem({
                        id: item.id,
                        name: item.name,
                        imageUrl: item.imageUrl,
                        price: item.price,
                    })}>
                        <FaPlus /> <FaShoppingCart />
                    </ItemButton>
                )}
                <ItemInfo>
                    <InfoTitle>Información de Artículo</InfoTitle>
                    <InfoText>{item.info}</InfoText>
                </ItemInfo>

                <ItemMaterialsSizes>
                    <div>
                        <InfoTitle>Materiales</InfoTitle>
                        <InfoMaterialsList>
                            {item.materials.map((mat, index) => (
                                <li key={index}>{mat}</li>
                            ))}
                        </InfoMaterialsList>
                    </div>

                    <div>
                        <InfoTitle>Medidas</InfoTitle>
                        <InfoSizeList>
                            {item.size.map((dim, index) => (
                                <li key={index}>
                                    Alto: {dim.alto} cm / Ancho: {dim.ancho} cm
                                </li>
                            ))}
                        </InfoSizeList>
                    </div>
                </ItemMaterialsSizes>

                <ItemButton onClick={() => handleNavigate('/galeria')}>Volver</ItemButton>
            </ItemInfoWrapper>

            <Modal
                show={showModal}
                onHide={closeModal}
                centered
                size="lg"
                contentClassName="bg-transparent border-0"
            >
                <Modal.Body className="text-center position-relative">
                    {modalIndex !== null && (
                        <>
                            <img
                                src={allImages[modalIndex]}
                                alt={`Imagen ${modalIndex + 1}`}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '70vh',
                                    borderRadius: '12px',
                                    boxShadow: '0 0 25px rgba(0,0,0,0.3)',
                                }}
                            />

                            {/* Caption */}
                            <p style={{
                                marginTop: '1rem',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                color: '#fff',
                                textShadow: '1px 1px 2px #000'
                            }}>
                                {item.name} — Vista {modalIndex + 1} de {allImages.length}
                            </p>

                            {/* Prev / Next arrows */}
                            <button
                                onClick={prevImage}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '1rem',
                                    transform: 'translateY(-50%)',
                                    fontSize: '2rem',
                                    background: 'none',
                                    border: 'none',
                                    color: '#fff',
                                    textShadow: '0 0 5px black',
                                    cursor: 'pointer'
                                }}
                            >
                                ‹
                            </button>

                            <button
                                onClick={nextImage}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '1rem',
                                    transform: 'translateY(-50%)',
                                    fontSize: '2rem',
                                    background: 'none',
                                    border: 'none',
                                    color: '#fff',
                                    textShadow: '0 0 5px black',
                                    cursor: 'pointer'
                                }}
                            >
                                ›
                            </button>
                        </>
                    )}
                </Modal.Body>
            </Modal>


        </ItemWrapper>
    );
};
