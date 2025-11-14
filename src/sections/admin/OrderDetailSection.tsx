import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAdminOrdersStore } from '../../store/admin/useAdminOrdersStore';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { SectionBody, SectionHeader } from '../../styles/admin/DashboardStyles';
import { 
    OrderDetailCard, DetailGrid, InfoGroup, ItemsList, StatusBadge 
} from '../../styles/admin/OrderStyles';
import { GhostBtn, PrimaryBtn } from '../../styles/admin/ItemsFormStyles';
import type { OrderStatus } from '../../types';

export const OrderDetailSection = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { currentOrder, fetchOrderById, updateStatus, loading } = useAdminOrdersStore();
    
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (id) fetchOrderById(id);
    }, [id, fetchOrderById]);

    const handleStatusChange = async (newStatus: OrderStatus) => {
        if (!id) return;
        
        const { isConfirmed } = await Swal.fire({
            title: `¿Cambiar estado a ${newStatus}?`,
            text: "Esto podría enviar una notificación al cliente (si está configurado).",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, cambiar',
        });

        if (isConfirmed) {
            setIsUpdating(true);
            const success = await updateStatus(id, newStatus);
            setIsUpdating(false);
            
            if (success) {
                Swal.fire('Actualizado', 'El estado ha sido cambiado.', 'success');
            } else {
                Swal.fire('Error', 'No se pudo cambiar el estado.', 'error');
            }
        }
    };

    if (loading || !currentOrder) return <AdminLayout>Cargando detalle...</AdminLayout>;

    return (
        <AdminLayout>
            <SectionHeader>
                <div>
                    <h1>Orden #{currentOrder.id}</h1>
                    <p>Detalles y gestión del pedido</p>
                </div>
                <GhostBtn onClick={() => navigate('/admin/orders')}>Volver</GhostBtn>
            </SectionHeader>

            <SectionBody>
                <OrderDetailCard>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem'}}>
                        <div>
                            <span style={{color: '#888', marginRight: '10px'}}>Estado actual:</span>
                            <StatusBadge $status={currentOrder.status} style={{fontSize: '1.2rem'}}>{currentOrder.status}</StatusBadge>
                        </div>
                        
                        <div style={{display: 'flex', gap: '0.5rem'}}>
                            {currentOrder.status !== 'PENDIENTE' && (
                                <GhostBtn disabled={isUpdating} onClick={() => handleStatusChange('PENDIENTE')}>Marcar Pendiente</GhostBtn>
                            )}
                            {currentOrder.status !== 'ENVIADO' && (
                                <PrimaryBtn disabled={isUpdating} onClick={() => handleStatusChange('ENVIADO')}>Marcar Enviado</PrimaryBtn>
                            )}
                            {currentOrder.status !== 'ENTREGADO' && (
                                <PrimaryBtn disabled={isUpdating} onClick={() => handleStatusChange('ENTREGADO')}>Marcar Entregado</PrimaryBtn>
                            )}
                        </div>
                    </div>

                    <hr style={{borderColor: '#eee'}} />

                    <DetailGrid>
                        <InfoGroup>
                            <h3>Cliente</h3>
                            <p>{currentOrder.name}</p>
                            <p>{currentOrder.email}</p>
                            <p>{currentOrder.phone}</p>
                        </InfoGroup>
                        
                        <InfoGroup>
                            <h3>Detalles</h3>
                            <p>Fecha: {new Date(currentOrder.createdAt).toLocaleString()}</p>
                            <p>Total: <span style={{fontSize: '1.5rem', color: '#d63384'}}>${currentOrder.total.toFixed(2)}</span></p>
                        </InfoGroup>

                        <InfoGroup>
                            <h3>Nota del Cliente</h3>
                            <p style={{fontStyle: 'italic'}}>{currentOrder.note || 'Sin nota'}</p>
                        </InfoGroup>
                    </DetailGrid>

                    <div>
                        <h3>Productos</h3>
                        <ItemsList>
                            {currentOrder.items.map((item, i) => (
                                <li key={i}>
                                    <div>
                                        <strong>{item.quantity}x</strong> {item.name}
                                    </div>
                                    <div>
                                        ${item.price.toFixed(2)} c/u
                                    </div>
                                </li>
                            ))}
                        </ItemsList>
                    </div>
                </OrderDetailCard>
            </SectionBody>
        </AdminLayout>
    );
};