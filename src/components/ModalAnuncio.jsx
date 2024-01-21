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
    Divider,
    Image,
    Card,
    CardHeader,
    CardBody,
    List,
    ListItem,
    ListIcon,
    Heading,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    useStepContext,
    CardFooter,
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    StepIcon,
    StepNumber,
    StepTitle,
    StepDescription,
    StepSeparator,
    useSteps,
    VStack,
    ButtonGroup,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Checkbox,
    AccordionIcon,

} from '@chakra-ui/react'
import { useState, useRef, useContext, useEffect } from 'react';
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FiUpload } from "react-icons/fi"
import { GrDirections } from "react-icons/gr";
import { CiLocationOn } from "react-icons/ci";
import { TbStars } from "react-icons/tb";
import { MdArrowDropDown, MdCheckCircle, MdSettings } from "react-icons/md";
import { LuSubtitles } from "react-icons/lu";
import { LoadFilePension } from '../firebase/references/images/pensions';
import { AuthContext } from '../context/authContext';
import { MultiSelect } from 'chakra-multiselect';
import CardAvisoPreview from './CardAvisoPreview.component';
import {
    createAdvertForAnfitrion,
    deleteAnfitrion,
    deleteAdvertAnfitrion,
    getAdvertsAnfitrionByUserId,
    getAnfitrionByUserId
} from '../firebase/collections/querys/anfitriones';
import 'react-toastify/dist/ReactToastify.css';
import Nequi from "../assets/nequi.png";
import MercadoPago from "../assets/mercadopago.png"
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Planes from "../assets/planes.png"

const DatosBasicos = (
    {
        handleFilePensionChange,
        setValueSelect,
        setTitle,
        setDesc,
        setBarrio,
        setTipoEspacio,
        setTipoAlojamiento,
        setTipoCupo,
        setPais,
        setCiudad,
        setDireccion,
        setPrecio,
        valueSelectService,
        title,
        desc,
        barrio,
        tipoEspacio,
        tipoAlojamiento,
        tipoCupo,
        pais,
        ciudad,
        precio,
        image,
        direccion,
        steps,
        activeStep
    }
) => {

    const { userAuth } = useContext(AuthContext);
    const fileInputUpdaloadRef = useRef(null);
    const handleFileAnuncio = () => {
        fileInputUpdaloadRef.current.click();
    };

    const format = (val) => `$` + val
    const parse = (val) => val.replace(/^\$/, '')
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
        { value: '11', label: 'Lavado de ropa' }
    ]

    return (
        <HStack spacing={10} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
            <VStack>
                <Stack spacing={4}>
                    <Flex justifyContent={'center'} alignItems={'end'}>
                        <Button colorScheme='blue' rightIcon={<FiUpload />} onClick={handleFileAnuncio}>
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
                                    placeholder='Agrega un titulo llamativo al anuncio.
                                    Ej: Un ambiente acogedor para estudiantes: Tu mejor opción'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} />
                            </InputGroup>
                        </FormControl>
                    </HStack>
                    <HStack spacing={'5px'} mt={'10px'}>
                        <FormControl isRequired>
                            <Textarea
                                placeholder='Agrega una descripción: Comparte lo que hace tu pensión tan especial'
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </FormControl>
                    </HStack>
                    <HStack spacing={'5px'} mt={'10px'}>
                        <FormControl isRequired>
                            <InputGroup>
                                <Select
                                    value={tipoEspacio}
                                    icon={<MdArrowDropDown />}
                                    placeholder='Seleccione el tipo de espacio'
                                    color={'gray'}
                                    onChange={(e) => setTipoEspacio(e.target.value)}>
                                    <option value='casa'>Casa</option>
                                    <option value='apartamento'>Apartamento</option>
                                    <option value='apartaestudios'>ApartaEstudio</option>
                                </Select>
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <InputGroup>
                                <Select value={tipoAlojamiento} icon={<MdArrowDropDown />} placeholder='Seleccione el tipo de alojamiento' color={'gray'} onChange={(e) => setTipoAlojamiento(e.target.value)}>
                                    <option value='una habitacion'>Una habitación</option>
                                    <option value='habitacion compartida'>Habitación compartida</option>
                                </Select>
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <InputGroup >
                                <Select value={tipoCupo} icon={<MdArrowDropDown />} placeholder='Seleccione el tipo de cupo' color={'gray'} onChange={(e) => setTipoCupo(e.target.value)}>
                                    <option value='solo cupo'>Solo cupo (habitación)</option>
                                    <option value='cupo completo'>Cupo completo (habitación y comida)</option>
                                </Select>
                            </InputGroup>
                        </FormControl>
                    </HStack>
                    <HStack spacing={'5px'} mt={'10px'}>
                        <FormControl isRequired>
                            <InputGroup>
                                <Select value={pais} icon={<MdArrowDropDown />} placeholder='Seleccione el país' color={'gray'} onChange={(e) => setPais(e.target.value)}>
                                    <option value='colombia'>Colombia</option>
                                </Select>
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <InputGroup>
                                <Select value={ciudad} icon={<MdArrowDropDown />} placeholder='Seleccione la ciudad' color={'gray'} onChange={(e) => setCiudad(e.target.value)}>
                                    <option value='santa marta'>Santa Marta</option>
                                </Select>
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <CiLocationOn color='gray.300' />
                                </InputLeftElement>
                                <Input value={barrio} type='text' placeholder='Barrio' onChange={(e) => setBarrio(e.target.value)} />
                            </InputGroup>
                        </FormControl>
                    </HStack>
                    <HStack spacing={'5px'}>
                        <FormControl isRequired>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <GrDirections color='gray.300' />
                                </InputLeftElement>
                                <Input value={direccion} type='text' placeholder='Agrega la dirección' onChange={(e) => setDireccion(e.target.value)} />
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
                        <FormControl isRequired width={600} minWidth={600} maxWidth={600}>
                            <MultiSelect
                                value={valueSelectService}
                                options={optionsMultiService}
                                onChange={(e) => setValueSelect(e)}
                                placeholder='Seleccione los servicios'
                            />
                        </FormControl>
                    </HStack>
                </Stack>
            </VStack>
        </HStack>
    )
}

const Politicas = () => {

    const [checkedItems, setCheckedItems] = useState([true, true, true, true, true])

    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    return (
        <Stack spacing='10px' mt={10}>
            <Heading textAlign={'center'}>Selecciona todas las normas que quieras <br /> que los estudiantes cumplan</Heading>
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Normas de convivencia
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Checkbox
                            isChecked={allChecked}
                            isIndeterminate={isIndeterminate}
                            onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
                        >
                            Normas de convivencia
                        </Checkbox>
                        <Stack pl={6} mt={1} spacing={1}>
                            <Checkbox
                                isChecked={checkedItems[0]}
                                onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                            >
                                Tratar a los demás residentes con cortesía y consideración en todo momento.
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Establecer horarios en los que se debe mantener un ambiente tranquilo, especialmente durante las horas de estudio y descanso.
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[2]}
                                onChange={(e) => setCheckedItems([checkedItems[2], e.target.checked])}
                            >
                                Respetar y cuidar las áreas comunes, como la cocina, el baño y las zonas de estar. Limpiar y guardar los utensilios y equipos después de su uso.
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[3]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Respetar la privacidad de los demás, evitando entrar en las habitaciones de los compañeros sin su permiso.
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[4]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Notificar a la administración o compañeros de habitación sobre la llegada de visitantes y respetar las normas establecidas para las visitas
                            </Checkbox>
                        </Stack>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Normas de seguridad
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Checkbox
                            isChecked={allChecked}
                            isIndeterminate={isIndeterminate}
                            onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
                        >
                            Todas las normas
                        </Checkbox>
                        <Stack pl={6} mt={1} spacing={1}>
                            <Checkbox
                                isChecked={checkedItems[0]}
                                onChange={() => handleCheckboxChange(0)}
                            >
                                Limpiar después de usar los espacios comunes, incluyendo la cocina, áreas de estar y baños.
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={() => handleCheckboxChange(1)}
                            >
                                Guardar los objetos y utensilios en su lugar correspondiente.
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[2]}
                                onChange={() => handleCheckboxChange(2)}
                            >
                                Compartir los espacios comunes de manera equitativa y respetar el derecho de los demás a utilizarlos.
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[3]}
                                onChange={() => handleCheckboxChange(3)}
                            >
                                Respetar la privacidad de los demás al utilizar espacios comunes y no interferir con actividades privadas.
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[4]}
                                onChange={() => handleCheckboxChange(4)}
                            >
                                Reportar cualquier problema o daño a la administración de la pensión.
                            </Checkbox>
                        </Stack>

                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Normas de uso de espacios comunes
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Checkbox
                            isChecked={allChecked}
                            isIndeterminate={isIndeterminate}
                            onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
                        >
                            Todas las normas
                        </Checkbox>
                        <Stack pl={6} mt={1} spacing={1}>
                            <Checkbox
                                isChecked={checkedItems[0]}
                                onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                            >
                                Limpiar después de usar los espacios comunes, incluyendo la cocina, áreas de estar y baños.
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Guardar los objetos y utensilios en su lugar correspondiente.
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Compartir los espacios comunes de manera equitativa y respetar el derecho de los demás a utilizarlos.
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Respetar la privacidad de los demás al utilizar espacios comunes y no interferir con actividades privadas.
                            </Checkbox>

                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Reportar cualquier problema o daño a la administración de la pensión.
                            </Checkbox>
                        </Stack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Stack>
    );
}

const Previsualizacion = () => {
    return (
        <Heading p={20}>Tu pensión esta lista para ser publicada</Heading>
    )
}

const ModalAnuncio = ({ isvalidPublished }) => {

    const { userAuth, isSuperanfitrion } = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [image, setImage] = useState("");
    const [valueSelectService, setValueSelect] = useState([])
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [barrio, setBarrio] = useState("");
    const [tipoEspacio, setTipoEspacio] = useState("");
    const [tipoAlojamiento, setTipoAlojamiento] = useState("");
    const [tipoCupo, setTipoCupo] = useState("");
    const [pais, setPais] = useState("")
    const [ciudad, setCiudad] = useState("")
    const [direccion, setDireccion] = useState("")
    const [precio, setPrecio] = useState("")
    const [urlNequi, setUrlNequi] = useState("https://drive.google.com/file/d/1N6zX2sp-FPdoNA1xUaVoJScS53DqBtq8/view?usp=drive_link")
    const [urlMercadoPago, setUrlMercadoPago] = useState("https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848c6efe38018c78e268e70389");

    const format = (val) => `$` + val
    const parse = (val) => val.replace(/^\$/, '')
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
        { value: '11', label: 'Lavado de ropa' }
    ]

    const steps = [
        { title: 'Datos', description: 'Básicos' },
        { title: 'Normas', description: 'Reglas' },
    ]

    const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    const handleFilePensionChange = async (e) => {
        setImage("")
        const file = e.target.files[0];
        if (file) {
            const url = await LoadFilePension(file, userAuth?.uid);
            setImage(url);
        }
    }

    const PropsDatosBasicos = {
        steps,
        activeStep,
        handleFilePensionChange,
        setValueSelect,
        setTitle,
        setDesc,
        setBarrio,
        setTipoEspacio,
        setTipoAlojamiento,
        setTipoCupo,
        setPais,
        setCiudad,
        setDireccion,
        setPrecio,
        valueSelectService,
        title,
        desc,
        barrio,
        tipoEspacio,
        tipoAlojamiento,
        tipoCupo,
        pais,
        ciudad,
        precio,
        image,
        direccion
    }

    const stepComponents = [
        <DatosBasicos
            {...PropsDatosBasicos}
        />,
        <Politicas />,
        <Previsualizacion />,
    ];

    const handleNextStep = () => {
        goToNext();
    }

    const handlePreviousStep = () => {
        goToPrevious();
    }

    const handleSubmitPublicForm = async (event) => {
        event.preventDefault();
        const document = await getAdvertsAnfitrionByUserId(userAuth?.uid);
        let responseDelete = null;
        if (document != null) {
            responseDelete = await deleteAdvertAnfitrion(document?.id);
        }
        const nuevoAnuncio = {
            username: userAuth?.displayName ?? "",
            userPhoto: userAuth?.photoURL ?? "",
            phone: userAuth?.phone ?? "",
            urlFotoAnuncio: image,
            titulo: title,
            descripcion: desc,
            pais: pais,
            ciudad: ciudad,
            barrio: barrio,
            direccion: direccion,
            tipoEspacio: tipoEspacio,
            tipoAlojamiento: tipoAlojamiento,
            tipoCupo: tipoCupo,
            precio: precio,
            Servicios: valueSelectService
        };

        await createAdvertForAnfitrion(userAuth?.uid, nuevoAnuncio);
    }

    useEffect(() => {
        setActiveStep(0)
    }, [])

    const currentStepComponent = stepComponents[activeStep];

    return (
        <>
            <Button
                colorScheme='blue'
                rightIcon={<BsFillPlusSquareFill />}
                onClick={onOpen}>
                <Text display={{ base: 'none', md: 'block' }}>Subir anuncio</Text>
            </Button>
            {
                isvalidPublished || isSuperanfitrion ?
                    <Modal isOpen={isOpen} size={'full'} onClose={onClose} isCentered motionPreset='slideInBottom'>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Nueva Publicación</ModalHeader>
                            <form style={{ width: "100%" }} onSubmit={handleSubmitPublicForm}>
                                <HStack spacing={10} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
                                    <VStack>
                                        <Box margin={'auto'} width={'100%'}>
                                            <Stepper index={activeStep} minWidth={'100%'}>
                                                {steps.map((step, index) => (
                                                    <Step key={index}>
                                                        <StepIndicator>
                                                            <StepStatus
                                                                complete={<StepIcon />}
                                                                incomplete={<StepNumber />}
                                                                active={<StepNumber />}
                                                            />
                                                        </StepIndicator>
                                                        <Box flexShrink='0'>
                                                            <StepTitle>{step.title}</StepTitle>
                                                            <StepDescription>{step.description}</StepDescription>
                                                        </Box>
                                                        <StepSeparator />
                                                    </Step>
                                                ))}
                                            </Stepper>
                                        </Box>
                                        <ModalCloseButton color={'blue.900'} />
                                        <ModalBody>
                                            {currentStepComponent}
                                        </ModalBody>
                                        <ModalFooter width={'100%'}>
                                            <ButtonGroup display={'flex'} justifyContent={'end'} pb={3} pt={3} width={'100%'} >
                                                {(activeStep != 0) && <Button colorScheme="blue" variant={'outline'} onClick={handlePreviousStep}>Atrás</Button>}
                                                {
                                                    activeStep <= steps.length - 1 ? (
                                                        <Button colorScheme="blue" onClick={handleNextStep}>
                                                            Siguiente
                                                        </Button>
                                                    )
                                                        :
                                                        (
                                                            <Button
                                                                // isLoading={isLoading}
                                                                width={'full'}
                                                                colorScheme='green'
                                                                loadingText='Cargando'
                                                                _hover={{ backgroundColor: 'blue.800', color: "white" }}
                                                                type='submit'
                                                            >Publicar</Button>
                                                        )
                                                }
                                            </ButtonGroup>
                                        </ModalFooter>
                                    </VStack>
                                    <Box marginTop={20}>
                                        <Text textAlign={'center'}>Vista previa de tu anuncio</Text>
                                        <Divider color={'blue.900'} />
                                        <CardAvisoPreview image={image} ciudad={ciudad} pais={pais} precio={precio} services={valueSelectService} />
                                    </Box>
                                </HStack>
                            </form>
                        </ModalContent>
                    </Modal >
                    :
                    <Modal borderRadius={15} isOpen={isOpen} size={'xl'} onClose={onClose} isCentered motionPreset='slideInBottom' bgGradient='linear(to-l, #87C4FF, #0174BE)'>
                        <ModalOverlay />
                        <ModalContent borderRadius={15}>
                            <HStack display={'flex'} flexDir={'column'}>
                                <ModalHeader textAlign={'center'} width={'100%'}>
                                    <Heading fontSize={30}>Conviértete en un Superanfitrión</Heading>
                                </ModalHeader>
                                <ModalCloseButton color={'gray'} mt={2} />
                                <ModalBody width={{ base: '100%', md: '95%' }}>
                                    <Card variant={'elevated'} borderRadius={15}>
                                        <CardBody>
                                            <Image src={Planes} />
                                        </CardBody>
                                        <CardFooter textAlign={'center'}>
                                            <Heading fontSize={'xl'}>
                                                Publica de manera ilimitada tus pensiones,
                                                destaca entre todas las publicaciones,
                                                los estudiantes recibirán una notificación directa de tus pensiones
                                                y mucho más.
                                            </Heading>
                                        </CardFooter>
                                    </Card>
                                </ModalBody>
                                <ModalFooter display={'flex'} justifyContent={'center'} alignItems={'center'} bg={'white'} width={'full'}>
                                    <Link to={'plans'}>
                                        <Button colorScheme='blue' size={'lg'}>Ver Planes</Button>
                                    </Link>
                                </ModalFooter>
                            </HStack>
                        </ModalContent >
                    </Modal >
            }
        </>
    )
}

export default ModalAnuncio