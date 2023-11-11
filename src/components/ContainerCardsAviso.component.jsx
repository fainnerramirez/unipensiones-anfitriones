import React from 'react'
import CardAviso from './CardAviso.component'

const ContainerCardsAviso = ({ anuncios }) => {
    return (
        anuncios.map(anuncio => {
            return <CardAviso key={anuncio.id} anuncio={anuncio} />
        })
    )
}

export default ContainerCardsAviso