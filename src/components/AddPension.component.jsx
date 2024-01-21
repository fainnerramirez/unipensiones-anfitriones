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
    Flex
} from "@chakra-ui/react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import imagen from "../assets/preview.png"
import { FiUpload } from "react-icons/fi";
import { LoadFilePension } from "../firebase/references/images/pensions";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { MultiSelect } from "chakra-multiselect";

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
    const handleFileAnuncio = () => {
        console.log("Entro en ref ", fileInputUpdaloadRef)
        fileInputUpdaloadRef.current.click();
    };

    return (
        <Stack spacing='10px' mt={10}>
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
            <Box>
                <Input
                    placeholder='Escribe un título llamativo'
                />
            </Box>
            <Box>
                <Textarea id='desc' placeholder="Escribe una descripción que resalte tu pensión" onChange={(e) => setDesc(e.target.value)} />
            </Box>
            <HStack spacing={5}>
                <Box>
                    <Select id='' defaultValue='Seleccione e tipo de espacio' onChange={(e) => setTipoEspacio(e.target.value)}>
                        <option value=''>Tipo de Espacio</option>
                        <option value='casa'>Casa</option>
                        <option value='apartamento'>Apartamento</option>
                        <option value='apartaestudios'>ApartaEstudio</option>
                    </Select>
                </Box>
                <Box>
                    <Select id='' defaultValue='seleccione el tipo de alojamiento' onChange={(e) => setTipoAlojamiento(e.target.value)}>
                        <option value=''>Tipo de Alojamiento</option>
                        <option value='una habitacion'>Una habitación</option>
                        <option value='habitacion compartida'>Habitación compartida</option>
                    </Select>
                </Box>
            </HStack>
            <HStack>
                <Box>
                    <Select id='' defaultValue='seleccione el tipo de cupo' onChange={(e) => setTipoCupo(e.target.value)}>
                        <option value=''>Tipo de Cupo</option>
                        <option value='solo cupo'>Solo cupo (habitación)</option>
                        <option value='cupo completo'>Cupo completo (habitación y comida)</option>
                    </Select>
                </Box>
                <Box>
                    <Input
                        placeholder='Barrio de la pensión'
                        onChange={(e) => setBarrio(e.target.value)}
                    />
                </Box>
            </HStack>
            <Stack>
                <Box>
                    <Input
                        placeholder='Dirección de la pensión'
                        onChange={(e) => setDireccion(e.target.value)}
                    />
                </Box>
                <Box>
                    <Input
                        type="number"
                        placeholder='Digite el precio'
                        onChange={(e) => setPrecio(e.target.value)}
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
                            Parent Checkbox
                        </Checkbox>
                        <Stack pl={6} mt={1} spacing={1}>
                            <Checkbox
                                isChecked={checkedItems[0]}
                                onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                            >
                                Child Checkbox 1
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Child Checkbox 2
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
                            Parent Checkbox
                        </Checkbox>
                        <Stack pl={6} mt={1} spacing={1}>
                            <Checkbox
                                isChecked={checkedItems[0]}
                                onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                            >
                                Child Checkbox 1
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Child Checkbox 2
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
                            Parent Checkbox
                        </Checkbox>
                        <Stack pl={6} mt={1} spacing={1}>
                            <Checkbox
                                isChecked={checkedItems[0]}
                                onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                            >
                                Child Checkbox 1
                            </Checkbox>
                            <Checkbox
                                isChecked={checkedItems[1]}
                                onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            >
                                Child Checkbox 2
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
        <Stack spacing='10px' mt={10}>
            <Image src={imagen} height={350} />
        </Stack>
    );
}

const AddPension = () => {

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
    const { userAuth } = useContext(AuthContext);

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

    const stepComponents = [
        <DatosBasicos {...PropsDatosBasicos} />,
        <Politicas />,
        <Previsualizacion />,
    ];

    const handleNext = () => {
        goToNext();
    };

    const handlePrevious = () => {
        goToPrevious();
    };

    const currentStepComponent = stepComponents[activeStep];

    return (
        <>
            <Button bg="transparent" borderRadius={'full'} onClick={onOpen}>
                <BsFillPlusCircleFill fontSize={40} />
            </Button>
            <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Nueva publicación</DrawerHeader>
                    <DrawerBody>
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
                                <Button colorScheme="green">Publicar</Button>
                            }
                        </ButtonGroup>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export { AddPension };
