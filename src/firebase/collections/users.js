import { collection, addDoc } from "firebase/firestore";
import { db } from "../firestore/database";

export const addDocUser = async (options) => {
    return await addDoc(collection(db, "anfitriones"), options);
}