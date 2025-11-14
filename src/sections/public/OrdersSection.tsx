import { useNavigate } from 'react-router-dom';
import { useOrdersStore } from '../../store/public/useOrdersStore';
import { OrdersWrapper, OrdersTitle, OrderCardsContainer } from '../../styles/public/OrdersStyles';
import { OrderCard } from '../../components/public/OrderCard'; // Ensure this accepts 'number' ID

export const OrdersSection = () => {
    const navigate = useNavigate();
    // We don't "fetchOrders" because the API doesn't support "get all for guest".
    // We rely on the persisted 'orders' array.
    const { orders } = useOrdersStore();

    return (
        <OrdersWrapper>
            <OrdersTitle>🧾 Tus Pedidos</OrdersTitle>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p>No tienes pedidos registrados en este dispositivo.</p>
                    <button 
                        onClick={() => navigate('/galeria')}
                        style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
                    >
                        Ir a la Galería
                    </button>
                </div>
            ) : (
                <OrderCardsContainer>
                    {orders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                        />
                    ))}
                </OrderCardsContainer>
            )}
        </OrdersWrapper>
    );
};