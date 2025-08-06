import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { CartItemCardWrapper, CartItemImage, CartItemInfo, CartItemActions } from '../../styles/public/CartStyles';
import { useCartStore } from '../../store/public/useCartStore';
import type { CartItem } from '../../types/public/CartItem';

interface Props {
    item: CartItem;
}

export const CartItemCard = ({ item }: Props) => {
    const { updateQuantity, removeItem } = useCartStore();

    return (
        <CartItemCardWrapper>
            <CartItemImage src={item.imageUrl} alt={item.name} />

            <CartItemInfo>
                <h4>{item.name}</h4>
                <p>${item.price.toFixed(2)} MXN</p>
                <CartItemActions>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                        <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <FaPlus />
                    </button>
                    <button onClick={() => removeItem(item.id)}>
                        <FaTrash />
                    </button>
                </CartItemActions>
            </CartItemInfo>
        </CartItemCardWrapper>
    );
};
