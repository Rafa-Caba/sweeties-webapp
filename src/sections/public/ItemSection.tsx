import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
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
} from "../../styles/public/ItemStyles";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../store/public/useCartStore";
import { useItemsStore } from "../../store/public/useItemsStore";
import type { ItemApi } from "../../types";

// Narrow helpers to safely read optional fields when list type is "Item" (clean)
type AnyItem = any;

function toStringId(v: unknown): string {
    return typeof v === "string" ? v : String(v ?? "");
}

function safeArray<T>(v: unknown): T[] {
    return Array.isArray(v) ? (v as T[]) : [];
}

function isNonEmptyString(v: unknown): v is string {
    return typeof v === "string" && v.trim().length > 0;
}

export const ItemSection = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { items: cartItems, getQuantityById, addItem, removeItem, updateQuantity } = useCartStore();
    const { items: publicItems } = useItemsStore();

    const [showModal, setShowModal] = useState(false);
    const [modalIndex, setModalIndex] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(0);

    // Find by string id (backend uses string ids)
    const item = useMemo(() => {
        const targetId = toStringId(id);
        return publicItems.find((it: AnyItem) => toStringId(it?.id) === targetId) as AnyItem | undefined;
    }, [publicItems, id]);

    const itemId = toStringId(item?.id);

    // Images: main + sprites (null-safe)
    const allImages = useMemo(() => {
        const main = isNonEmptyString(item?.imageUrl) ? [String(item.imageUrl)] : [];
        const sprites = safeArray<string>(item?.sprites).filter(isNonEmptyString);
        return [...main, ...sprites];
    }, [item]);

    // scroll to top once
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // keep quantity in sync with cart
    useEffect(() => {
        if (!itemId) {
            setQuantity(0);
            return;
        }
        setQuantity(getQuantityById(itemId));
    }, [itemId, cartItems, getQuantityById]);

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

    const name = (item?.name ?? "").toString();
    const price = typeof item?.price === "number" ? item.price : Number(item?.price ?? 0);
    const imageUrl = (item?.imageUrl ?? "").toString();

    const infoText = (item?.info ?? item?.description ?? "").toString();
    const materials = safeArray<string>(item?.materials);
    const sizes = safeArray<ItemApi["size"][number]>(item?.size);

    const canRenderMainImage = isNonEmptyString(imageUrl);

    return (
        <ItemWrapper>
            {!item ? (
                <>
                    <ItemTitle>Item no encontrado</ItemTitle>
                    <ItemButton onClick={() => handleNavigate("/galeria")}>Volver</ItemButton>
                </>
            ) : (
                <>
                    <ItemTitle>{name}</ItemTitle>

                    <MainImageCard>
                        {canRenderMainImage ? (
                            <MainImage
                                src={imageUrl}
                                alt={name}
                                onClick={() => openModal(0)}
                                role="button"
                            />
                        ) : (
                            <div style={{ padding: "2rem", textAlign: "center" }}>
                                No hay imagen disponible
                            </div>
                        )}
                    </MainImageCard>

                    {allImages.length > 1 && (
                        <ThumbnailsWrapper>
                            {/* Skip first because it's main image */}
                            {allImages.slice(1).map((src, index) => (
                                <Thumbnail
                                    key={`${src}-${index}`}
                                    src={src}
                                    alt={`Vista ${index + 2}`}
                                    onClick={() => openModal(index + 1)}
                                    role="button"
                                />
                            ))}
                        </ThumbnailsWrapper>
                    )}

                    <ItemInfoWrapper>
                        {quantity > 0 ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <ItemButton
                                    onClick={() => {
                                        if (!itemId) return;
                                        if (quantity > 1) {
                                            updateQuantity(itemId, quantity - 1);
                                        } else {
                                            removeItem(itemId);
                                        }
                                    }}
                                >
                                    <FaMinus />
                                </ItemButton>

                                <span style={{ minWidth: "2rem", textAlign: "center" }}>{quantity}</span>

                                <ItemButton
                                    onClick={() => {
                                        if (!itemId) return;
                                        addItem({
                                            id: itemId,
                                            name,
                                            imageUrl,
                                            price,
                                        });
                                    }}
                                >
                                    <FaPlus />
                                </ItemButton>
                            </div>
                        ) : (
                            <ItemButton
                                onClick={() => {
                                    if (!itemId) return;
                                    addItem({
                                        id: itemId,
                                        name,
                                        imageUrl,
                                        price,
                                    });
                                }}
                            >
                                <FaPlus /> <FaShoppingCart />
                            </ItemButton>
                        )}

                        <ItemInfo>
                            <InfoTitle>Información de Artículo</InfoTitle>
                            <InfoText>{infoText || "Sin información adicional."}</InfoText>
                        </ItemInfo>

                        <ItemMaterialsSizes>
                            <div>
                                <InfoTitle>Materiales</InfoTitle>
                                {materials.length > 0 ? (
                                    <InfoMaterialsList>
                                        {materials.map((mat, index) => (
                                            <li key={`${mat}-${index}`}>{mat}</li>
                                        ))}
                                    </InfoMaterialsList>
                                ) : (
                                    <InfoText>Sin materiales especificados.</InfoText>
                                )}
                            </div>

                            <div>
                                <InfoTitle>Medidas</InfoTitle>
                                {sizes.length > 0 ? (
                                    <InfoSizeList>
                                        {sizes.map((dim, index) => (
                                            <li key={index}>
                                                Alto: {dim?.alto ?? "—"} cm / Ancho: {dim?.ancho ?? "—"} cm
                                            </li>
                                        ))}
                                    </InfoSizeList>
                                ) : (
                                    <InfoText>Sin medidas especificadas.</InfoText>
                                )}
                            </div>
                        </ItemMaterialsSizes>

                        <ItemButton onClick={() => handleNavigate("/galeria")}>Volver</ItemButton>
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
                                            maxWidth: "100%",
                                            maxHeight: "70vh",
                                            borderRadius: "12px",
                                            boxShadow: "0 0 25px rgba(0,0,0,0.3)",
                                        }}
                                    />

                                    <p
                                        style={{
                                            marginTop: "1rem",
                                            fontWeight: "bold",
                                            fontSize: "1rem",
                                            color: "#fff",
                                            textShadow: "1px 1px 2px #000",
                                        }}
                                    >
                                        {name} — Vista {modalIndex + 1} de {allImages.length}
                                    </p>

                                    <button
                                        onClick={prevImage}
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "1rem",
                                            transform: "translateY(-50%)",
                                            fontSize: "2rem",
                                            background: "none",
                                            border: "none",
                                            color: "#fff",
                                            textShadow: "0 0 5px black",
                                            cursor: "pointer",
                                        }}
                                    >
                                        ‹
                                    </button>

                                    <button
                                        onClick={nextImage}
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            right: "1rem",
                                            transform: "translateY(-50%)",
                                            fontSize: "2rem",
                                            background: "none",
                                            border: "none",
                                            color: "#fff",
                                            textShadow: "0 0 5px black",
                                            cursor: "pointer",
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