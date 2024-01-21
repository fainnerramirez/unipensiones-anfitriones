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