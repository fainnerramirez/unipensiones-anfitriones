import { storageRef } from "../../storage/storage";
import { ref, uploadBytes } from "firebase/storage";

export const LoadFileProfileUser = (file) => {
    
    if (file) {

        const fileName = file.name;
        const profilesRef = ref(storageRef, `images/profiles/${fileName}`);

        uploadBytes(profilesRef, file).then((snapshot) => {
            console.log('file profile loaded: ', snapshot);
        });
    }
}