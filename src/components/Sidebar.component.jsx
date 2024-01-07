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
    Stack,
    useDisclosure,
    Heading,
    Image,
    Badge
} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { CgMenu } from "react-icons/cg";
import { MdWorkspacePremium } from "react-icons/md";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()
    const { userAuth, isSuperanfitrion } = useContext(AuthContext);

    return (
        <>
            <Button marginLeft={'20px'} colorScheme='blue' onClick={onOpen} padding={'20px'}>
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
                                src={userAuth?.photoURL ?? `https://ui-avatars.com/api/?name=${userAuth?.displayName}&background=0D8ABC&color=fff`}
                                alt={userAuth?.username}
                            />
                        </Box>
                        {
                            <Box display={'flex'} justifyContent={'center'} mt={5}>
                                <Badge
                                    ml='1'
                                    bg={isSuperanfitrion ? '#e6b219' : 'gray.300'}
                                    borderRadius={5}
                                    textAlign={'center'}
                                    display={'flex'}
                                    alignItems={'center'}
                                    p={1}>
                                    {isSuperanfitrion ? 'Plan SuperAnfitrión' : 'Plan Anfitrión'}
                                    {isSuperanfitrion && <MdWorkspacePremium ml={20} fontSize={20} />}
                                </Badge>
                            </Box>
                        }
                        <Box display={'flex'} justifyContent={'center'} mt={3}>
                            <Heading size="sm" textTransform={'capitalize'}>{userAuth?.displayName}</Heading>
                        </Box>
                        <Stack spacing='24px' marginTop={'30px'}>
                            <Box>
                                <Button colorScheme="blue" width={'full'} onClick={() => navigate("profile", { replace: true })}>
                                    Mi Perfil
                                </Button>
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