import {
  Box,
  Button,
  HStack,
  Heading,
  Image
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import Logo from "../assets/logoUP.png";
import { AuthContext } from '../context/authContext';

const Navbar = () => {

  const { auth, userAuth } = useContext(AuthContext);
  console.log("Auth: ", auth, userAuth)

  const handleSignOut = () => {
    auth.signOut();
    window.location.href = "/";
  }

  return (
    <HStack p={10} justifyContent={'space-between'}>
      <HStack spacing={10}>
        <Image src={Logo} width={50} height={50} borderRadius={10} />
        <Heading size={'lg'} display={{base: userAuth ? 'none': 'block', md: 'block'}}>Unipensiones</Heading>
      </HStack>
      <Box display={userAuth ? 'block' : 'none'}>
        <Button colorScheme='blue' onClick={handleSignOut} display={userAuth ? 'block' : 'none'}>Cerrar Sesión</Button>
      </Box>
    </HStack>
  )
}

export default Navbar;