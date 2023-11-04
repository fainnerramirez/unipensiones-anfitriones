import React, { useEffect, useRef, useState } from 'react'
import CardAviso from '../components/CardAviso.component';
import { LoadFilePension, getDownloadURLPension } from "../firebase/references/images/pensions";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Sidebar from '../components/Sidebar.component';
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
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
    }, [userAuth, image])

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
        <>
            <Sidebar />
            <Box width={'full'} height={'150px'} bg="teal.600" display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Heading as="h2" size={'lg'} color={'white'} textTransform={'capitalize'}>Bienvenido de nuevo {userAuth && userAuth?.displayName}</Heading>
            </Box>
            <Box style={{ marginTop: "200px", display: "flex", justifyContent: "center" }}>
                {image != "" &&
                    <Box>
                        <CardAviso image={image} />
                    </Box>
                }
                <Button colorScheme='teal' rightIcon={<BsFillPlusSquareFill />} onClick={handleFileAnuncio}>Subir anuncio</Button>
                <Box>
                    <Input type="file" ref={fileInputRef} onChange={(e) => handleChangeFile(e)} display={'none'} />
                </Box>
            </Box>
        </>
    )
};

export default AvisoPage