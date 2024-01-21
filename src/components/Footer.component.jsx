import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Button,
  chakra,
  Container,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Link
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { RiHome2Line, RiNotification2Line, RiUser3Line, RiSettingsLine } from "react-icons/ri";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AddPension } from './AddPension.component';
import { AuthContext } from '../context/authContext';

const Logo = (props) => {
  return (
    <Text as="b">Unipensiones</Text>
  )
}

const SocialButton = ({
  children,
  label,
  href,
}) => {

  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

const Footer = () => {
  const [state, setState] = useState(false);
  const { userAuth } = useContext(AuthContext);

  useEffect(() => {
    setState(userAuth);
  }, [userAuth])

  return (
    <Box
      as="footer"
      p="4"
      textAlign="center"
      position="fixed"
      bottom="0"
      width="100%"
      backgroundColor="white"
      zIndex="2"
      display={{ base: state != null ? 'block' : 'none', md: 'none' }}
    >
      <HStack width={'full'} justifyContent={'center'} spacing={5}>
        <Box>
          <Link href="/">
            <Button bg="transparent" border={'none'}>
              <RiHome2Line fontSize={20} />
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href="/notifications">
            <Button bg="transparent" border={'none'}>
              <RiNotification2Line fontSize={20} />
            </Button>
          </Link>
        </Box>
        <Box>
          <AddPension />
        </Box>
        <Box>
          <Link href='/settings'>
            <Button bg="transparent" border={'none'}>
              <RiSettingsLine fontSize={20} />
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href="/profile">
            <Button bg="transparent" border={'none'}>
              <RiUser3Line fontSize={20} />
            </Button>
          </Link>
        </Box>
      </HStack>
    </Box>
  )
}

export default Footer;