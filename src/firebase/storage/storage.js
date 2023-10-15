import { app } from "../configuration/config";
import { getStorage } from "firebase/storage";

export const storage = getStorage(app);
export const storageRef = ref(storage);