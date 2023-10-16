import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firestore/database';
import { Box, Image, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from '@chakra-ui/react';
import { CheckIcon, PhoneIcon } from '@chakra-ui/icons';
import { AuthContext } from '../context/authContext';

const ProfileUser = () => {
  const { userId } = useParams();
  const [userDoc, setUserDoc] = useState(null);
  const { userAuth } = useContext(AuthContext);

  console.log("Userd Id Profile component: ", userId);

  useEffect(() => {
    const userDocRef = doc(db, "anfitriones", userId);
    const querySnapshot = async () => {
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setUserDoc(docSnap.data())
        console.log("User query exit!", docSnap.data())

      } else {
        console.log("document not found!");
      }
    }

    querySnapshot()
  }, [userId])

  return (
    <Stack spacing={4}>
      <Box display={'flex'} justifyContent={'center'}>
        <Image
          borderRadius={'full'}
          boxSize='100px'
          objectFit='cover'
          src={userAuth?.photoURL}
          alt={userAuth?.username}
        />
      </Box>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <PhoneIcon color='gray.300' />
        </InputLeftElement>
        <Input type='tel' placeholder='Phone number' value={userDoc?.username} />
      </InputGroup>

      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <PhoneIcon color='gray.300' />
        </InputLeftElement>
        <Input type='tel' placeholder='Phone number' value={userDoc?.lastname} />
      </InputGroup>

      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          color='gray.300'
          fontSize='1.2em'
          children='$'
        />
        <Input placeholder='Enter amount' value={userDoc?.userEmail} />
        <InputRightElement>
          <CheckIcon color='green.500' />
        </InputRightElement>
      </InputGroup>

      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          color='gray.300'
          fontSize='1.2em'
          children='$'
        />
        <Input placeholder='Enter amount' value={userDoc?.birthday} />
        <InputRightElement>
          <CheckIcon color='green.500' />
        </InputRightElement>
      </InputGroup>
    </Stack>
  )
}

export default ProfileUser;