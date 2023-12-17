import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    Image,
    CardFooter,
    Divider,
    Text,
    ButtonGroup,
    Button,
    Skeleton,
    Box,
    SkeletonText,
    Badge,
    HStack,
} from "@chakra-ui/react"
import { deleteAdvertAnfitrion, getAllAdvertsAnfitrionByUserId } from '../firebase/collections/querys/anfitriones'
import { AuthContext } from '../context/authContext'
import { ConvertPrice } from "../utils/PriceConvert";
import { deleteFilePensionAnfitrion } from '../firebase/collections/querys/pensions';
import "../styles/glass.css"

const CardAviso = ({ anuncio }) => {
    const { userAuth, isSuperanfitrion } = useContext(AuthContext);

    const handleDeleteAnuncio = async () => {
        const url = new URL(anuncio?.urlPhoto);
        const decode = decodeURIComponent(url.pathname)
        let array = decode.split('/o/')[1];
        let urlSeparated = array.split('/');
        let nameFile = urlSeparated[urlSeparated?.length - 1];
        await deleteAdvertAnfitrion(userAuth?.uid, nameFile, anuncio?.id);
    }

    return (
        <Card maxW='sm' className='card-glass'>
            <CardBody>
                {
                    isSuperanfitrion && <Badge bg={'#e6b219'} position="absolute" top="6" right="7">
                        superanfitrion
                    </Badge>
                }
                {
                    anuncio != null ? <Image
                        src={anuncio?.urlPhoto}
                        alt={'Foto anuncio de ' + userAuth?.displayName}
                        borderRadius='lg'
                        height={250}
                        width={400}
                    /> : <Skeleton height={250} width={400} />
                }
                <Box marginTop={2}>
                    <Text>Agregado el {anuncio?.dateCreatedAt}</Text>
                </Box>
                {
                    anuncio?.price != null ?
                        <Box>
                            <HStack spacing={3} marginTop={3} flexWrap={'wrap'}>
                                {
                                    anuncio?.services.map((service, index) => (
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
                                }
                            </HStack>
                            <Box>
                                <Text
                                    marginTop={3}
                                    textAlign={'left'}
                                    fontWeight={'bolder'}
                                >
                                    $ {ConvertPrice(anuncio?.price)}
                                    <span style={{ fontWeight: 'normal' }}> mes</span>
                                </Text>
                            </Box>
                        </Box>
                        :
                        <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
                }
            </CardBody>
            {/* <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='outline' colorScheme='red' onClick={handleDeleteAnuncio}>
                        Eliminar anuncio
                    </Button>
                </ButtonGroup>
            </CardFooter> */}
        </Card>
    )
}

export default CardAviso