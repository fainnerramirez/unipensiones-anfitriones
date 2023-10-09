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
    InputRightElement
} from '@chakra-ui/react'
import { useState } from 'react';
import { BiUser } from "react-icons/bi"
import { MdPassword } from "react-icons/md";
import {BsCalendarDate} from "react-icons/bs";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"

function Register() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
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
                        <Stack spacing={4}>
                            <InputGroup width={'50%'}>
                                <InputLeftElement pointerEvents='none'>
                                    <BiUser color='gray.300' />
                                </InputLeftElement>
                                <Input type='text' placeholder='Nombres' />
                            </InputGroup>

                            <InputGroup width={'50%'}>
                                <InputLeftElement pointerEvents='none'>
                                    <BiUser color='gray.300' />
                                </InputLeftElement>
                                <Input type='text' placeholder='Apellidos' />
                            </InputGroup>

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
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                >
                                    <MdPassword color='green.500' />
                                </InputLeftElement>
                                <Input type={show ? 'text' : 'password'} placeholder='Ingresa contraseña' />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? <AiOutlineEyeInvisible/> : <AiOutlineEye />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                >
                                    <MdPassword color='green.500' />
                                </InputLeftElement>
                                <Input type={show ? 'text' : 'password'} placeholder='Confirma tu contraseña' />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ?  <AiOutlineEyeInvisible/> : <AiOutlineEye />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mt={3} variant='ghost'>Registrarme</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default Register