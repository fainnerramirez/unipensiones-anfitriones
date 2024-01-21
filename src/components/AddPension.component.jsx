import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Select,
    Stack,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Textarea,
    useDisclosure,
    useSteps,
    HStack,
    Image,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Checkbox,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Heading,
    ModalCloseButton,
    ModalBody,
    Card,
    CardBody,
    CardFooter,
    ModalFooter,
    Link,
    Text,
    VStack
} from "@chakra-ui/react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import imagen from "../assets/preview.png"
import { FiUpload } from "react-icons/fi";
import { LoadFilePension } from "../firebase/references/images/pensions";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { MultiSelect } from "chakra-multiselect";
import { createAdvertForAnfitrion, deleteAdvertAnfitrion, getAdvertsAnfitrionByUserId, getAllAdvertsAnfitrionByUserId } from "../firebase/collections/querys/anfitriones";
import { useEffect } from "react";
import Planes from "../assets/planes.png"
import CardAvisoPreview from "./CardAvisoPreview.component";

const DatosBasicos = ({
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
    activeStep,
    optionsMultiService
}) => {

    const fileInputUpdaloadRef = useRef(null);
    const [filename, setFilename] = useState("");
    const handleFileAnuncio = () => {
        fileInputUpdaloadRef.current.click();
    };

    const handleFilePension = (e) => {
        handleFilePensionChange(e);
        setFilename(e.target.files[0].name)
    };

    return (
        <Stack spacing='10px' mt={10}>
            <Flex justifyContent={'center'} alignItems={'end'}>
                <VStack spacing={4}>
                    <Text>{filename}</Text>
                    <Button colorScheme='blue' rightIcon={<FiUpload />} onClick={handleFileAnuncio}>
                        Subir foto
                    </Button>
                </VStack>
                <Input
                    id="file"
                    type="file"
                    ref={fileInputUpdaloadRef}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFilePension(e)}
                />
            </Flex>
            <Box>
                <Input
                    placeholder='Escribe un título llamativo'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Box>
            <Box>
                <Textarea id='desc' value={desc} placeholder="Escribe una descripción que resalte tu pensión" onChange={(e) => setDesc(e.target.value)} />
            </Box>
            <HStack spacing={5}>
                <Box>
                    <Select id='' defaultValue='Seleccione e tipo de espacio' value={tipoEspacio} onChange={(e) => setTipoEspacio(e.target.value)}>
                        <option value=''>Tipo de Espacio</option>
                        <option value='casa'>Casa</option>
                        <option value='apartamento'>Apartamento</option>
                        <option value='apartaestudios'>ApartaEstudio</option>
                    </Select>
                </Box>
                <Box>
                    <Select id='' defaultValue='seleccione el tipo de alojamiento' value={tipoAlojamiento} onChange={(e) => setTipoAlojamiento(e.target.value)}>
                        <option value=''>Tipo de Alojamiento</option>
                        <option value='una habitacion'>Una habitación</option>
                        <option value='habitacion compartida'>Habitación compartida</option>
                    </Select>
                </Box>
            </HStack>
            <HStack>
                <Box>
                    <Select id='' defaultValue='seleccione el tipo de cupo' value={tipoCupo} onChange={(e) => setTipoCupo(e.target.value)}>
                        <option value=''>Tipo de Cupo</option>
                        <option value='solo cupo'>Solo cupo (habitación)</option>
                        <option value='cupo completo'>Cupo completo (habitación y comida)</option>
                    </Select>
                </Box>
                <Box>
                    <Input
                        placeholder='Barrio de la pensión'
                        onChange={(e) => setBarrio(e.target.value)}
                        value={barrio}
                    />
                </Box>
            </HStack>
            <Stack>
                <Box>
                    <Input
                        placeholder='Dirección de la pensión'
                        onChange={(e) => setDireccion(e.target.value)}
                        value={direccion}
                    />
                </Box>
                <Box>
                    <Input
                        type="number"
                        placeholder='Digite el precio'
                        onChange={(e) => setPrecio(e.target.value)}
                        value={precio}
                    />
                </Box>
            </Stack>
            <Box>
                <MultiSelect
                    value={valueSelectService}
                    options={optionsMultiService}
                    onChange={(e) => setValueSelect(e)}
                    placeholder='Seleccione los servicios'
                />
            </Box>
        </Stack>
    );
}

const Politicas = () => {

    const [checkedItems, setCheckedItems] = React.useState([false, false])

    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    return (
        <Stack spacing='10px' mt={10}>
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
                            Tratar a los demás con respeto y cortesía
                        </Checkbox>
                        <Stack pl={6} mt={1} spacing={1}>
                            <Checkbox
                                isChecked={checkedItems[0]}
                                onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                            >
                                Respetar a las áreas comunes
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Respetar la privacidad de los demás
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
                            Normas de seguridad
                        </Checkbox>
                        <Stack pl={6} mt={1} spacing={1}>
                            <Checkbox
                                isChecked={checkedItems[0]}
                                onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                            >
                                Guardar los utensilios en el lugar correspondiente
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Cualquier daño reportarlo con la administración
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
                            Espacios comunes
                        </Checkbox>
                        <Stack pl={6} mt={1} spacing={1}>
                            <Checkbox
                                isChecked={checkedItems[0]}
                                onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                            >
                                Utilizar las áreas comunes de manera equitativa
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Limpiar las áreas comunes después de usarlos
                            </Checkbox>
                        </Stack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Stack>
    );
}

const Previsualizacion = (props) => {
    return (
        <Stack spacing='10px' mt={10}>
            <CardAvisoPreview {...props} />
        </Stack>
    );
}

const AddPension = () => {

    const [documentAdvert, setDocumentAdvert] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
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
    const { userAuth, isSuperanfitrion } = useContext(AuthContext);

    useEffect(() => {
        const getAverts = async () => {
            const advertsAnfitrion = await getAllAdvertsAnfitrionByUserId(userAuth?.uid, 10);
            setDocumentAdvert(advertsAnfitrion);
        }
        getAverts();
    }, [image, userAuth])

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

    const { goToNext, goToPrevious, activeStep } = useSteps({
        index: 0,
        count: 3,
    });

    const steps = [
        { title: 'Datos', description: 'Básicos' },
        { title: 'Normas', description: 'Reglas' },
        { title: 'Vista', description: 'Previa' },
    ];

    const handleFilePensionChange = async (e) => {
        setImage("")
        const file = e.target.files[0];
        if (file) {
            const url = await LoadFilePension(file, userAuth?.uid);
            setImage(url);
        }
    }

    const PropsDatosBasicos = {
        optionsMultiService,
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

    const PropsPreview = {
        image,
        ciudad,
        pais,
        precio,
        services: valueSelectService
    }


    const stepComponents = [
        <DatosBasicos {...PropsDatosBasicos} />,
        <Politicas />,
        <Previsualizacion {...PropsPreview} />,
    ];

    const handleNext = () => {
        goToNext();
    };

    const handlePrevious = () => {
        goToPrevious();
    };

    const currentStepComponent = stepComponents[activeStep];

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

    return (
        <>
            <Button bg="transparent" borderRadius={'full'} onClick={onOpen}>
                <BsFillPlusCircleFill fontSize={40} />
            </Button>
            {
                (documentAdvert != null ? false : true) || isSuperanfitrion ?
                    <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader borderBottomWidth='1px'>Nueva publicación</DrawerHeader>
                            <DrawerBody>
                                <form style={{ width: "100%" }} onSubmit={handleSubmitPublicForm}>
                                    <Stepper size={{ base: 'sm' }} index={activeStep}>
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
                                    {currentStepComponent}
                                    <ButtonGroup display={'flex'} justifyContent={'end'} pb={3} pt={3}>
                                        {activeStep != 0 && <Button colorScheme="blue" variant={'outline'} onClick={handlePrevious}>Atrás</Button>}
                                        {activeStep < steps.length - 1 ? (
                                            <Button colorScheme="blue" onClick={handleNext}>
                                                Siguiente
                                            </Button>
                                        )
                                            :
                                            <Button colorScheme="green" type='submit'>Publicar</Button>
                                        }
                                    </ButtonGroup>
                                </form>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
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
                                    <Link href={'/plans'}>
                                        <Button colorScheme='blue' size={'lg'}>Ver Planes</Button>
                                    </Link>
                                </ModalFooter>
                            </HStack>
                        </ModalContent >
                    </Modal >
            }
        </>
    );
};

export { AddPension };
