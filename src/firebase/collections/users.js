import { collection, addDoc } from "firebase/firestore";
import { db } from "../firestore/database";

export const addUser = async (options) => {
    return await addDoc(collection(db, "users"), options);
}