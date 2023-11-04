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
    Text,
    Box,
    Select,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Divider
} from '@chakra-ui/react'
import { useState, useRef, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BiUser } from "react-icons/bi"
import { MdPassword } from "react-icons/md";
import { BsCalendarDate, BsFillPlusSquareFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { FiUpload } from "react-icons/fi"
import { GrDirections } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import { LuSubtitles } from "react-icons/lu";
import UserNotFound from "../assets/userNotFound.png"
import { LoadFileProfileUser } from "../firebase/references/users/profiles";
import { auth } from "../firebase/authentication/auth";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { addDocUser } from '../firebase/collections/users';
import { errorManagment } from '../firebase/errors/errorManagmentUser';
import 'react-toastify/dist/ReactToastify.css';
import { LoadFilePension } from '../firebase/references/images/pensions';
import { AuthContext } from '../context/authContext';
import CardAviso from './CardAviso.component';
import CardAvisoExample from './CardAvisoExample.component';
import { MultiSelect } from 'chakra-multiselect'

const ModalAnuncio = () => {

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
    const fileInputUpdaloadRef = useRef(null);
    const handleClick = () => setShow(!show)
    const [image, setImage] = useState("");
    const { userAuth } = useContext(AuthContext);
    const [valueSelect, setValueSelect] = useState([])
    const [valuePrice, setValuePrice] = useState('')
    const [pais, setPais] = useState("")
    const [ciudad, setCiudad] = useState("")

    const format = (val) => `$` + val
    const parse = (val) => val.replace(/^\$/, '')

    const handleFileAnuncio = () => {
        fileInputUpdaloadRef.current.click();
    };

    const handleFilePensionChange = async (e) => {
        setImage("")
        const file = e.target.files[0];
        console.log("Files anucnio construcción: ", file);
        if (file) {
            const url = await LoadFilePension(file, userAuth?.uid);
            setImage(url);
        }
    }

    const optionsMultiService = [
        { value: '1', label: 'Wifi' },
        { value: '2', label: 'TV' },
        { value: '3', label: 'Acceso a Cocina' },
        { value: '4', label: 'Acceso a Lavadora' },
        { value: '5', label: 'Estacionamiento' },
        { value: '6', label: 'Aire acondicionado' },
        { value: '7', label: 'Zona de estudio' },
        { value: '8', label: 'Piscina' },
        { value: '9', label: 'Gimnasio' },
        { value: '10', label: 'Terraza' },
    ]

    return (
        <>
            <Button
                colorScheme='teal'
                rightIcon={<BsFillPlusSquareFill />}
                onClick={onOpen}>
                Subir anuncio
            </Button>
            <Modal isOpen={isOpen} size={'full'} onClose={onClose} isCentered motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent>
                    <HStack spacing={10} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
                        <form style={{ width: "50%" }}>
                            <ModalHeader>Publicación de anuncio</ModalHeader>
                            <ModalCloseButton color={'teal.900'} />
                            <ModalBody>
                                <Stack spacing={4}>
                                    <Flex justifyContent={'center'} alignItems={'end'}>
                                        <Button rightIcon={<FiUpload />} onClick={handleFileAnuncio}>
                                            Subir foto
                                        </Button>
                                        <Input
                                            type="file"
                                            ref={fileInputUpdaloadRef}
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleFilePensionChange(e)}
                                        />
                                    </Flex>
                                    <HStack spacing={'5px'} mt={'10px'}>
                                        <FormControl isRequired>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents='none'>
                                                    <LuSubtitles color='gray.300' />
                                                </InputLeftElement>
                                                <Input
                                                    type='text'
                                                    placeholder='Agrega un titulo llamativo al anuncio. Ej: Un ambiente acogedor para estudiantes: Tu mejor opción' />
                                            </InputGroup>
                                        </FormControl>
                                    </HStack>
                                    <HStack spacing={'5px'} mt={'10px'}>
                                        <FormControl isRequired>
                                            <Textarea
                                                placeholder='Agrega una descripción: Comparte lo que hace tu pensión tan especial' />
                                        </FormControl>
                                    </HStack>
                                    <HStack spacing={'5px'} mt={'10px'}>
                                        <FormControl isRequired>
                                            <InputGroup>
                                                <Select placeholder='Seleccione el tipo de espacio'>
                                                    <option value='1'>Casa</option>
                                                    <option value='2'>Apartamento</option>
                                                    <option value='3'>ApartaEstudio</option>
                                                </Select>
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl isRequired>
                                            <InputGroup >
                                                <Select placeholder='Seleccione el tipo de alojamiento' colorScheme={'teal'}>
                                                    <option value='1'>Alojamiento entero</option>
                                                    <option value='2'>Una habitación</option>
                                                    <option value='3'>Habitación compartida</option>
                                                </Select>
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl isRequired>
                                            <InputGroup >
                                                <Select placeholder='Seleccione el tipo de cupo' colorScheme={'teal'}>
                                                    <option value='1'>Solo cupo (habitación)</option>
                                                    <option value='2'>Cupo completo (habitación y comida)</option>
                                                </Select>
                                            </InputGroup>
                                        </FormControl>
                                    </HStack>
                                    <HStack spacing={'5px'} mt={'10px'}>
                                        <FormControl isRequired>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents='none'>
                                                    <CiLocationOn color='gray.300' />
                                                </InputLeftElement>
                                                <Input type='text' placeholder='País' onChange={(e) => setPais(e.target.value)} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl isRequired>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents='none'>
                                                    <CiLocationOn color='gray.300' />
                                                </InputLeftElement>
                                                <Input type='text' placeholder='Ciudad' onChange={(e) => setCiudad(e.target.value)} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl isRequired>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents='none'>
                                                    <CiLocationOn color='gray.300' />
                                                </InputLeftElement>
                                                <Input type='text' placeholder='Barrio' />
                                            </InputGroup>
                                        </FormControl>
                                    </HStack>
                                    <HStack spacing={'5px'}>
                                        <FormControl isRequired>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents='none'>
                                                    <GrDirections color='gray.300' />
                                                </InputLeftElement>
                                                <Input type='text' placeholder='Agrega la dirección' />
                                            </InputGroup>
                                        </FormControl>
                                    </HStack>
                                    <HStack spacing={10}>
                                        <FormControl>
                                            <NumberInput
                                                onChange={(valueString) => setValuePrice(parse(valueString))}
                                                value={format(valuePrice)}
                                                placeholder='hola'
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <FormHelperText>
                                                Establece el precio (COP)
                                            </FormHelperText>
                                        </FormControl>
                                        <FormControl isRequired display={'flex'} flexDir={'column'}>
                                            <InputGroup>
                                                <MultiSelect
                                                    value={valueSelect}
                                                    options={optionsMultiService}
                                                    onChange={setValueSelect}
                                                    placeholder='Seleccione los servicios'
                                                />
                                            </InputGroup>
                                        </FormControl>
                                    </HStack>
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
                                >Publicar</Button>
                            </ModalFooter>
                        </form>
                        <Box marginTop={20}>
                            <Text textAlign={'center'}>Vista previa de tu anuncio</Text>
                            <Divider color={'teal.900'} />
                            <CardAvisoExample image={image} ciudad={ciudad} pais={pais} />
                        </Box>
                    </HStack>
                </ModalContent>
            </Modal >
            <ToastContainer />
        </>
    )
}

export default ModalAnuncio