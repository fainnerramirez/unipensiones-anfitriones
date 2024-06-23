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
  Badge,
  Text,
} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { CgMenu } from "react-icons/cg";
import { MdWorkspacePremium } from "react-icons/md";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import imagePensionSide from "../assets/pensionside.jpeg";
import { COLOR } from "../utils/Constants/Color";
import imageResults from "../assets/results.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const { userAuth, isSuperanfitrion } = useContext(AuthContext);

  return (
    <>
      <Button
        marginLeft={"20px"}
        onClick={onOpen}
        padding={"20px"}
        variant={"green-up"}
      >
        <CgMenu fontSize={"30px"} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={COLOR.BLUE} color={COLOR.WHITE}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Mi Cuenta UP</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} justifyContent={"center"}>
              <Image
                borderRadius={"full"}
                boxSize="100px"
                objectFit="cover"
                src={
                  userAuth?.photoURL ??
                  `https://ui-avatars.com/api/?name=${userAuth?.displayName}&background=0D8ABC&color=fff`
                }
                alt={userAuth?.username}
              />
            </Box>
            {
              <Box display={"flex"} justifyContent={"center"} mt={5}>
                <Badge
                  ml="1"
                  bg={isSuperanfitrion ? "#e6b219" : "gray.300"}
                  borderRadius={5}
                  textAlign={"center"}
                  display={"flex"}
                  alignItems={"center"}
                  p={1}
                >
                  {isSuperanfitrion ? "Plan SuperAnfitrión" : "Plan Anfitrión"}
                  {isSuperanfitrion && (
                    <MdWorkspacePremium ml={20} fontSize={20} />
                  )}
                </Badge>
              </Box>
            }
            <Box display={"flex"} justifyContent={"center"} mt={3}>
              <Heading size="sm" textTransform={"capitalize"}>
                {userAuth?.displayName}
              </Heading>
            </Box>
            <Box marginTop={20}>
              <Text as="h4" textAlign={"center"} fontWeight={"bold"}>
                Bienvenido Anfitrión
              </Text>
              <Box marginTop={10}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Image
                    src={imageResults}
                    width={"60%"}
                    height={"60%"}
                    borderRadius={10}
                  />
                </Box>
                <Box marginTop={5}>
                  <Text textAlign={"left"}>
                    Publica tu anuncio y diles a los estudiantes porque tu
                    pensión es el lugar ideal para su vida universitaria
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box>
              <Text fontWeight={"bold"} marginTop={40} textAlign={"center"}>
                Una comunidad de estudiantes que comparten el mismo viaje que tú
              </Text>
            </Box>
          </DrawerBody>
          <DrawerFooter
            borderTopWidth="1px"
            display={"flex"}
            justifyContent={"center"}
          >
            <Heading size={"md"} color={COLOR.GREEN}>
              Unipensiones
            </Heading>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
