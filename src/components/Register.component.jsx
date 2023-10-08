import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
} from '@chakra-ui/react'

function Register() {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Animi aliquam, deleniti libero corporis a facilis fuga
                        eveniet accusantium reprehenderit molestiae voluptas mollitia
                        consequuntur! Aliquid, veritatis!
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default Register