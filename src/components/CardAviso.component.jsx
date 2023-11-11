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
import { deleteAdvertAnfitrion, getAdvertsAnfitrionByUserId } from '../firebase/collections/querys/anfitriones'
import { AuthContext } from '../context/authContext'
import { ConvertPrice } from "../utils/PriceConvert";

const CardAviso = ({ image }) => {

    const [documentAdvert, setDocumentAdvert] = useState(null);
    const { userAuth } = useContext(AuthContext);

    //error no se esta consultando el documento: razon: es porque hay que eliminar el documento con el id del usuario y poner el nuevo documento.
    useEffect(() => {
        const getAverts = async () => {
            const advertsAnfitrion = await getAdvertsAnfitrionByUserId(userAuth?.uid);
            setDocumentAdvert(advertsAnfitrion);
        }
        getAverts();
    }, [userAuth])

    const handleDeleteAnuncio = async () => {
        let responseDelete = await deleteAdvertAnfitrion(documentAdvert?.id);
    }   

    return (
        <Card maxW='md'>
            <CardBody>
                {
                    documentAdvert != null ? <Image
                        src={documentAdvert?.urlPhoto}
                        alt={'Foto anuncio de ' + userAuth?.displayName}
                        borderRadius='lg'
                        height={250}
                        width={400}
                    /> : <Skeleton height={250} width={400} />
                }
                <Box marginTop={2}>
                    <Text>Agregado el {documentAdvert?.dateCreatedAt}</Text>
                </Box>
                {
                    documentAdvert?.price != null ?
                        <Box>
                            <HStack spacing={3} marginTop={3} flexWrap={'wrap'}>
                                {
                                    documentAdvert?.services.map((service, index) => (
                                        <Badge 
                                            variant='subtle' 
                                            colorScheme='teal' 
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
                                    $ {ConvertPrice(documentAdvert?.price)}
                                    <span style={{ fontWeight: 'normal' }}> mes</span>
                                </Text>
                            </Box>
                        </Box>
                        :
                        <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
                }
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='outline' colorScheme='red' onClick={handleDeleteAnuncio}>
                        Eliminar anuncio
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default CardAviso