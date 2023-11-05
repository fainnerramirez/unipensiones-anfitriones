import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    Stack,
    Image,
    Heading,
    CardFooter,
    Divider,
    Text,
    ButtonGroup,
    Button,
    Skeleton,
    Box,
    SkeletonCircle,
    SkeletonText,
    HStack
} from "@chakra-ui/react"
import { AuthContext } from '../context/authContext'
import moment from 'moment';
import 'moment/locale/es'

const CardAvisoPreview = ({ image, ciudad, pais, precio }) => {
    moment.locale('es');
    let dateUpdate = moment().format();
    console.log("data moment: ", dateUpdate);
    console.log("lenguaje de moment: ", new Date().getDay())
    const [precioConvert, setPrecioConvert] = useState("");

    useEffect(() => {
        const handleInputChange = (e) => {
            const inputValue = precio;
            // Elimina los puntos y comas existentes del valor ingresado
            const formattedValue = inputValue.replace(/[\.,]/g, '');
            // Aplica el formato con puntos como separadores de miles
            const formattedNumber = new Intl.NumberFormat('es-ES').format(formattedValue);
            setPrecioConvert(formattedNumber);
        };
        
        handleInputChange();

    }, [precio]);

    const { userAuth } = useContext(AuthContext);

    return (
        <Card maxW='md'>
            <CardBody>
                {
                    image ? <Image
                        src={image}
                        alt='Imagen de la pensión'
                        borderRadius='lg'
                    /> : <Skeleton height={250} width={400} />
                }
                <Box padding='6' boxShadow='lg' bg='white'>
                    {
                        userAuth ?
                            <HStack spacing={5}>
                                <Image boxSize='50px'
                                    objectFit='cover'
                                    alt={userAuth?.displayName} src={userAuth?.photoURL} borderRadius={'50%'} />
                                <Box>
                                    <Text>{userAuth?.displayName}</Text>
                                    <Text fontWeight={'bold'} textTransform={'capitalize'}>{ciudad}, {pais}</Text>
                                </Box>
                            </HStack>
                            :
                            <SkeletonCircle size='10' />
                    }
                    <Box marginTop={2}>
                        <Text>Agregado el {moment().format('LL')}</Text>
                    </Box>
                    {
                        precio ?
                            <Text marginTop={3} textAlign={'left'} fontWeight={'bolder'}>$ {precioConvert} <span style={{fontWeight: 'normal'}}>mes</span></Text>
                            :
                            <SkeletonText mt='4' noOfLines={7} spacing='4' skeletonHeight='2' />
                    }
                </Box>
            </CardBody>
        </Card>
    )
}

export default CardAvisoPreview