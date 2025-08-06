import Swal from "sweetalert2";

export const showAddRemoveiTemToast = () => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Hecho',
        text: `El Carrito se actualizo`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: '#333',
        color: '#fff',
    });
};