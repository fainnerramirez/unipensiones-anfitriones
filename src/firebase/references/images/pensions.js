import { storageRef } from "../../storage/storage";
import { ref, uploadBytes } from "firebase/storage";

export const LoadFilePension = (file) => {
    if (file) {
        
        const fileName = file.name;
        const imagesRef = ref(storageRef, `images/pensions/${fileName}`);

        uploadBytes(imagesRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!: ', snapshot);
        });
    }
}