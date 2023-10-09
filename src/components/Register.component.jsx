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

    const handleSubmitForm = (event) => {
        event.preventDefault();
        console.log("Click submit: ", event)
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
                    <form onSubmit={handleSubmitForm}>
                        <ModalHeader>Registro de anfitrión</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>

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
                                    <FormControl width={'50%'} isRequired>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <BiUser color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='text' placeholder='Nombres' />
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl width={'50%'} isRequired>
                                        <InputGroup >
                                            <InputLeftElement pointerEvents='none'>
                                                <BiUser color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='text' placeholder='Apellidos' />
                                        </InputGroup>
                                    </FormControl>
                                </HStack>
                                <HStack spacing={'5px'}>
                                    <FormControl isRequired>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <BsCalendarDate color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='date' placeholder='Fecha de nacimiento' />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <BiUser color='gray.300' />
                                            </InputLeftElement>
                                            <Input type='text' placeholder='Nombre de usuario' />
                                        </InputGroup>
                                    </FormControl>
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

                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme='blue'
                                color={'blue.800'}
                                variant={'outline'}
                                mt={3}
                                _hover={{ backgroundColor: 'blue.800', color: "white" }}
                                type='submit'
                            >Registrarme</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal >
        </>
    )
}
export default Register