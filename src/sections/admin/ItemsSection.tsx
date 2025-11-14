import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { SectionBody, SectionHeader } from '../../styles/admin/DashboardStyles';
import {
	HeaderRight,
	ItemsGrid,
	ItemCard,
	ItemImageWrap,
	ItemImage,
	ItemInfo,
	ItemName,
	ItemMeta,
	ItemActions,
	NewItemBtn,
	PriceTag,
	StockBadge,
} from '../../styles/admin/ItemsStyles';
import { useAdminItemsStore } from '../../store/admin/useAdminItemsStore';
import Swal from 'sweetalert2';
import { showErrorToast, showSuccessToast } from '../../utils/showToast';

export const ItemsSection = () => {
	const navigate = useNavigate();
	const { items, loading, error, fetchItems, deleteItem } = useAdminItemsStore();

	useEffect(() => {
		// Load items on mount (or when list is empty)
		if (!items || items.length === 0) {
			fetchItems();
		}
	}, [items, items?.length, fetchItems]);

	const handleNewItem = () => navigate('/admin/items/new');
	const handleEdit = (id: string) => navigate(`/admin/items/${id}/edit`);

	const handleDelete = async (id: string) => {
		const { isConfirmed } = await Swal.fire({
			title: '¿Eliminar este item?',
			text: 'Esta acción no se puede deshacer.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sí, eliminar',
			cancelButtonText: 'Cancelar',
			confirmButtonColor: '#e74c3c',
			cancelButtonColor: '#aaa',
			reverseButtons: true,
		});

		if (!isConfirmed) return;

		try {
			// Mostrar loading mientras elimina
			Swal.fire({
				title: 'Eliminando...',
				allowOutsideClick: false,
				showConfirmButton: false,
				didOpen: () => {
					Swal.showLoading();
				},
			});

			const success = await deleteItem(id);

			if (success) {
				Swal.fire({
					icon: 'success',
					title: 'Item eliminado',
					text: 'El producto fue eliminado correctamente.',
					timer: 1500,
					showConfirmButton: false,
				});

				showSuccessToast('Item eliminado correctamente');
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'No se pudo eliminar el item.',
				});
				showErrorToast('No se pudo eliminar el item');
			}
		} catch {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Ocurrió un error al intentar eliminar el item.',
			});
			showErrorToast('Error al intentar eliminar el item');
		}
	};

	return (
		<AdminLayout>
			<SectionHeader>
				<div>
					<h1>Items</h1>
					<p>Gestiona el catálogo de productos (crear, editar y eliminar)</p>
				</div>

				<HeaderRight>
					<NewItemBtn onClick={handleNewItem}>+ Nuevo Item</NewItemBtn>
				</HeaderRight>
			</SectionHeader>

			<SectionBody>
				{loading && <p>Cargando items…</p>}
				{error && !loading && <p style={{ color: '#b30b0b' }}>{error}</p>}

				{!loading && !error && items.length === 0 && (
					<div>
						<p>No hay productos todavía.</p>
						<NewItemBtn onClick={handleNewItem}>Crear primer item</NewItemBtn>
					</div>
				)}

				{!loading && !error && items.length > 0 && (
					<ItemsGrid>
						{items.map((item) => (
							// 1. Use item.id for the key
							<ItemCard key={item.id}>
								<ItemImageWrap>
									<ItemImage src={item.imageUrl} alt={item.name} />
									<PriceTag>${item.price}</PriceTag>
									<StockBadge $isOut={!item.available}>
										{item.available ? 'Disponible' : 'No disponible'}
									</StockBadge>
								</ItemImageWrap>

								<ItemInfo>
									<ItemName title={item.name}>{item.name}</ItemName>
									<ItemMeta>
										<span>ID:</span>
										{/* 2. Display the correct ID */}
										<code>{item.id}</code>
									</ItemMeta>

									<ItemActions>
										{/* 3. Pass the ID as a string */}
										<button onClick={() => handleEdit(item.id.toString())}>Editar</button>
										<button className="danger" onClick={() => handleDelete(item.id.toString())}>
											Eliminar
										</button>
									</ItemActions>
								</ItemInfo>
							</ItemCard>
						))}
					</ItemsGrid>
				)}
			</SectionBody>
		</AdminLayout>
	);
};
