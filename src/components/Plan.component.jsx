import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, HStack, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FaCheck } from "react-icons/fa6";
import { AuthContext } from "../context/authContext";

const Plan = () => {

    const { isSuperanfitrion } = useContext(AuthContext);

    return (
        <HStack spacing={10} flexDir={'row'} justifyContent={'center'} alignItems={'center'}>
            <Box>
                <Card align='center'>
                    <CardHeader>
                        <Heading size='md'>Plan Anfitrión</Heading>
                        <h1>{ isSuperanfitrion }</h1> 
                        {
                            isSuperanfitrion && <Badge colorScheme="blue">Plan actual</Badge>
                        }
                    </CardHeader>
                    <CardBody>
                        <List spacing={3} fontSize={{ base: 15, md: 20 }}>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Publicación de pensiones ilimitada
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Destacado en Búsquedas
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Notificación a los estudiantes de tus anuncios
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Asesoramiento Personalizado
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Integración de Redes Sociales
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Acceso a nuevas caracteristicas de la plataforma
                            </ListItem>
                        </List>
                    </CardBody>
                    <CardFooter>
                        <Button colorScheme='blue'>Suscribirme</Button>
                    </CardFooter>
                </Card>
            </Box>
            <Box>
                <Card align='center'>
                    <CardHeader>
                        <Heading size='md'>Plan SuperAnfitrión</Heading>
                    </CardHeader>
                    <CardBody>
                        <List spacing={3} fontSize={{ base: 15, md: 20 }}>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Publicación de pensiones ilimitada
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Destacado en Búsquedas
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Notificación a los estudiantes de tus anuncios
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Asesoramiento Personalizado
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Integración de Redes Sociales
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Acceso a nuevas caracteristicas de la plataforma
                            </ListItem>
                        </List>
                    </CardBody>
                    <CardFooter>
                        <Button colorScheme='blue'>Suscribirme</Button>
                    </CardFooter>
                </Card>
            </Box>
        </HStack>
    )
}

export { Plan };