import { Box, Button, List, ListIcon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import { MdCheckCircle } from "react-icons/md"

const ModalNota = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [urlMercadoPago, setUrlMercadoPago] = useState("https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848c6efe38018c78e268e70389");

    return (
        <>
            <Button width={'full'} colorScheme='purple' size={'lg'} mb={2} onClick={onOpen}>
                Elejir Plan
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>¡Bienvenido a Unipensiones!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Estamos encantados de que desees mejorar tu experiencia como anfitrión con nuestro <span style={{ fontWeight: 'bold' }}>Plan Super Anfitrión.</span>
                            Para activar tu plan rápidamente, sigue estos sencillos pasos:</Text>
                        <List mt={5}>
                            <ListItem>
                                <ListIcon as={MdCheckCircle} color='green.500' />
                                Realiza el pago del Plan Super Anfitrión a través de Mercado pago.
                            </ListItem>
                            <ListItem>
                                <ListIcon as={MdCheckCircle} color='green.500' />
                                Captura la pantalla del comprobante de pago.
                            </ListItem>
                        </List>
                        <Text mt={5}> ¡Listo! Ahora solo falta que nos envíes la captura de pantalla al número oficial
                            de WhatsApp de Unipensiones: <span style={{ fontWeight: 'bold' }}>3206389215</span>.</Text>
                        <Text>Una vez recibamos la confirmación de tu pago, nuestro equipo se compromete a
                            habilitar tu plan de Super Anfitrión en un plazo máximo de una hora (1 h).
                        </Text>
                        <Text>Si tienes alguna pregunta o inconveniente, no dudes en contactarnos a través de WhatsApp
                            para brindarte asistencia inmediata.</Text>
                        <Text>Gracias por confiar en Unipensiones. ¡Disfruta de los beneficios exclusivos
                            que te ofrece nuestro <span style={{ fontWeight: 'bold' }}>Plan Super Anfitrión!</span></Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Cancelar pago
                        </Button>
                        <Button as="a" target="_blank" href={urlMercadoPago} colorScheme='blue'>Pagar con Mercado pago</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export { ModalNota }