import React from 'react'

import { Flex, Stack, Heading, Button, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import Head from '@components/head'
import { Brand } from '@config/constants'

export default function NotFound () {
    const navigate = useNavigate()
    return (
        <>
            <Head>
                <title>Not Found | {Brand}</title>
            </Head>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg="gray.100">
                <Stack spacing={4} mx={'auto'} maxW={'xl'} py={12} px={6}>
                    <Stack align={'center'} spacing={2}>
                        <Text fontSize={'xl'} fontWeight="semibold" textAlign={'center'}>{Brand}</Text>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Page Not Found
                        </Heading>
                        <Button onClick={() => navigate(-1)}>Go Back</Button>
                    </Stack>
                </Stack>
            </Flex>
        </>
    )
}
