import React from 'react'
import Register from '../components/Register.component'
import { Box, HStack, Heading, Image, Text } from '@chakra-ui/react'
import '../styles/glass.css';
import CardAnfitrion from "../assets/cardAfitrion.png"

const Homepage = () => {
    return (
        <Box width={'90%'} margin={'auto'}>
            <HStack spacing={10} justifyContent={'center'} alignItems={'center'} className='card-glass' pt={10} pb={10} bg={'white'}>
                <Box borderRadius={10} bgGradient='linear(to-l, #39A7FF, #0174BE)' height={'70vh'} width={{ base: '45%' }} display={'flex'} alignItems={'center'} justifyContent={'flex-start'} flexDir={'column'}>
                    <Image src={CardAnfitrion} borderRadius={10} mt={10} />
                    <Box color={'white'} textAlign={'center'} mt={10}>
                        <Heading fontWeight={'bold'} p={1}>
                            Personaliza Tu Anuncio
                        </Heading>
                        <Text width={'50%'} margin={'auto'}>
                            Agrega una foto llamativa de tu pensión, un titulo divertido, el precio, entre otros; 
                            y nosotros nos encargamos de que cientos de estudiantes puedan encontrarte! 
                        </Text>
                    </Box>
                </Box>
                <Box borderRadius={10} height={'70vh'} width={{ base: '45%' }}>
                    <Box pt={10} pb={10} pr={20} pl={20}>
                        <Register />
                    </Box>
                </Box>
            </HStack>
        </Box>
    )
}

export default Homepage