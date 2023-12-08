import React from 'react'
import CardAviso from './CardAviso.component'
import { Box } from '@chakra-ui/react'

const ContainerCardsAviso = ({ anuncios }) => {
    return (
        anuncios.map(anuncio => {
            return (
                <Box key={anuncio.id}  display={'flex'} flexDir={'row'} justifyContent={'flex-start'} alignItems={'flex-start'} flexWrap={'wrap'}>
                    <CardAviso anuncio={anuncio} />
                </Box>
            )
        })
    )
}

export default ContainerCardsAviso