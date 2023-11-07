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
    SkeletonText
} from "@chakra-ui/react"
import { getAdvertsAnfitrionByUserId } from '../firebase/collections/querys/anfitriones'
import { AuthContext } from '../context/authContext'
import { ConvertPrice } from "../utils/PriceConvert";

const CardAviso = ({ image }) => {

    const [documentAdvert, setDocumentAdvert] = useState(null);
    const { userAuth } = useContext(AuthContext);

    useEffect(() => {
        const getAverts = async () => {
            const advertsAnfitrion = await getAdvertsAnfitrionByUserId(userAuth?.uid);
            console.log("advertsAnfitrion: ", advertsAnfitrion)
            setDocumentAdvert(advertsAnfitrion);
        }
        getAverts();
    }, [userAuth])

    return (
        <Card maxW='md'>
            <CardBody>
                {
                    documentAdvert != null ? <Image
                        src={documentAdvert?.urlPhoto}
                        alt='Green double couch with wooden legs'
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
                        <Text marginTop={3} textAlign={'left'} fontWeight={'bolder'}>$ {ConvertPrice(documentAdvert?.price)} <span style={{ fontWeight: 'normal' }}>mes</span></Text>
                        :
                        <SkeletonText mt='4' noOfLines={7} spacing='4' skeletonHeight='2' />
                }
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='teal'>
                        Editar anuncio
                    </Button>
                    <Button variant='ghost' colorScheme='red'>
                        Eliminar anuncio
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default CardAviso