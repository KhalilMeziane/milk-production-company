import React from 'react'

import { Flex, Box, Stack, Heading, Text } from '@chakra-ui/react'
import { Link as LinkRouter } from 'react-router-dom'

import Head from '@components/head'
import Form from './components/form'
import { Brand } from '@config/constants'

export default function Login () {
    return (
        <>
            <Head>
                <title>Login | {Brand}</title>
            </Head>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg="gray.100">
                <Stack spacing={4} mx={'auto'} maxW={'xl'} py={12} px={6}>
                    <Stack align={'center'} spacing={0}>
                        <Text as={LinkRouter} to="/" fontSize={'xl'} fontWeight="semibold" textAlign={'center'}>{Brand}</Text>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Welcome to Dashboard
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'md'}
                        bg="white"
                        p={8}
                        border="1px"
                        borderColor="gray.300"
                    >
                        <Form />
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}
