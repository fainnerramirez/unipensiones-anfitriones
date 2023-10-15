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
    FormHelperText
} from '@chakra-ui/react'
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserNotFound from "../assets/userNotFound.png"

import { BiUser } from "react-icons/bi"
import { MdPassword } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { TbEdit } from "react-icons/tb"
import { HiOutlineMail } from "react-icons/hi";

//firebase
import { db } from "../firebase/firestore/database";
import { addDoc, collection } from "firebase/firestore";
import { LoadFileProfileUser } from "../firebase/references/users/profiles";

//auth
import { auth } from "../firebase/authentication/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


function Register() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const [selectedImage, setSelectedImage] = useState(UserNotFound);
    const handleClick = () => setShow(!show)

    //sets variables form
    const [username, setUsername] = useState("")
    const [userlastname, setUserlastname] = useState("")
    const [day, setDay] = useState("")
    const [usernameApp, setUsernameApp] = useState(false)
    const [userEmail, setUserEmail] = useState(false)
    //paswword
    const [userPassword, setUserPassword] = useState(false)
    const [userPasswordTwo, setUserPasswordTwo] = useState(false)

    const fileInputRef = useRef(null);

    const handleButtonEditPhotoUser = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            //subiendo archivo de perfil de usuario en firestore
            LoadFileProfileUser(selectedFile);
            //mostrando archivo en la vista
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        if (userPassword.lenght < 7 || userPasswordTwo.lenght < 7) {
            toast.error("Las contraseñas deben tener por lo menos 7 caracteres", {
                theme: "colored"
            })
            return;
        }

        if (userPassword !== userPasswordTwo) {
            toast.error("Las contraseñas no coinciden...Vuelve a validar", {
                theme: "colored"
            })
            return;
        }

        try {
            //creando usuario auth
            createUserWithEmailAndPassword(auth, userEmail, userPassword)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("Users: ", user);

                    toast.success("Usuario autenticado correctamente", {
                        theme: "colored"
                    })

                    try {
                        //agregando documento a la coleccion de usuarios
                        const docRef = await addDoc(collection(db, "users"), {
                            userId: user.uid,
                            username: username,
                            lastname: userlastname,
                            birthday: day,
                            usernameApp: usernameApp,
                            userEmail: userEmail,
                        });

                        console.log("documento: ", docRef);
                        console.log("Documento user guardado: ", docRef.id);

                        toast.success("Usuario registrado correctamente: " + docRef.id, {
                            theme: "colored"
                        })

                        updateProfile(user, {
                            displayName: username + userlastname
                        }).then(() => {
                            // Profile updated!
                            // ...
                            toast.success("Usuario ACTUALIZADO: " + docRef.id, {
                                theme: "colored"
                            })
                        }).catch((error) => {
                            // An error occurred
                            // ...
                            toast.error("error al actualizar el Usuario: " + docRef.id, {
                                theme: "colored"
                            })
                        });
                    }
                    catch (e) {
                        console.log(e)
                        toast.error("Error al crear el documento: " + e, {
                            theme: "colored"
                        })
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    toast.error("Error: " + errorMessage, {
                        theme: "colored"
                    })
                    // ..
                });

        } catch (e) {
            console.error("Error al crear el usuario: auth: ", e);
            toast.error("Error: " + e, {
                theme: "colored"
            })
        }
    }

    return (
        <>
            <Button
                colorScheme={'green'}
                bg={'pink.500'}
                rounded={'full'}
                px={6}
                _hover={{
                    bg: 'pink.600',
                }}
                onClick={onOpen}>
                Comienza Ahora
            </Button>
            <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
                <ModalOverlay />

                <ModalContent>
                    <form onSubmit={handleSubmitForm}>
                        <ModalHeader>Registro de anfitrión</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>

                            <Stack spacing={4}>
                                <Flex justifyContent={'center'} alignItems={'end'}>
                                    <Image
                                        borderRadius='full'
                                        objectFit={'cover'}
                                        boxSize='150px'
                                        src={selectedImage}
                                        alt='Foto del usuario'
                                    />
                                    <Button onClick={handleButtonEditPhotoUser}>
                                        <TbEdit />
                                    </Button>
                                    <Input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                </Flex>
                                <HStack spacing={'5px'} mt={'10px'}>
                                    <FormControl width={'50%'} isRequired>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <BiUser color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='text' placeholder='Nombres' onChange={(e) => setUsername(e.target.value)} />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl width={'50%'} isRequired>
                                        <InputGroup >
                                            <InputLeftElement pointerEvents='none'>
                                                <BiUser color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='text' placeholder='Apellidos' onChange={(e) => setUserlastname(e.target.value)} />
                                        </InputGroup>
                                    </FormControl>
                                </HStack>
                                <HStack spacing={'5px'}>
                                    <FormControl isRequired>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <BsCalendarDate color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='date' placeholder='Fecha de nacimiento' onChange={(e) => setDay(e.target.value)} />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <BiUser color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='text' placeholder='Nombre de usuario' onChange={(e) => setUsernameApp(e.target.value)} />
                                        </InputGroup>
                                    </FormControl>
                                </HStack>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                        >
                                            <HiOutlineMail color='green.500' />
                                        </InputLeftElement>
                                        <Input type='email' placeholder='Correo electrónico' onChange={(e) => setUserEmail(e.target.value)} />
                                    </InputGroup>
                                    <FormHelperText>
                                        Escribe un correo válido. Deberás validar tu correo electrónico
                                    </FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                        >
                                            <MdPassword color='green.500' />
                                        </InputLeftElement>
                                        <Input type={show ? 'text' : 'password'} placeholder='Ingresa contraseña' onChange={(e) => setUserPassword(e.target.value)} />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormHelperText>
                                        Debe ser igual o mayor a 7 caractéres.
                                    </FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                        >
                                            <MdPassword color='green.500' />
                                        </InputLeftElement>
                                        <Input type={show ? 'text' : 'password'} placeholder='Confirma tu contraseña' onChange={(e) => setUserPasswordTwo(e.target.value)} />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormHelperText>
                                        Debe ser igual o mayor a 7 caractéres.
                                    </FormHelperText>
                                </FormControl>
                            </Stack>

                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme='blue'
                                color={'blue.800'}
                                variant={'outline'}
                                mt={3}
                                _hover={{ backgroundColor: 'blue.800', color: "white" }}
                                type='submit'
                            >Registrarme</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal >
            <ToastContainer />
        </>
    )
}
export default Register