import React, { useContext, useState } from "react";
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
  FormHelperText,
  VStack,
  Text,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { BiUser } from "react-icons/bi";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  deleteUser,
} from "firebase/auth";
import { errorManagment } from "../firebase/errors/errorManagmentUser";
import { db } from "../firebase/firestore/database";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getAnfitrionByUserId } from "../firebase/collections/querys/anfitriones";
import { AuthContext } from "../context/authContext";
import LogoUP from "../assets/logoUP.png";

const SingInUser = () => {
  const { auth } = useContext(AuthContext);
  const handleClick = () => setShow(!show);

  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading2, setisLoading2] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickGooglePopup = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const q = query(
          collection(db, "anfitriones"),
          where("userId", "==", user.uid),
          limit(1)
        );
        getDocs(q)
          .then(async (querySnapshot) => {
            if (!querySnapshot.empty) {
              setisLoading2(false);
              const doc = querySnapshot.docs[0];
              toast.success(
                "Accediendo a tu perfil " + (user.displayName ?? user.email),
                {
                  theme: "colored",
                  position: "top-center",
                }
              );
              setTimeout(function () {
                window.location.href = "user/" + doc?.id;
              }, 3000);
            } else {
              await deleteUser(auth.currentUser);
              toast.error("Este correo no existe, por favor registrate", {
                theme: "colored",
                position: "top-center",
              });
              auth.signOut();
            }
          })
          .catch((error) => {
            console.error("Error al buscar el usuario:", error);
            errorManagment(error.code);
          });
      })
      .catch((error) => {
        errorManagment(error.code);
      });
  };

  const handleSubmitFormUser = (event) => {
    event.preventDefault();
    setisLoading2(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        if (!auth.currentUser?.emailVerified) {
          toast.error(
            "Aún no has verificado tu corrreo electrónico para activar tu cuenta UP",
            {
              theme: "colored",
              position: "top-center",
            }
          );
          auth.signOut();
          return;
        }

        const user = userCredential.user;

        try {
          const documentAnfitrion = await getAnfitrionByUserId(user.uid);

          if (documentAnfitrion) {
            // toast.success("Accediendo a tu perfil " + (user.displayName ?? user.email), {
            //     theme: "colored",
            //     position: "top-center"
            // })
            // setTimeout(function () {
            //     window.location.href = "user/" + documentAnfitrion?.id;
            // }, 1000);
          } else {
            console.log("Documento no encontrado!");
          }
        } catch (error) {
          console.error(error);
          //errorManagment(error.code);
        }
      })
      .catch((error) => {
        setisLoading2(false);
        const errorCode = error.code;
        console.log("Error email, password: ", error);
        //errorManagment(errorCode);
      })
      .finally(() => {
        setisLoading2(false);
      });
  };

  return (
    <>
      <Button
        size={{ base: "sm", md: "md", lg: "lg" }}
        colorScheme="blue"
        variant={"outline"}
        width={"full"}
        onClick={onOpen}
      >
        Iniciar Sesión
      </Button>
      <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmitFormUser}>
            <ModalHeader pt={5} pb={5}>
              <Box display={"flex"} justifyContent={"center"}>
                <Image src={LogoUP} height={50} width={50} borderRadius={5} />
              </Box>
              <Heading textAlign={"center"}>Bienvenido a Unipensiones</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4} mt="5">
                <VStack spacing={"20px"} mt={"10px"}>
                  <FormControl width={"90%"} isRequired>
                    <FormLabel>Correo electrónico</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <BiUser color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="email"
                        variant={"filled"}
                        placeholder="Correo electrónico"
                        size="lg"
                        autoComplete="true"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl width={"90%"} isRequired>
                    <FormLabel>Contraseña</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <MdPassword color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type={show ? "text" : "password"}
                        variant={"filled"}
                        placeholder="Contraseña"
                        size="lg"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="md"
                          mt={"1.5"}
                          onClick={handleClick}
                        >
                          {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Box color={"blue.600"} fontSize={18}>
                    <a href="/resetpassword">¿Olvidaste tu contraseña?</a>
                  </Box>
                </VStack>
              </Stack>
            </ModalBody>
            <ModalFooter
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDir={"column"}
            >
              <Button
                width={{ base: "full", md: "50%" }}
                isLoading={isLoading2}
                colorScheme="blue"
                loadingText="Cargando"
                mt={3}
                type="submit"
              >
                Iniciar Sesión
              </Button>
              <Text
                fontSize={12}
                width={{ base: "90%", md: "50%" }}
                textAlign={"center"}
              >
                Si continúas, aceptas los{" "}
                <Text fontWeight={"bold"}>Términos del servicio;</Text>y
                confirmas que has leído nuestra{" "}
                <Text fontWeight={"bold"}>Política de privacidad</Text>
              </Text>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SingInUser;
