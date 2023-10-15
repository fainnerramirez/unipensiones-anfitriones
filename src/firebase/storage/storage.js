import { app } from "../configuration/config";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export const storage = getStorage(app);
export const storageRef = ref(storage);