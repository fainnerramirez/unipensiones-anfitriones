import React, { useState } from "react"
import { Box, Button, ButtonGroup, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Radio, RadioGroup, Select, Stack, Step, StepDescription, StepIndicator, StepSeparator, StepStatus, StepTitle, Stepper, Textarea, useDisclosure, useSteps } from "@chakra-ui/react"
import { BsFillPlusCircleFill } from "react-icons/bs"

const AddPension = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = useState('right')
    const steps = [
        { title: 'Paso 1', description: 'Datos básicos' },
        { title: 'Paso 2', description: 'Políticas' },
        { title: 'Final', description: 'Previsualización' },
    ]

    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    return (
        <>
            <Button bg="transparent" borderRadius={'full'} onClick={onOpen}>
                <BsFillPlusCircleFill fontSize={40} />
            </Button>
            <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Publica tu pensión</DrawerHeader>
                    <DrawerBody>
                        <Stepper size={{ base: 'sm', md: 'md', lg: 'lg' }} colorScheme='blue' index={activeStep}>
                            {steps.map((step, index) => (
                                <Step key={index}>
                                    <StepIndicator>
                                        <StepStatus complete={`✅`} incomplete={`😅`} active={`📍`} />
                                    </StepIndicator>

                                    <Box flexShrink='0'>
                                        <StepTitle>{step.title}</StepTitle>
                                        <StepDescription>{step.description}</StepDescription>
                                    </Box>
                                    <StepSeparator />
                                </Step>
                            ))}
                        </Stepper>
                        <Stack spacing='24px'>
                            <Box>
                                <Input
                                    placeholder='Escribe un título llamativo'
                                />
                            </Box>
                            <Box>
                                <Textarea id='desc' placeholder="Escribe una descripción que resalte tu pensión" />
                            </Box>
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
                            <Box>
                                <Select id='owner' defaultValue='seleccione el tipo de cupo'>
                                    <option value='segun'>Segun Adebayo</option>
                                    <option value='kola'>Kola Tioluwani</option>
                                </Select>
                            </Box>
                            <Box>
                                <Input
                                    placeholder='Barrio'
                                />
                            </Box>
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
                            <Box>
                                <Select id='owner' defaultValue='seleccione los servicios'>
                                    <option value='segun'>Segun Adebayo</option>
                                    <option value='kola'>Kola Tioluwani</option>
                                </Select>
                            </Box>
                            <ButtonGroup display={'flex'} justifyContent={'end'} pb={3}>
                                <Button colorScheme="blue">Siguiente</Button>
                            </ButtonGroup>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export { AddPension }