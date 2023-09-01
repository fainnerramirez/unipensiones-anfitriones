import { Box } from '@chakra-ui/react'
import React from 'react'
import Footer from '../components/Footer.component'

const Layout = ({children}) => {
  return (
    <Box>
      <Box>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout