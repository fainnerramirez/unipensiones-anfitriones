import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer.component'
import Navbar from '../components/Navbar.component'
import { AuthContext } from '../context/authContext'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const Layout = ({ children }) => {

  const [userAuth, SetUserAuth] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (userCredentials) => {
      if (userCredentials) {
        SetUserAuth(userCredentials)
      } else {
        SetUserAuth(null)
      }
    });
  }, [userAuth])

  return (
    <AuthContext.Provider value={{ userAuth, SetUserAuth }}>
      <Navbar />
      <Box height={'86vh'}>
        {children}
      </Box>
      <Footer />
    </AuthContext.Provider>
  )
}

export default Layout