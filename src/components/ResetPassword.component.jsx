import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Box, Button, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react';
import { MdPasswor, MdEmail } from 'react-icons/md';
import {toast, ToastContainer} from "react-toastify";

const ResetPassword = () => {

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const auth = getAuth();

    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            await sendPasswordResetEmail(auth, email);
            setIsLoading(false);
            console.log("correo enviado")
            toast.success("El correo para restablecer tu contraseña ha sido enviado", {
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
                <Heading as="h2">
                    !Hola¡ Restableceremos tu nueva contraseña
                </Heading>
            </Box>
            <form onSubmit={handleUpdatePassword}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDir={'column'} width={"100%"}>
                    <VStack mt={'40px'} width={"100%"}>
                        <FormControl width={'100%'} isRequired>
                            <InputGroup >
                                <InputLeftElement pointerEvents='none'>
                                    <MdEmail color='gray.300' />
                                </InputLeftElement>
                                <Input type='email' placeholder='Ingresa tu correo' size='lg' onChange={(e) => setEmail(e.target.value)} />
                            </InputGroup>
                            <FormHelperText textAlign={'center'}>Te enviaremos un correo para restablecer tu contraseña</FormHelperText>
                        </FormControl>
                    </VStack>
                    <Button
                        isLoading={isLoading}
                        colorScheme='blue'
                        loadingText='Cargando'
                        color={'teal.800'}
                        variant={'outline'}
                        mt={5}
                        _hover={{ backgroundColor: 'teal.800', color: "white" }}
                        type='submit'
                    >Restablecer contraseña</Button>
                </Box>
            </form>
            <ToastContainer />
        </Box>
    )
}

export default ResetPassword;