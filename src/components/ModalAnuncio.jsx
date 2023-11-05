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
    HStack,
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
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FiUpload } from "react-icons/fi"
import { GrDirections } from "react-icons/gr";
import { CiLocationOn } from "react-icons/ci";
import { LuSubtitles } from "react-icons/lu";
import { LoadFilePension } from '../firebase/references/images/pensions';
import { AuthContext } from '../context/authContext';
import { MultiSelect } from 'chakra-multiselect';
import CardAvisoPreview from './CardAvisoPreview.component';
import 'react-toastify/dist/ReactToastify.css';

const ModalAnuncio = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const fileInputUpdaloadRef = useRef(null);
    const [image, setImage] = useState("");
    const { userAuth } = useContext(AuthContext);
    const [valueSelect, setValueSelect] = useState([])
    const [pais, setPais] = useState("")
    const [ciudad, setCiudad] = useState("")
    const [precio, setPrecio] = useState("")

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
                                        <Button colorScheme='teal' rightIcon={<FiUpload />} onClick={handleFileAnuncio}>
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
                                                <Select placeholder='Seleccione el tipo de espacio' color={'gray'}>
                                                    <option value='1'>Casa</option>
                                                    <option value='2'>Apartamento</option>
                                                    <option value='3'>ApartaEstudio</option>
                                                </Select>
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl isRequired>
                                            <InputGroup >
                                                <Select placeholder='Seleccione el tipo de alojamiento' color={'gray'}>
                                                    <option value='1'>Alojamiento entero</option>
                                                    <option value='2'>Una habitación</option>
                                                    <option value='3'>Habitación compartida</option>
                                                </Select>
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl isRequired>
                                            <InputGroup >
                                                <Select placeholder='Seleccione el tipo de cupo' color={'gray'}>
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
                                    <HStack spacing={5}>
                                        <FormControl>
                                            <NumberInput
                                                onChange={(valueString) => setPrecio(parse(valueString))}
                                                value={format(precio)}
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>
                                        <FormControl isRequired>
                                                <MultiSelect
                                                    value={valueSelect}
                                                    options={optionsMultiService}
                                                    onChange={setValueSelect}
                                                    placeholder='Seleccione los servicios'
                                                />
                                        </FormControl>
                                    </HStack>
                                </Stack>
                            </ModalBody>
                            <ModalFooter display={'flex'} justifyContent={'flex-start'}>
                                <Button
                                    // isLoading={isLoading}
                                    width={'full'}
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
                            <CardAvisoPreview image={image} ciudad={ciudad} pais={pais} precio={precio} />
                        </Box>
                    </HStack>
                </ModalContent>
            </Modal >
            <ToastContainer />
        </>
    )
}

export default ModalAnuncio