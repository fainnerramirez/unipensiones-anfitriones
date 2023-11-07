import Swal from 'sweetalert2'; // Asegúrate de importar SweetAlert2

export const showErrorAlert = async (message) => {
    return await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        showCloseButton: true
    });
}

export const showWarningAlert = async (message) => {
    return await Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: message,
        confirmButtonText: 'Si, Publicar',
        cancelButtonText: 'No, Revisar',
        showCancelButton: true,
        showCloseButton: true
    });
}

export const showSuccessAlert = async (message) => {
    return await Swal.fire({
        icon: 'success',
        title: '¡Correcto!',
        text: message,
        confirmButtonText: 'Aceptar',
        showCancelButton: false,
    });
}