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
import { useState, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom"
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiUser } from "react-icons/bi"
import { MdPassword } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { TbEdit } from "react-icons/tb"
import { HiOutlineMail } from "react-icons/hi";
import UserNotFound from "../assets/userNotFound.png"
//firebase
import { LoadFileProfileUser } from "../firebase/references/users/profiles";
//auth
import { auth } from "../firebase/authentication/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addUser } from '../firebase/collections/users';
import { AuthContext } from '../context/authContext';

function Register() {
    let navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const [selectedImage, setSelectedImage] = useState(UserNotFound);
    const [selectedFileProfile, setSelectedFileProfile] = useState(null);
    const [username, setUsername] = useState("")
    const [userlastname, setUserlastname] = useState("")
    const [day, setDay] = useState("")
    const [usernameApp, setUsernameApp] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userPasswordTwo, setUserPasswordTwo] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleClick = () => setShow(!show)

    const handleButtonEditPhotoUser = () => {
        fileInputRef.current.click();
    };

    const handleFileProfileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setSelectedFileProfile(selectedFile);
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        setIsLoading(true)

        if (userPassword.length < 7 || userPasswordTwo.length < 7) {
            setIsLoading(false)
            toast.error("Las contraseñas deben tener por lo menos 7 caracteres", {
                theme: "colored",
                position: "top-center"
            })
            return;
        }

        if (userPassword !== userPasswordTwo) {
            setIsLoading(false)
            toast.error("Las contraseñas no coinciden...Vuelve a validar", {
                theme: "colored",
                position: "top-center"
            })
            return;
        }

        try {

            const { user } = await createUserWithEmailAndPassword(auth, userEmail, userPassword);

            const options = {
                userId: user.uid,
                username: username,
                lastname: userlastname,
                birthday: day,
                usernameApp: usernameApp,
                userEmail: userEmail,
            }

            const doc = await addUser(options);

            await updateProfile(auth.currentUser, {
                displayName: username + " " + userlastname,
                //agregar la url de la foto de perfil
            });

            if (selectedFileProfile) {
                await LoadFileProfileUser(selectedFileProfile);
            }

            toast.success("Haz sido autenticado como " + user?.email, {
                theme: "colored",
                position: "top-center"
            })

            setIsLoading(false)
            setTimeout(function () {
                navigate("user/" + doc?.id, { replace: true }); //+ el id del usuario para buscar los datos relacionados a ese usuario: fotos y datos basicos
                navigate(0)
            }, 3000);
        }
        catch (e) {
            setIsLoading(false)
            console.log("Ha ocurrido un error: ", e)

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
                                        onChange={handleFileProfileChange}
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
                                isLoading={isLoading}
                                colorScheme='blue'
                                loadingText='Cargando'
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