import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, HStack, Heading, Image, List, ListIcon, ListItem, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FaCheck } from "react-icons/fa6";
import { AuthContext } from "../context/authContext";
import "../styles/glass.css";
import Premio from "../assets/premio.png";
import RedesSociales from "../assets/redes-sociales.png";

const Plan = () => {

    const { isSuperanfitrion } = useContext(AuthContext);

    console.log("isSuperanfitrion", isSuperanfitrion)

    return (
        <HStack spacing={10} flexDir={'row'} justifyContent={'flex-start'} alignItems={'center'}>
            <Box>
                <Card align='center' className="card-glass" bg={'transparent'} height={600} width={500} pt={5}>
                    <Box>
                        <Image src={RedesSociales} height={100} width={100} />
                    </Box>
                    <CardHeader>
                        <Heading size='lg'>Anfitrión</Heading>
                        {
                            !isSuperanfitrion &&
                            <Box>
                                <Badge colorScheme='blue' p={2} borderRadius={'full'}>Tu Plan Actual</Badge>
                            </Box>
                        }
                        <Box>
                            <Stat textAlign={'center'}>
                                <StatHelpText fontSize={20}>Gratis</StatHelpText>
                            </Stat>
                        </Box>
                    </CardHeader>
                    <CardBody>
                        <List spacing={3} fontSize={{ base: 15, md: 20 }}>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Una sola publicación de pensión
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='blue.500' />
                                Una única foto de la pensión
                            </ListItem>
                        </List>
                    </CardBody>
                </Card>
            </Box>
            <Box>
                <Card align='center' width={500} pt={5} bg={'blue'} bgGradient='linear(to-l, #2323ff, #00d4ff)'>
                    <Box>
                        <Image src={Premio} height={100} width={100} />
                    </Box>
                    <CardHeader textAlign={'center'}>
                        <Heading size='lg'>Super Anfitrión</Heading>
                        <Box>
                            <Stat textAlign={'center'}>
                                <StatNumber fontSize={40}>$29.900 pesos</StatNumber>
                                <StatHelpText fontSize={20}>
                                    semestral
                                </StatHelpText>
                            </Stat>
                        </Box>
                    </CardHeader>
                    <CardBody>
                        <List spacing={3} fontSize={{ base: 15, md: 20 }} p={0} m={0}>
                            <ListItem>
                                <ListIcon as={FaCheck} color='purple' />
                                Publicación de pensiones ilimitada
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='purple' />
                                Hasta tres fotos de tu pensión (proximamente)
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='purple' />
                                Destacado en Búsquedas
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='purple' />
                                Notificación a los estudiantes de tus anuncios
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='purple' />
                                Asesoramiento Personalizado
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='purple' />
                                Integración de Redes Sociales
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FaCheck} color='purple' />
                                Acceso a nuevas caracteristicas de la plataforma
                            </ListItem>
                        </List>
                    </CardBody>
                    <CardFooter width={'full'} pb={2} pt={0}>
                        <Button width={'full'} colorScheme='purple' size={'lg'} mb={2}>
                            Elejir Plan
                        </Button>
                    </CardFooter>
                </Card>
            </Box>
        </HStack>
    )
}

export { Plan };