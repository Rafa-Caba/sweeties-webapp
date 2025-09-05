import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// 🔥 Error Toast
export const showErrorToast = (message: string = 'Something went wrong') => {
    MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
};

// ✅ Success Toast
export const showSuccessToast = (message: string = 'Success!') => {
    MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
    });
};
