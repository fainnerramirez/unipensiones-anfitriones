import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRef, useState } from "react";
import Confetti from "react-confetti";
import { BiUser } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { MdPassword } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import UserNotFound from "../assets/icon-photo.png";
import { auth } from "../firebase/authentication/auth";
import { createAnfitrion } from "../firebase/collections/querys/anfitriones";
import { errorManagment } from "../firebase/errors/errorManagmentUser";
import { LoadFileProfileUser } from "../firebase/references/users/profiles";
import SingInUser from "./SingIn.component";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { COLOR } from "../utils/Constants/Color";

const RegisterNew = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(UserNotFound);
  const [selectedFileProfile, setSelectedFileProfile] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti2, setShowConfetti2] = useState(false);
  const fileInputRef = useRef(null);

  const handleClick = () => setShow(!show);

  const handleButtonEditPhotoUser = () => {
    fileInputRef.current.click();
  };

  const handleGoogle = async () => {
    try {
      const Google = new GoogleAuthProvider();
      await signInWithPopup(auth, Google);
    } catch (error) {
      errorManagment(error.code);
    }
  };

  const handleSignInUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
    } catch (error) {
      errorManagment(error);
    }
  };

  const handleFileProfileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setSelectedFileProfile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmitForm = async (ev) => {
    ev.preventDefault();
    console.log("Confetti state: ", showConfetti2);
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      const options = {
        user: {
          id: user.uid,
          email: userEmail,
          superanfitrion: false,
        },
      };

      const doc = await createAnfitrion(options);

      if (selectedFileProfile) {
        await LoadFileProfileUser(selectedFileProfile, doc?.id);
      }

      sendEmailVerification(auth.currentUser).then(() => {
        console.log("Confetti state: ", showConfetti2);
        console.log("Confetti state after: ", showConfetti2);

        Swal.fire({
          icon: "success",
          title: "Activa tu cuenta unipensiones",
          text:
            "Revisa tu correo electrónico " +
            user?.email +
            " para activar tu cuenta en UP. !Ya casi estas dentro!",
          confirmButtonText: "Ok",
          showCloseButton: true,
          confirmButtonColor: "#0174BE",
          iconColor: "#0174BE",
        });
        auth.signOut();
        setShowConfetti2(true);
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const errorCode = error.code;
      errorManagment(errorCode);
    }
  };

  return (
    <>
      {showConfetti2 && <Confetti gravity={1} />}
      <form onSubmit={handleSubmitForm}>
        <Stack spacing={4}>
          {/* <Flex justifyContent={"center"} alignItems={"end"}>
            <Image
              borderRadius="full"
              objectFit={"cover"}
              boxSize={{ base: "80px", md: "100px" }}
              src={selectedImage}
              alt="Foto del usuario"
            />
            <Button onClick={handleButtonEditPhotoUser} colorScheme="blue">
              <TbEdit />
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileProfileChange}
            />
          </Flex> */}
          <HStack
            spacing={"5px"}
            flexDir={{ base: "column" }}
            width={{ base: "80%" }}
            marginLeft={{ base: "auto" }}
            marginRight={{ base: "auto" }}
            marginTop={30}
          >
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <BiUser color="gray.300" />
                </InputLeftElement>
                <Input
                  type="email"
                  size={"lg"}
                  placeholder="Correo electrónico"
                  variant="filled"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </InputGroup>
              <FormHelperText color={"whiteAlpha.900"}>
                Escribe un correo válido, tendrás que verificar el correo
                después de creada la cuenta
              </FormHelperText>
            </FormControl>
            <br />
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdPassword color="gray.300" />
                </InputLeftElement>
                <Input
                  type={show ? "text" : "password"}
                  size={"lg"}
                  placeholder="Contraseña"
                  variant="filled"
                  onChange={(e) => setUserPassword(e.target.value)}
                />
                <InputRightElement
                  width="auto"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  marginTop={1}
                  paddingRight={2}
                >
                  <Button size="sm" onClick={handleClick}>
                    {show ? <LuEye /> : <LuEyeOff />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText color={"whiteAlpha.900"}>
                La contraseña debe tener como mínimo 7 caracteres
              </FormHelperText>
            </FormControl>
          </HStack>
        </Stack>
        <Box mt={5} display={"flex"} justifyContent={"center"}>
          <Button
            size={"lg"}
            variant={"green-up"}
            type="submit"
            isLoading={isLoading}
          >
            Crear Cuenta
          </Button>
        </Box>
        <Box mt={50} position="relative" padding="6">
          <Divider />
          <AbsoluteCenter bg={COLOR.BLUE} px="2" textAlign={"center"}>
            Ó crea una cuenta con
          </AbsoluteCenter>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            size={"lg"}
            leftIcon={<FcGoogle />}
            variant={"solid"}
            onClick={handleGoogle}
          >
            Google
          </Button>
        </Box>
        <Box mt={30} position="relative" padding="6">
          <Divider />
          <AbsoluteCenter bg={COLOR.BLUE} px="2" textAlign={"center"}>
            ¿Ya tienes una cuenta?
          </AbsoluteCenter>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <SingInUser />
        </Box>
      </form>
    </>
  );
};
export default RegisterNew;
