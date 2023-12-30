import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer.component'
import Navbar from '../components/Navbar.component'
import { AuthContext } from '../context/authContext'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getAnfitrionByUserId } from '../firebase/collections/querys/anfitriones'

const Layout = ({ children }) => {

  const auth = getAuth();
  const [userAuth, SetUserAuth] = useState(null);
  const [isSuperanfitrion, setSuperanfitrion] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (userCredentials) => {
      if (userCredentials) {
        SetUserAuth(userCredentials)
      } else {
        SetUserAuth(null)
      }
    });

    localStorage.setItem("user", JSON.stringify(userAuth))
  }, [userAuth])

  useEffect(() => {
    const getDocument = async () => {
      let documentanfitrion = await getAnfitrionByUserId(userAuth?.uid)
      console.log("Documento superanfitrion: ", documentanfitrion);
      setSuperanfitrion(documentanfitrion?.user?.superanfitrion);
    }
    getDocument();
  }, [userAuth])

  return (
    <AuthContext.Provider value={{ auth, userAuth, SetUserAuth, isSuperanfitrion }}>
      <Box bgGradient='linear(to-l, #F6FBFE, #E0E9F5)'>
        <Navbar />
        <Box height={'86vh'}>
          {children}
        </Box>
        <Footer />
      </Box>
    </AuthContext.Provider>
  )
}

export default Layout