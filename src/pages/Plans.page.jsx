import React from 'react'
import { Plan } from '../components/Plan.component'
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const PlansPage = () => {
    return (
        <VStack>
            <Box p={5}>
                <Heading size={'3xl'}>Elige tu plan</Heading>
                <Box p={2}>
                    <Text textAlign={'center'} fontSize={20}> Sin contratos, sin sorpresas.</Text>
                </Box>
            </Box>
            <Plan />
        </VStack>
    )
}

export { PlansPage };