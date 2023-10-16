import { storageRef } from "../../storage/storage";
import { ref, uploadBytes } from "firebase/storage";

export const LoadFileProfileUser = async (file) => {
    
    if (file) {

        const fileName = file.name;
        const profilesRef = ref(storageRef, `images/profiles/${fileName}`);

        return await uploadBytes(profilesRef, file).then((snapshot) => {
            console.log('file profile loaded: ', snapshot);
        })
        .catch(e => {
            console.error("error upload file: ", e)
        });
    }
}