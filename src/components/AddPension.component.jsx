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
    HStack
} from "@chakra-ui/react";
import { BsFillPlusCircleFill } from "react-icons/bs";

const AddPension = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { goToNext, goToPrevious, activeStep } = useSteps({
        index: 0,
        count: 3, // Número total de pasos
    });

    const steps = [
        { title: 'Paso 1', description: 'Datos básicos' },
        { title: 'Paso 2', description: 'Políticas' },
        { title: 'Final', description: 'Previsualización' },
    ];

    const handleNext = () => {
        // Aquí puedes agregar lógica adicional antes de pasar al siguiente paso si es necesario
        goToNext();
    };

    return (
        <>
            <Button bg="transparent" borderRadius={'full'} onClick={onOpen}>
                <BsFillPlusCircleFill fontSize={40} />
            </Button>
            <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Publica tu pensión</DrawerHeader>
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
                        <ButtonGroup display={'flex'} justifyContent={'end'} pb={3}>
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
