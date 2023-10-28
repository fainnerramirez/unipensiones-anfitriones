import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Stack,
    InputGroup,
    InputLeftElement,
    Input,
    InputRightElement,
    HStack,
    Box,
    Image,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    VStack
} from '@chakra-ui/react'
import { BiUser } from "react-icons/bi";
import { MdPassword } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SingInUser = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const errorManagment = (error) => {
        switch(error){
            case 'auth/invalid-login-credentials': 
            toast.error("Credenciales Incorrectas. ¡Verifica nuevamente!", {
                theme: "colored",
                position: "top-center"
            })
            break;

            case 'auth/invalid-email': 
            toast.error("Correo Inválido. Escribe un correo válido", {
                theme: "colored",
                position: "top-center"
            })
            break;
            default: break;
        }
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("user autenticated: ", user);
            })
            .catch((error) => {
                const errorCode = error.code;
                errorManagment(errorCode);
            });
    }

    return (
        <>
            <Button
                ml="5"
                colorScheme={'green'}
                bg={'teal.500'}
                rounded={'md'}
                px={6}
                _hover={{
                    bg: 'teal.600',
                }}
                onClick={onOpen}>
                Iniciar Sesión
            </Button>
            <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmitForm}>
                        <ModalHeader bg={'teal.500'} color={'whiteAlpha.900'}>Ingreso de anfitrión</ModalHeader>
                        <ModalCloseButton color={'whiteAlpha.900'} />
                        <ModalBody>
                            <Stack spacing={4} mt="5">
                                <VStack spacing={'20px'} mt={'10px'}>
                                    <FormControl width={'90%'} isRequired>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <BiUser color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='text' placeholder='Correo electrónico' size='lg' onChange={(e) => setEmail(e.target.value)} />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl width={'90%'} isRequired>
                                        <InputGroup >
                                            <InputLeftElement pointerEvents='none'>
                                                <MdPassword color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='text' placeholder='Contraseña' size='lg' onChange={(e) => setPassword(e.target.value)} />
                                        </InputGroup>
                                    </FormControl>
                                </VStack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Button
                                isLoading={isLoading}
                                colorScheme='blue'
                                loadingText='Cargando'
                                color={'teal.800'}
                                variant={'outline'}
                                mt={3}
                                _hover={{ backgroundColor: 'teal.800', color: "white" }}
                                type='submit'
                            >Ingresar</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal >
            <ToastContainer />
        </>
    )
}

export default SingInUser