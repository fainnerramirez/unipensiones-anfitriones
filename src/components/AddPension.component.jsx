import React, { useState } from "react";
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
    Checkbox
} from "@chakra-ui/react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import imagen from "../assets/preview.png"


const DatosBasicos = () => {
    return (
        <Stack spacing='10px' mt={10}>
            <Box>
                <Input
                    placeholder='Escribe un título llamativo'
                />
            </Box>
            <Box>
                <Textarea id='desc' placeholder="Escribe una descripción que resalte tu pensión" />
            </Box>
            <HStack spacing={5}>
                <Box>
                    <Select id='owner' defaultValue='Seleccione e tipo de espacio'>
                        <option value='segun'>Segun Adebayo</option>
                        <option value='kola'>Kola Tioluwani</option>
                    </Select>
                </Box>
                <Box>
                    <Select id='owner' defaultValue='seleccione el tipo de alojamiento'>
                        <option value='segun'>Segun Adebayo</option>
                        <option value='kola'>Kola Tioluwani</option>
                    </Select>
                </Box>
            </HStack>
            <HStack>
                <Box>
                    <Select id='owner' defaultValue='seleccione el tipo de cupo'>
                        <option value='segun'>Segun Adebayo</option>
                        <option value='kola'>Kola Tioluwani</option>
                    </Select>
                </Box>
                <Box>
                    <Input
                        placeholder='Barrio de la pensión'
                    />
                </Box>
            </HStack>
            <Stack>
                <Box>
                    <Input
                        placeholder='Dirección de la pensión'
                    />
                </Box>
                <Box>
                    <Input
                        type="number"
                        placeholder='Digite el precio'
                    />
                </Box>
            </Stack>
            <Box>
                <Select id='owner' defaultValue='seleccione los servicios'>
                    <option value='segun'>Segun Adebayo</option>
                    <option value='kola'>Kola Tioluwani</option>
                </Select>
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
            <Image src={imagen} height={350}/>
        </Stack>
    );
}

const AddPension = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { goToNext, goToPrevious, activeStep } = useSteps({
        index: 0,
        count: 3,
    });

    const steps = [
        { title: 'Datos', description: 'Básicos' },
        { title: 'Normas', description: 'Reglas' },
        { title: 'Vista', description: 'Previa' },
    ];

    const stepComponents = [
        <DatosBasicos />,
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
