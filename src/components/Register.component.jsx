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
import { useState, useRef, useContext, useEffect } from 'react';
import { BiUser } from "react-icons/bi"
import { MdPassword } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { TbEdit } from "react-icons/tb"
import { HiOutlineMail } from "react-icons/hi";
import UserNotFound from "../assets/icon-photo.png"
import { LoadFileProfileUser } from "../firebase/references/users/profiles";
import { auth } from "../firebase/authentication/auth";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { errorManagment } from '../firebase/errors/errorManagmentUser';
import 'react-toastify/dist/ReactToastify.css';
import { createAnfitrion } from '../firebase/collections/querys/anfitriones';
import { FaCamera } from "react-icons/fa6";
import { toast } from "react-toastify";
import SingInUser from './SingIn.component';
import Confetti from 'react-confetti'
import Swal from 'sweetalert2';

function Register() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const [selectedImage, setSelectedImage] = useState(UserNotFound);
    const [selectedFileProfile, setSelectedFileProfile] = useState(null);
    const [username, setUsername] = useState("")
    const [userlastname, setUserlastname] = useState("")
    const [phone, setPhone] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userPasswordTwo, setUserPasswordTwo] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isWhatsapp, setIsWhatsapp] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
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
            // toast.error("Las contraseñas deben tener por lo menos 7 caracteres", {
            //     theme: "colored",
            //     position: "top-center"
            // })
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
                user: {
                    id: user.uid,
                    name: username,
                    lastname: userlastname,
                    email: userEmail,
                    phone: {
                        number: phone,
                        isWhatsapp: isWhatsapp
                    },
                    superanfitrion: false
                }
            }

            const doc = await createAnfitrion(options);

            await updateProfile(auth.currentUser, {
                displayName: username + " " + userlastname,
                phone: phone
            });

            if (selectedFileProfile) {
                await LoadFileProfileUser(selectedFileProfile, doc?.id);
            }

            //enviando email de verficación
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    setShowConfetti(true);
                    Swal.fire({
                        icon: 'success',
                        title: 'Activa tu cuenta unipensiones',
                        text: "Revisa tu correo electrónico " + user?.email + " para activar tu cuenta en UP. !Ya casi estas dentro!",
                        confirmButtonText: 'Ok',
                        showCloseButton: true,
                        confirmButtonColor: "#0174BE",
                        iconColor: "#0174BE"
                    });
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
            {
                showConfetti && <Confetti gravity={1} />
            }
            <form onSubmit={handleSubmitForm}>
                <Stack spacing={4}>
                    <Flex justifyContent={'center'} alignItems={'end'}>
                        <Image
                            borderRadius='full'
                            objectFit={'cover'}
                            boxSize={{base: '80px', md: '100px'}}
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
                        <FormControl isRequired display={'flex'} flexDir={'column'} width={{ base: '100%', md: '100%' }}>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <AiFillPhone color='gray.300' />
                                </InputLeftElement>
                                <Input type='number' placeholder='Teléfono o Celular' variant='filled' onChange={(e) => setPhone(e.target.value)} mt={1} />
                                <Checkbox
                                    name="hola"
                                    width={'100%'}
                                    size='lg'
                                    colorScheme='blue'
                                    ml={3}
                                    value={false}
                                    onChange={(e) => setIsWhatsapp(e.target.checked)}
                                >
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
                    <AbsoluteCenter bg='transparent' px='4'>
                        ¿Ya tienes cuenta?
                    </AbsoluteCenter>
                </Box>
                <Box mt={5}>
                    <SingInUser />
                </Box>
            </form>
        </>
    )
}
export default Register