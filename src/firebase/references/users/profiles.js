import { storageRef, storage } from "../../storage/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";

export const LoadFileProfileUser = async (file, userId) => {

    if (file) {

        const auth = getAuth();
        const profilesRef = ref(storageRef, `images/profiles/${userId}`);
        await uploadBytes(profilesRef, file);

        getDownloadURL(profilesRef)
            .then((url) => {

                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

                console.log("URL perfil user: ", url)

                UpdatePhotoUrlProfileUser(auth, url);
            })
            .catch((error) => {
                // Handle any errors
            });
    }
}

export const UpdatePhotoUrlProfileUser = (auth, url) => {

    updateProfile(auth.currentUser, {
        photoURL: url
    }).then(() => {
        // Profile updated!
        // ...
        console.log("Foto de perfil actualizado")
    }).catch((error) => {
        // An error occurred
        // ...
        console.log("Foto de perfil NO actualizado: ", error);
    });
}