import React, { useEffect, useState } from 'react'
import CardAviso from '../components/CardAviso.component';
import { LoadFilePension } from "../firebase/references/images/pensions";
import { useParams } from 'react-router-dom';
//context
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Sidebar from '../components/Sidebar.component';
import {BsFillPlusSquareFill} from "react-icons/bs";

import { Box, Button, Heading, Text } from "@chakra-ui/react";

const AvisoPage = () => {
    const { userId } = useParams();
    const { userAuth } = useContext(AuthContext);

    console.log("user context: ", userAuth)

    const handleChangeFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            LoadFilePension(file);
        }
    }

    return (
        <>
            <Sidebar />
            <Box width={'full'} height={'150px'} bg="teal.600" display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Heading as="h2" size={'lg'} color={'white'}>{userAuth &&userAuth?.displayName?.toUpperCase()}</Heading>
            </Box>
            <Box style={{ marginTop: "200px", display: "flex", justifyContent: "center" }}>
                <Button colorScheme='teal' rightIcon={<BsFillPlusSquareFill />}>Subir anuncio</Button>
                <div>
                    <input type="file" onChange={(e) => handleChangeFile(e)} />
                </div>
            </Box>
        </>
    )
};

export default AvisoPage