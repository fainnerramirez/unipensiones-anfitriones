import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firestore/database";
import { errorManagment } from "../errors/errorManagmentUser";
import { showSuccessAlert, showWarningAlert } from "../../utils/SwalAlert";

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
