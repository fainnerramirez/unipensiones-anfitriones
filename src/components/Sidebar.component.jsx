import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Stack,
    useDisclosure,
    Text,
    Heading,
    Image
} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { CgMenu } from "react-icons/cg";
import { AuthContext } from "../context/authContext";

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()
    const { userAuth } = useContext(AuthContext);
    
    console.log("UserAuth:  ", userAuth);

    return (
        <>
            <Button marginLeft={'20px'} colorScheme='teal' onClick={onOpen} padding={'20px'}>
                <CgMenu fontSize={'30px'} />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Mi Cuenta UP
                    </DrawerHeader>
                    <DrawerBody>
                        <Box display={'flex'} justifyContent={'center'}>
                            <Image
                                borderRadius={'full'}
                                boxSize='100px'
                                objectFit='cover'
                                src={userAuth?.photoURL}
                                alt='Dan Abramov'
                            />
                        </Box>
                        <Stack spacing='24px' marginTop={'30px'}>
                            <Box>
                                <Button width={'full'}>Mi Perfil</Button>
                            </Box>
                            <Box>
                                <Button width={'full'}>Mis Anuncios</Button>
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px' display={'flex'} justifyContent={'center'}>
                        <Heading size={'md'}>Unipensiones</Heading>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Sidebar