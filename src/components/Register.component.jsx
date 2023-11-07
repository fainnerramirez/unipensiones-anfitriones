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
    Image,
    Flex,
    FormControl,
    FormHelperText
} from '@chakra-ui/react'
import { useState, useRef, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BiUser } from "react-icons/bi"
import { MdPassword } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { TbEdit } from "react-icons/tb"
import { HiOutlineMail } from "react-icons/hi";
import UserNotFound from "../assets/userNotFound.png"
import { LoadFileProfileUser } from "../firebase/references/users/profiles";
import { auth } from "../firebase/authentication/auth";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { errorManagment } from '../firebase/errors/errorManagmentUser';
import 'react-toastify/dist/ReactToastify.css';
import { createAnfitrion } from '../firebase/collections/querys/anfitriones';

function Register() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const [selectedImage, setSelectedImage] = useState(UserNotFound);
    const [selectedFileProfile, setSelectedFileProfile] = useState(null);
    const [username, setUsername] = useState("")
    const [userlastname, setUserlastname] = useState("")
    const [day, setDay] = useState("")
    const [phone, setPhone] = useState("")
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
                phone: phone,
                userEmail: userEmail,
            }

            const doc = await createAnfitrion(options);

            await updateProfile(auth.currentUser, {
                displayName: username + " " + userlastname,
            });
            
            if (selectedFileProfile) {
                await LoadFileProfileUser(selectedFileProfile, doc?.id);
            }

            //enviando email de verficación
            sendEmailVerification(auth.currentUser)
            .then(() => {
                toast.success("Revisa tu correo electrónico " + user?.email + " para activar tu cuenta en UP. !Ya casi estas dentro!", {
                    theme: "colored",
                    position: "top-center"
                })
                auth.signOut();
            });

            setIsLoading(false)
        }
        catch (error) {
            setIsLoading(false)
            const errorCode = error.code;
            errorManagment(errorCode);
        }
    }

    return (
        <>
            <Button
                colorScheme={'green'}
                bg={'teal.500'}
                rounded={'full'}
                px={6}
                _hover={{
                    bg: 'teal.600',
                }}
                onClick={onOpen}>
                Comienza Ahora
            </Button>
            <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmitForm}>
                        <ModalHeader bg={'teal.500'} color={'whiteAlpha.900'}>Registro de anfitrión</ModalHeader>
                        <ModalCloseButton color={'whiteAlpha.900'} />
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
                                    <FormControl isRequired display={'flex'} flexDir={'column'}>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <AiFillPhone color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='number' placeholder='Teléfono o Celular' onChange={(e) => setPhone(e.target.value)} />
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
                                        Escribe un correo válido. Deberás validar tu correo electrónico después
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
                                color={'teal.800'}
                                variant={'outline'}
                                mt={3}
                                _hover={{ backgroundColor: 'teal.800', color: "white" }}
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