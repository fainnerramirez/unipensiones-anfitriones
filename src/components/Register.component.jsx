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
    FormHelperText,
    Box,
    Divider,
    Text,
    AbsoluteCenter,
    Checkbox
} from '@chakra-ui/react'
import { useState, useRef, useContext } from 'react';
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
import { FaCamera } from "react-icons/fa6";
import { toast } from "react-toastify";

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
        console.log("Evennto submit");

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

            console.log("User: ", user)

            const options = {
                userId: user.uid,
                username: username,
                lastname: userlastname,
                birthday: day,
                phone: phone,
                userEmail: userEmail,
                superanfitrion: false
            }

            const doc = await createAnfitrion(options);

            console.log("doc created: ", doc)

            await updateProfile(auth.currentUser, {
                displayName: username + " " + userlastname,
            });

            if (selectedFileProfile) {
                console.log("Entro aqui")
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
            console.log("ERROR", error)
            setIsLoading(false)
            const errorCode = error.code;
            errorManagment(errorCode);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmitForm}>
                <Stack spacing={4}>
                    <Flex justifyContent={'center'} alignItems={'end'}>
                        <Image
                            borderRadius='full'
                            objectFit={'cover'}
                            boxSize='100px'
                            src={selectedImage}
                            alt='Foto del usuario'
                        />
                        <Button onClick={handleButtonEditPhotoUser} colorScheme='blue'>
                            <TbEdit />
                        </Button>
                        <Input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileProfileChange}
                        />
                    </Flex>
                    <HStack spacing={'5px'} mt={'10px'} flexDir={{ base: 'column', md: 'row' }}>
                        <FormControl width={{ base: '100%', md: '50%' }} isRequired>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <BiUser color='gray.300' />
                                </InputLeftElement>
                                <Input type='text' placeholder='Nombres' variant='filled' onChange={(e) => setUsername(e.target.value)} />
                            </InputGroup>
                        </FormControl>
                        <FormControl width={{ base: '100%', md: '50%' }} isRequired>
                            <InputGroup >
                                <InputLeftElement pointerEvents='none'>
                                    <BiUser color='gray.300' />
                                </InputLeftElement>
                                <Input type='text' placeholder='Apellidos' variant='filled' onChange={(e) => setUserlastname(e.target.value)} />
                            </InputGroup>
                        </FormControl>
                    </HStack>
                    <HStack spacing={'5px'}>
                        <FormControl isRequired width={{ base: '100%', md: '50%' }}>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <BsCalendarDate color='gray.300' />
                                </InputLeftElement>
                                <Input type='date' placeholder='Fecha de nacimiento' variant='filled' onChange={(e) => setDay(e.target.value)} />
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired display={'flex'} flexDir={'column'} width={{ base: '100%', md: '50%' }}>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <AiFillPhone color='gray.300' />
                                </InputLeftElement>
                                <Input type='number' placeholder='Teléfono o Celular' variant='filled' onChange={(e) => setPhone(e.target.value)} mt={1}/>
                                <Checkbox size='md' colorScheme='blue' ml={3}>
                                    Tiene WhatsApp
                                </Checkbox>
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
                            <Input type='email' placeholder='Correo electrónico' variant='filled' onChange={(e) => setUserEmail(e.target.value)} />
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
                            <Input type={show ? 'text' : 'password'} placeholder='Ingresa contraseña' variant='filled' onChange={(e) => setUserPassword(e.target.value)} />
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
                            <Input type={show ? 'text' : 'password'} placeholder='Confirma tu contraseña' variant='filled' onChange={(e) => setUserPasswordTwo(e.target.value)} />
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
                <Box mt={5}>
                    <Button colorScheme='blue' width={'full'} type='submit' isLoading={isLoading}>Registrarme</Button>
                </Box>
                <Box position='relative' padding='6'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4'>
                        ¿Ya tienes cuenta?
                    </AbsoluteCenter>
                </Box>
                <Box mt={5}>
                    <Button colorScheme='blue' variant={'outline'} width={'full'}>Ingresar</Button>
                </Box>
            </form>
        </>
    )
}
export default Register