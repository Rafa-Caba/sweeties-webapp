import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCartStore } from '../../store/public/useCartStore';
import { CartWrapper, CartTitle, CartTotal, CartEmpty, EmptyCartButton, CartTotalWrapper, CheckoutButton } from '../../styles/public/CartStyles';
import { CartItemCard } from '../../components/public/CartItemCard';

export const CartSection = () => {
    const navigate = useNavigate();
    const { items, getTotal, clearCart } = useCartStore();

    const handleClearCart = () => {
        Swal.fire({
            title: '¿Vaciar carrito?',
            text: '¿Estás seguro de que deseas eliminar todos los items?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Sí, vaciar',
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                Swal.fire('Carrito vacío', '', 'success');
            }
        });
    };

    const handleCheckoutConfirm = () => {
        const summary = items.map(item => (
            `${item.quantity} x ${item.name} — $${item.price.toFixed(2)} c/u`
        )).join('<br>');

        Swal.fire({
            title: '¿Deseas finalizar tu pedido?',
            html: `
      <p><strong>Resumen:</strong></p>
      ${summary}
      <p style="margin-top:1rem;"><strong>Total:</strong> $${getTotal().toFixed(2)} MXN</p>
    `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, continuar 🧾',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#ef9ac5',
            cancelButtonColor: '#aaa',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/finalizar');
            }
        });
    };

    return (
        <CartWrapper>
            <CartTitle>🛒 Tu Carrito</CartTitle>

            {items.length === 0 ? (
                <CartEmpty>No tienes ningún producto en el carrito.</CartEmpty>
            ) : (
                <>
                    {items.map((item) => (
                        <CartItemCard key={item.id} item={item} />
                    ))}


                    <CartTotalWrapper>
                        <EmptyCartButton onClick={handleClearCart}>🗑️ Vaciar carrito</EmptyCartButton>
                        <CartTotal>Total: ${getTotal().toFixed(2)} MXN</CartTotal>
                    </CartTotalWrapper>

                    {items.length > 0 && (
                        <CheckoutButton onClick={handleCheckoutConfirm}>
                            🧾 Finalizar Pedido
                        </CheckoutButton>
                    )}
                </>
            )}
        </CartWrapper>
    );
};
