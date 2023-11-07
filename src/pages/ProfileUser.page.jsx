import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firestore/database';
import { Box, Heading, Image, VStack, Text, CircularProgress } from '@chakra-ui/react';
import { AuthContext } from '../context/authContext';

const ProfileUser = () => {
  const { userId } = useParams();
  const [userDoc, setUserDoc] = useState(null);
  const [anfitrion, setAnfitrion] = useState("Soy Anfitrión");
  const [isLoading, setIsLoading] = useState(true);
  const { userAuth } = useContext(AuthContext);

  return (
    <VStack align={'center'}>
      <Box display={'flex'} justifyContent={'center'}>
        <Image
          borderRadius={'full'}
          boxSize='350px'
          objectFit='cover'
          src={userAuth?.photoURL}
          alt={userAuth?.displayName}
        />
      </Box>
      <Box>
        <Heading as="h2" textTransform={'capitalize'}>{userAuth?.displayName}</Heading>
      </Box>
      <Box>
        <Text>{anfitrion}</Text>
      </Box>
    </VStack>
  )
}

export default ProfileUser;