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
    Box,
    Image,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText
} from '@chakra-ui/react'
import { useState, useRef } from 'react';

import UserNotFound from "../assets/userNotFound.png"

import { BiUser } from "react-icons/bi"
import { MdPassword } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { TbEdit } from "react-icons/tb"

import { Form, Field, Formik } from 'formik';

function Register() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const [selectedImage, setSelectedImage] = useState(UserNotFound);
    const handleClick = () => setShow(!show)

    const fileInputRef = useRef(null);

    const handleButtonEditPhotoUser = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    function validateName(value) {
        let error
        if (!value) {
            error = 'Name is required'
        } else if (value.toLowerCase() !== 'naruto') {
            error = "Jeez! You're not a fan 😱"
        }
        return error
    }


    return (
        <>
            <Button
                colorScheme={'green'}
                bg={'pink.500'}
                rounded={'full'}
                px={6}
                _hover={{
                    bg: 'pink.600',
                }}
                onClick={onOpen}>
                Comienza Ahora
            </Button>
            <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Registro de anfitrión</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            initialValues={{ name: 'Sasuke' }}
                            onSubmit={(values, actions) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2))
                                    actions.setSubmitting(false)
                                }, 1000)
                            }}
                        >
                            <Form>
                                <Stack spacing={4}>
                                    <Flex justifyContent={'center'} alignItems={'end'}>
                                        <Image
                                            borderRadius='full'
                                            objectFit={'cover'}
                                            boxSize='150px'
                                            src={selectedImage}
                                            alt='Foto del usuario'
                                        />
                                        <Button onClick={handleButtonEditPhotoUser}>
                                            <TbEdit />
                                        </Button>
                                        <Input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </Flex>
                                    <HStack spacing={'5px'} mt={'10px'}>
                                        <FormControl width={'50%'}>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents='none'>
                                                    <BiUser color='gray.300' />
                                                </InputLeftElement>
                                                <Input type='text' placeholder='Nombres' />
                                            </InputGroup>
                                            <FormErrorMessage>example error</FormErrorMessage>
                                        </FormControl>

                                        <InputGroup width={'50%'}>
                                            <InputLeftElement pointerEvents='none'>
                                                <BiUser color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='text' placeholder='Apellidos' />
                                        </InputGroup>
                                    </HStack>
                                    <HStack spacing={'5px'}>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <BsCalendarDate color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='date' placeholder='Fecha de nacimiento' />
                                        </InputGroup>

                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <BiUser color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='text' placeholder='Nombre de usuario' />
                                        </InputGroup>
                                    </HStack>
                                    <FormControl>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents='none'
                                            >
                                                <MdPassword color='green.500' />
                                            </InputLeftElement>
                                            <Input type={show ? 'text' : 'password'} placeholder='Ingresa contraseña' />
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
                                            <Input type={show ? 'text' : 'password'} placeholder='Confirma tu contraseña' />
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
                            </Form>
                        </Formik>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            color={'blue.800'}
                            variant={'outline'}
                            mt={3}
                            _hover={{ backgroundColor: 'blue.800', color: "white" }}
                        >Registrarme</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default Register