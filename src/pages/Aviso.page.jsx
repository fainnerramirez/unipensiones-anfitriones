import React, { useEffect, useRef, useState } from 'react'
import CardAviso from '../components/CardAviso.component';
import { LoadFilePension } from "../firebase/references/images/pensions";
import { useParams } from 'react-router-dom';
//context
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Sidebar from '../components/Sidebar.component';
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";

const AvisoPage = () => {
    const { userId } = useParams(); //para buscar las fotos
    const { userAuth } = useContext(AuthContext);
    const fileInputRef = useRef(null);
    console.log("user context fainner 5: ", userAuth)
    
    const handleFileAnuncio = () => {
        fileInputRef.current.click();
    };
    
    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        console.log("file pension fainner: ", file)
        
        if (file) {
            LoadFilePension(file, userAuth?.uid);
        }
    }

    return (
        <>
            <Sidebar />
            <Box width={'full'} height={'150px'} bg="teal.600" display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Heading as="h2" size={'lg'} color={'white'} textTransform={'capitalize'}>Bienvenido de nuevo {userAuth && userAuth?.displayName}</Heading>
            </Box>
            <Box style={{ marginTop: "200px", display: "flex", justifyContent: "center" }}>
                <Button colorScheme='teal' rightIcon={<BsFillPlusSquareFill />} onClick={handleFileAnuncio}>Subir anuncio</Button>
                <Box>
                    <Input type="file" ref={fileInputRef} onChange={(e) => handleChangeFile(e)} display={'none'}/>
                </Box>
            </Box>
        </>
    )
};

export default AvisoPage