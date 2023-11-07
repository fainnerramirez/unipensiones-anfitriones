import React, { useEffect, useRef, useState } from 'react'
import CardAviso from '../components/CardAviso.component';
import { LoadFilePension, getDownloadURLPension } from "../firebase/references/images/pensions";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Sidebar from '../components/Sidebar.component';
import { Box, Divider, Heading } from "@chakra-ui/react";
import { ref } from 'firebase/storage';
import { storageRef } from '../firebase/storage/storage';
import ModalAnuncio from '../components/ModalAnuncio';
import { getAdvertsAnfitrionByUserId } from '../firebase/collections/querys/anfitriones';

const AvisoPage = () => {
    const [documentAdvert, setDocumentAdvert] = useState(null);
    const [image, setImage] = useState("");
    const { userAuth } = useContext(AuthContext);
    const fileInputRef = useRef(null);
    const [errorNotFoundImage, setErrorNotFoundImage] = useState("storage/object-not-found");

    useEffect(() => {
        const getImagesPension = async () => {
            const imagesRef = ref(storageRef, `images/pensions/${userAuth?.uid}`);
            let urlImage = await getDownloadURLPension(imagesRef);
            setImage(urlImage !== errorNotFoundImage ? urlImage : "");
        }

        const getAverts = async () => {
            const advertsAnfitrion = await getAdvertsAnfitrionByUserId(userAuth?.uid);
            console.log("advertsAnfitrion: ", advertsAnfitrion)
            setDocumentAdvert(advertsAnfitrion);
        }

        getAverts();
        getImagesPension();
    }, [image, userAuth])

    const handleFileAnuncio = () => {
        fileInputRef.current.click();
    };

    const handleChangeFile = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = await LoadFilePension(file, userAuth?.uid);
            setImage(url);
        }
    }

    return (
        <Box width={'90%'} margin={'auto'}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} marginTop={20} marginBottom={5}>
                <Box display={'flex'} alignItems={'center'}>
                    <Sidebar />
                    <Heading as="h2" size={'lg'} marginLeft={10} textTransform={'capitalize'}>Bienvenido de nuevo {userAuth && userAuth?.displayName}</Heading>
                </Box>
                <Box>
                    <ModalAnuncio />
                </Box>
            </Box>
            <Divider color={'teal.900'} height={2} bg={'teal.400'} borderRadius={35} />
            {documentAdvert != null ?
                <Heading as="h4" marginTop={10} size={'lg'} textAlign={'center'}>Tus anuncios</Heading>
                :
                <Heading as="h4" marginTop={10} size={'lg'} textAlign={'center'}>Aún no tienes anuncios</Heading>}
            <Box display={'flex'} justifyContent={'start'} marginTop={10}>
                {documentAdvert != null &&
                    <Box>
                        <CardAviso image={image} />
                    </Box>
                }
            </Box>
        </Box>
    )
};

export default AvisoPage