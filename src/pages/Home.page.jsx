import React from 'react'
import Register from '../components/Register.component'
import { Box, HStack, Heading, Image, Text } from '@chakra-ui/react'
import '../styles/glass.css';
import CardAnfitrion from "../assets/cardAfitrion.png"
import LogoRow from '../components/LogoRow.component';

const Homepage = () => {
    return (
        <HStack
            spacing={10}
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={{ base: 'column', md: 'row' }}
            height={{base: 'auto', md: '100vh'}}>
            <Box
                bgGradient='linear(to-l, #87C4FF, #0174BE)'
                height={'100%'}
                width={{ base: '100%', md: '50%' }}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'flex-start'}
                flexDir={'column'}
            >
                <Box mt={10}>
                    <LogoRow />
                </Box>
                <Box mt={10}>
                    <Image src={CardAnfitrion} borderRadius={10} m={'auto'} width={{ base: '90%', md: 800 }} />
                </Box>
                <Box color={'white'} textAlign={'center'} mt={{ base: 2, md: 10 }}>
                    <Heading fontWeight={'bold'} p={1}>
                        Personaliza Tu Anuncio
                    </Heading>
                    <Text width={{ base: '90%', md: '50%' }} margin={'auto'} fontSize={20}>
                        Agrega una foto llamativa de tu pensión, un titulo divertido, el precio, entre otros datos;
                        y nosotros nos encargamos de que cientos de estudiantes puedan encontrarte!
                    </Text>
                </Box>
            </Box>
            <Box height={'100%'} width={{ base: '100%', md: '50%' }}>
                <Box pr={{ base: 5, md: 20 }} pl={{ base: 5, md: 20 }}>
                    <Heading width={'100%'} p={{base: 5, md: 10}} fontWeight={'bold'} fontSize={{base: 30, xl: 40}} textAlign={'center'}>Haz parte de la comunidad Unipensiones</Heading>
                    <Register />
                </Box>
            </Box>
        </HStack>
    )
}

export default Homepage