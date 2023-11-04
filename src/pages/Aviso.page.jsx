import React, { useEffect, useRef, useState } from 'react'
import CardAviso from '../components/CardAviso.component';
import { LoadFilePension, getDownloadURLPension } from "../firebase/references/images/pensions";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Sidebar from '../components/Sidebar.component';
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Box, Button, Divider, Heading, Input, Text } from "@chakra-ui/react";
import { ref } from 'firebase/storage';
import { storageRef } from '../firebase/storage/storage';

const AvisoPage = () => {
    const [image, setImage] = useState("");
    const { userAuth } = useContext(AuthContext);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const getImagesPension = async () => {
            const imagesRef = ref(storageRef, `images/pensions/${userAuth?.uid}`);
            let urlImage = await getDownloadURLPension(imagesRef);
            setImage(urlImage);
        }
        getImagesPension();
    }, [image])

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
                <Button colorScheme='teal' rightIcon={<BsFillPlusSquareFill />} onClick={handleFileAnuncio}>Subir anuncio</Button>
                <Input type="file" ref={fileInputRef} onChange={(e) => handleChangeFile(e)} display={'none'} />
            </Box>
            <Divider color={'teal.900'} height={2} bg={'teal.400'} borderRadius={35} />
            {image != "" ? <Heading as="h4" marginTop={10} size={'lg'} textAlign={'center'}>Tus anuncios</Heading> : <Heading textAlign={'center'}>Aún no tienes anuncios</Heading>}
            <Box display={'flex'} justifyContent={'start'} marginTop={10}>
                {image != "" &&
                    <Box>
                        <CardAviso image={image} />
                    </Box>
                }
            </Box>
        </Box>
    )
};

export default AvisoPage