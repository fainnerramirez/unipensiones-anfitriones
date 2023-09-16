import { Box } from '@chakra-ui/react'
import React from 'react'
import Footer from '../components/Footer.component'
import Navbar from '../components/Navbar.component'

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      <Box height={'86vh'}>
        {children}
      </Box>
      <Footer />
    </>
  )
}

export default Layout