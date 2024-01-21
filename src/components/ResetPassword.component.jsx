import React, { useContext, useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Box, Button, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, Text, VStack } from '@chakra-ui/react';
import { MdPasswor, MdEmail } from 'react-icons/md';
import { toast } from "react-toastify";
import { AuthContext } from '../context/authContext';
import { useEffect } from 'react';

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { auth } = useContext(AuthContext);
    const [segundos, setSegundos] = useState(10);
    
    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            await sendPasswordResetEmail(auth, email);
            setIsLoading(false);
            toast.success("Correo enviado exitosamente", {
                theme: "colored",
                position: "top-center"
            });
        } catch (error) {
            console.error(error.code);
            console.error(error.message);
            setIsLoading(false);
        }
    }

    return (
        <Box mt={'100px'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDir={'column'}>
            <Box>
                <Heading as="h2" textAlign={'center'}>
                    !Hola¡ Restableceremos tu nueva contraseña
                </Heading>
            </Box>
            <form onSubmit={handleUpdatePassword}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDir={'column'} width={"100%"}>
                    <VStack mt={'40px'} width={"100%"}>
                        <FormControl width={{ base: '90%', md: '100%' }} isRequired>
                            <InputGroup >
                                <InputLeftElement pointerEvents='none'>
                                    <MdEmail color='gray.300' />
                                </InputLeftElement>
                                <Input type='email' bg={'whiteAlpha'} placeholder='Ingresa tu correo' size='lg' onChange={(e) => setEmail(e.target.value)} />
                            </InputGroup>
                            <FormHelperText fontSize={18} textAlign={'center'}>Te enviaremos un correo electrónico para restablecer tu contraseña</FormHelperText>
                        </FormControl>
                    </VStack>
                    <Button
                        isLoading={isLoading}
                        colorScheme='blue'
                        loadingText='Cargando'
                        mt={5}
                        _hover={{ backgroundColor: 'blue.800', color: "white" }}
                        type='submit'
                    >Restablecer contraseña</Button>
                </Box>
            </form>
        </Box>
    )
}

export default ResetPassword;