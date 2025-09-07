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
import { useItemsStore } from '../../store/public/useItemsStore';

export const ItemSection = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { items, getQuantityById, addItem, removeItem, updateQuantity } = useCartStore();
    const { items: publicItems } = useItemsStore();

    const [showModal, setShowModal] = useState(false);
    const [modalIndex, setModalIndex] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(0);

    const item = publicItems.find((it) => it._id === id);
    const allImages = item ? [item.imageUrl, ...(item.sprites || [])] : [];

    // scroll to top once
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // keep quantity in sync with cart
    useEffect(() => {
        if (!item) {
            setQuantity(0);
            return;
        }
        setQuantity(getQuantityById(item._id));
        // depends on cart changes & item id
    }, [item?._id, item, items, getQuantityById]);

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
        if (modalIndex !== null && allImages.length > 0) {
            setModalIndex((modalIndex + 1) % allImages.length);
        }
    };

    const prevImage = () => {
        if (modalIndex !== null && allImages.length > 0) {
            setModalIndex((modalIndex - 1 + allImages.length) % allImages.length);
        }
    };

    return (
        <ItemWrapper>
            {!item ? (
                <>
                    <ItemTitle>Item no encontrado</ItemTitle>
                    <ItemButton onClick={() => handleNavigate('/galeria')}>Volver</ItemButton>
                </>
            ) : (
                <>
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
                                <ItemButton
                                    onClick={() => {
                                        if (quantity > 1) {
                                            updateQuantity(item._id, quantity - 1);
                                        } else {
                                            removeItem(item._id);
                                        }
                                    }}
                                >
                                    <FaMinus />
                                </ItemButton>

                                <span style={{ minWidth: '2rem', textAlign: 'center' }}>
                                    {quantity}
                                </span>

                                <ItemButton
                                    onClick={() =>
                                        addItem({
                                            id: item._id,
                                            name: item.name,
                                            imageUrl: item.imageUrl,
                                            price: item.price,
                                        })
                                    }
                                >
                                    <FaPlus />
                                </ItemButton>
                            </div>
                        ) : (
                            <ItemButton
                                onClick={() =>
                                    addItem({
                                        id: item._id,
                                        name: item.name,
                                        imageUrl: item.imageUrl,
                                        price: item.price,
                                    })
                                }
                            >
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
                            {modalIndex !== null && allImages[modalIndex] && (
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

                                    <p
                                        style={{
                                            marginTop: '1rem',
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                            color: '#fff',
                                            textShadow: '1px 1px 2px #000',
                                        }}
                                    >
                                        {item.name} — Vista {modalIndex + 1} de {allImages.length}
                                    </p>

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
                                            cursor: 'pointer',
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
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </ItemWrapper>
    );
};
