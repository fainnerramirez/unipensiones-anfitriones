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
    VStack,
    Text,
    Divider
} from '@chakra-ui/react'
import { BiUser } from "react-icons/bi";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, deleteUser } from "firebase/auth";
import { errorManagment } from '../firebase/errors/errorManagmentUser';
import { db } from '../firebase/firestore/database';
import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { getAnfitrionByUserId } from '../firebase/collections/querys/anfitriones';
import { AuthContext } from '../context/authContext';

const SingInUser = () => {

    const [show, setShow] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { auth } = useContext(AuthContext);
    const handleClick = () => setShow(!show)

    const handleClickGooglePopup = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const q = query(collection(db, 'anfitriones'), where('userId', '==', user.uid), limit(1));
                getDocs(q)
                    .then(async (querySnapshot) => {
                        if (!querySnapshot.empty) {
                            setIsLoading(false)
                            const doc = querySnapshot.docs[0];
                            toast.success("Accediendo a tu perfil " + (user.displayName ?? user.email), {
                                theme: "colored",
                                position: "top-center"
                            })
                            setTimeout(function () {
                                window.location.href = "user/" + doc?.id;
                            }, 3000);
                        } else {
                            await deleteUser(auth.currentUser);
                            toast.error("Este correo no existe, por favor registrate", {
                                theme: "colored",
                                position: "top-center"
                            });
                            auth.signOut();
                        }
                    })
                    .catch((error) => {
                        console.error('Error al buscar el usuario:', error);
                        errorManagment(error.code);
                    });
            }).catch((error) => {
                errorManagment(error.code);
            });
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                setIsLoading(false);

                if (!auth.currentUser?.emailVerified) {
                    toast.error("Aún no has verificado tu corrreo electrónico para activar tu cuenta UP", {
                        theme: "colored",
                        position: "top-center"
                    })
                    auth.signOut();
                    return;
                }

                const user = userCredential.user;

                try {
                    const documentAnfitrion = await getAnfitrionByUserId(user.uid);

                    if (documentAnfitrion) {
                        toast.success("Accediendo a tu perfil " + (user.displayName ?? user.email), {
                            theme: "colored",
                            position: "top-center"
                        })
                        setTimeout(function () {
                            window.location.href = "user/" + documentAnfitrion?.id;
                        }, 1000);
                    }
                    else {
                        console.log("Documento no encontrado!");
                    }
                } catch (error) {
                    console.error(error);
                    errorManagment(error.code);
                }
            }).catch((error) => {
                setIsLoading(false);
                const errorCode = error.code;
                console.log("Error email, password: ", error)
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
                                                    {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
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
                        <ModalFooter display={'flex'} justifyContent={'center'} alignItems={'center'} flexDir={'column'}>
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
                            <Divider mt="5" />
                            <Box>
                                <Box mt="5">
                                    <Text textAlign={'center'}>ó inicia sesión con</Text>
                                </Box>
                                <Box mt="5" display={'flex'} justifyContent={'center'}>
                                    <Button rightIcon={<FcGoogle />} colorScheme='teal' variant={'outline'} onClick={handleClickGooglePopup}>
                                        Google
                                    </Button>
                                </Box>
                            </Box>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal >
            <ToastContainer />
        </>
    )
}

export default SingInUser