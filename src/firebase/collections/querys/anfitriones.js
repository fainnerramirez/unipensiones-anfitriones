import { db } from '../../firestore/database';
import { collection, query, where, limit, getDocs, addDoc } from 'firebase/firestore';
import { errorManagment } from '../../errors/errorManagmentUser';
import { showSuccessAlert, showWarningAlert } from '../../../utils/SwalAlert';

export const createAnfitrion = async (options) => {
    return await addDoc(collection(db, "anfitriones"), options);
}

export const getAnfitrionByUserId = async (userId) => {
    try {
        const q = query(collection(db, 'anfitriones'), where('userId', '==', userId), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        errorManagment(error.code)
    }
}

export const getAdvertsAnfitrionByUserId = async (userId) => {
    try {
        const q = query(collection(db, 'anunciosPorAnfitrion'), where('userId', '==', userId), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al buscar el los anuncios por usuario:', error);
        errorManagment(error.code)
    }
}

export const createAdvertForAnfitrion = async (userId, options) => {
    try {
        const response = await showWarningAlert("¿Revisastes todos los datos del anuncio antes de publicarlo?");

        if (response.isConfirmed) {
            const nuevaPublicacionRef = await addDoc(collection(db, "anunciosPorAnfitrion"), {
                userId: userId, // Esto relaciona la publicación con un usuario,
                urlPhoto: options.urlFotoAnuncio,
                title: options.titulo,
                description: options.descripcion,
                country: options.pais,
                city: options.ciudad,
                zone: options.barrio,
                direction: options.direccion,
                typeSpace: options.tipoEspacio,
                typeDomicile: options.tipoAlojamiento,
                typeQuota: options.tipoCupo,
                services: options.Servicios
            });

            const responsePublicado = await showSuccessAlert("Genial! Tu anuncio ha sido publicado correctamente");

            if (responsePublicado.isConfirmed) {
                window.location.href = "/user/" + userId;
            }

            return nuevaPublicacionRef.id;
        }
        else {
            console.log("Operación de publicación cancelada!");
        }
    } catch (error) {
        console.error(error);
        errorManagment(error.code);
    }
}