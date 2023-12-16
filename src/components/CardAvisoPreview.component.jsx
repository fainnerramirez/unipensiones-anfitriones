import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    Image,
    Text,
    Skeleton,
    Box,
    SkeletonCircle,
    SkeletonText,
    HStack,
    Badge
} from "@chakra-ui/react"
import { AuthContext } from '../context/authContext'
import { useFormatPrice } from "../custom/Hooks/useFormatPrice";
import moment from 'moment';
import 'moment/locale/es'
moment.locale('es');

const CardAvisoPreview = ({ image, ciudad, pais, precio, services }) => {
    const { convertPrice } = useFormatPrice();
    const { userAuth } = useContext(AuthContext);

    useEffect(() => {
        console.log("renderizado de card aviso preview");
    }, [precio, ciudad, pais]);

    return (
        <Card maxW='md'>
            <CardBody>
                {
                    image ? <Image
                        src={image}
                        alt='Imagen de la pensión'
                        borderRadius='lg'
                        height={250}
                        width={400}
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
                    <HStack mt={2} spacing={2} display={'flex'} flexWrap={'wrap'}>
                        {
                            services ? services.map((service, index) => (
                                <Badge
                                    variant='subtle'
                                    colorScheme='blue'
                                    key={index}
                                    borderRadius={35}
                                    pt={2}
                                    pb={2}
                                    pl={3}
                                    pr={3}>
                                    {service.label}
                                </Badge>
                            ))
                                :
                                <SkeletonText mt='4' noOfLines={1} spacing='2' skeletonHeight='2' />
                        }
                    </HStack>
                    {
                        precio ?
                            <Text marginTop={3} textAlign={'left'} fontWeight={'bolder'}>$ {convertPrice(precio)} <span style={{ fontWeight: 'normal' }}>mes</span></Text>
                            :
                            <SkeletonText mt='4' noOfLines={7} spacing='4' skeletonHeight='2' />
                    }
                </Box>
            </CardBody>
        </Card>
    )
}

export default CardAvisoPreview