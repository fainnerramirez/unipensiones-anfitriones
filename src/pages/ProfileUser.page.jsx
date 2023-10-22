import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firestore/database';
import { Box, Heading, Image, VStack, Text } from '@chakra-ui/react';
import { AuthContext } from '../context/authContext';

const ProfileUser = () => {
  const { userId } = useParams();
  const [userDoc, setUserDoc] = useState(null);
  const [anfitrion, setAnfitrion] = useState("Soy Anfitrión");
  const { userAuth } = useContext(AuthContext);

  useEffect(() => {
    const userDocRef = doc(db, "anfitriones", userId);
    const querySnapshot = async () => {
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setUserDoc(docSnap.data())
      } else {
        console.log("document not found!");
      }
    }

    querySnapshot()
  }, [userId])

  return (
    <VStack align={'center'}>
      <Box display={'flex'} justifyContent={'center'}>
        <Image
          borderRadius={'full'}
          boxSize='350px'
          objectFit='cover'
          src={userAuth?.photoURL}
          alt={userAuth?.username}
        />
      </Box>
      <Box>
        <Heading as="h2">{userDoc?.username + " " + userDoc?.lastname}</Heading>
      </Box>
      <Box>
        <Text>{anfitrion}</Text>
      </Box>
    </VStack>
  )
}

export default ProfileUser;