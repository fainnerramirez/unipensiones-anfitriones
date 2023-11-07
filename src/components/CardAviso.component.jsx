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
    Skeleton
} from "@chakra-ui/react"
import { getAdvertsAnfitrionByUserId } from '../firebase/collections/querys/anfitriones'
import { AuthContext } from '../context/authContext'

const CardAviso = ({ image }) => {

    const [documentAdvert, setDocumentAdvert] = useState(null);
    const { userAuth } = useContext(AuthContext);

    useEffect(() => {
        const getAverts = async () => {
            const advertsAnfitrion = await getAdvertsAnfitrionByUserId(userAuth?.uid);
            setDocumentAdvert(advertsAnfitrion);        
        }
        getAverts();
        console.log("documento by anuncio: ", documentAdvert)
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

                {/* <Stack mt='6' spacing='3'>
                    <Heading size='md'>Living room Sofa</Heading>
                    <Text>
                        This sofa is perfect for modern tropical spaces, baroque inspired
                        spaces, earthy toned spaces and for people who love a chic design with a
                        sprinkle of vintage design.
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        $450
                    </Text>
                </Stack> */}
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