import React from 'react'

import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

import Navbar from './navbar'

export default function Layout ({ children, ...rest }) {
    return (
        <Box minH="100vh" bg="gray.100">
            <Navbar/>
            <Box {...rest} px={{ base: 4, md: 8, lg: 16, xl: 24 }} bg="white">
                {children}
            </Box>
        </Box>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}
