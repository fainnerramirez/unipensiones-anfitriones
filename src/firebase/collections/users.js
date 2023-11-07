import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firestore/database";
import { errorManagment } from "../errors/errorManagmentUser";
import { showSuccessAlert, showWarningAlert } from "../../utils/SwalAlert";

// Función para crear una publicación y relacionarla con un usuario
export const crearAnuncioPorUsuario = async (userId, options) => {

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
            else {
                console.log("Se queda en la publicación");
            }

            return nuevaPublicacionRef.id; // Devuelve el ID de la publicación recién creada
        }
        else {
            console.log("Operación de publicación cancelada!");
        }
    } catch (error) {
        console.error(error);
        errorManagment(error.code);
    }
}

// Función para obtener las publicaciones de un usuario específico
export const obtenerPublicacionesDeUsuario = async (userId) => {
    try {
        const userPostsCollectionRef = collection(doc(db, "anfitriones", userId), "PromotionsAnfitrion");
        const querySnapshot = await getDocs(userPostsCollectionRef);

        return querySnapshot;
    } catch (error) {
        throw error;
    }
}

// // Ejemplo de uso
// crearPublicacion("userId123", "Título de la publicación", "Contenido de la publicación")
//   .then((postId) => {
//     console.log("ID de la publicación relacionada:", postId);
//   })
//   .catch((error) => {
//     console.error("Error al crear la publicación:", error);
//   });

// // Obtén las publicaciones de un usuario específico
// obtenerPublicacionesDeUsuario("userId123")
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       const postId = doc.data().postId;
//       console.log("ID de la publicación relacionada:", postId);
//     });
//   })
//   .catch((error) => {
//     console.error("Error al obtener las publicaciones del usuario:", error);
//   });
