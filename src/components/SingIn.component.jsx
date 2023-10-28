import React, { useContext, useState } from 'react'
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
import { errorManagment } from '../firebase/errors/errorManagmentUser';
import { db } from '../firebase/firestore/database';
import { Collections } from "../firebase/collections/names.config"
import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from "react-router-dom";

const SingInUser = () => {

    const [show, setShow] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => setShow(!show)

    const handleSubmitForm = (event) => {
        event.preventDefault();
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                setIsLoading(false);
                const user = userCredential.user;
                console.log("user autenticated: ", user.uid);
                const q = query(collection(db, 'anfitriones'), where('userId', '==', user.uid), limit(1));

                getDocs(q)
                    .then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            const doc = querySnapshot.docs[0]; // Obtiene el primer documento
                            setIsLoading(false)

                            toast.success("Accediendo a tu perfil " + (user.displayName ?? user.email), {
                                theme: "colored",
                                position: "top-center"
                            })

                            setTimeout(function () {
                                window.location.href = "user/" + doc?.id;
                            }, 3000);
                        } else {
                            console.log('Documento no encontrado.');
                        }
                    })
                    .catch((error) => {
                        console.error('Error al buscar el usuario:', error);
                    });

            }).catch((error) => {
                setIsLoading(false);
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
                                            <Input type='email' placeholder='Correo electrónico' size='lg' onChange={(e) => setEmail(e.target.value)} />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl width={'90%'} isRequired>
                                        <InputGroup >
                                            <InputLeftElement pointerEvents='none'>
                                                <MdPassword color='gray.300' />
                                            </InputLeftElement>
                                            <Input type={show ? 'text' : 'password'} placeholder='Contraseña' size='lg' onChange={(e) => setPassword(e.target.value)} />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='md' mt={'1.5'} onClick={handleClick}>
                                                    {show ? <AiOutlineEyeInvisible size={'md'} /> : <AiOutlineEye size={'md'} />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <Box color={'teal.600'}>
                                        <a href="/resetpassword">Restablecer mi contraseña</a>
                                    </Box>
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