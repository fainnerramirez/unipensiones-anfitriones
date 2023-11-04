import React, { useContext } from 'react'
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

const CardAvisoExample = ({ image }) => {

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
                                    alt='Dan Abramov' src={userAuth?.photoURL} borderRadius={'50%'} />
                                <Text>{userAuth?.displayName}</Text>
                            </HStack>
                            :
                            <SkeletonCircle size='10' />
                    }
                    <SkeletonText mt='4' noOfLines={7} spacing='4' skeletonHeight='2' />
                </Box>
            </CardBody>
        </Card>
    )
}

export default CardAvisoExample