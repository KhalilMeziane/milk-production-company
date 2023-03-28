import React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'

import Navigation from '@navigation/routes'
import { theme, Font } from '@config/theme'

export default function App () {
    return (
        <HelmetProvider>
            <ChakraProvider theme={theme}>
                <Font />
                <Navigation />
            </ChakraProvider>
        </HelmetProvider>
    )
}
