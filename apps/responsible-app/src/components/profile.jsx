/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react'

import PropTypes from 'prop-types'
import { HStack, Text, Button, VStack, Avatar, Heading, Divider } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Input } from '@components/forms/fields/_index'
import { UpdateInfo as UpdateInfoCall, UpdatePassword as UpdatePasswordCall } from '@services/http-client'
import { Store } from '@store/context'

export default function Profile ({ user, onClose }) {
    return (
        <>
            <VStack alignItems="flex-start" w="full">
                <HStack>
                    <Avatar h="16" w="16" rounded="full" name={user.fullName} />
                    <VStack alignItems="flex-start">
                        <Heading as="h2" size="md">{user.fullName}</Heading>
                        <Text>{user.email}</Text>
                    </VStack>
                </HStack>
                <Divider />
                <UpdateInfo onClose={onClose} user={user} />
                <UpdatePassword onClose={onClose} />
                <HStack justifyContent="flex-end" mt="2" position="absolute" bottom="2" right="2">
                    <Button px="5" rounded="sm" colorScheme="gray" variant="outline" fontWeight="medium" onClick={onClose}>Close</Button>
                </HStack>
            </VStack>
        </>
    )
}

const UpdateInfo = ({ onClose, user }) => {
    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        fullName: yup.string().min(6, 'Minium 6 characters').max(30, 'Maximum 30 characters').required('full Name is required')
    })
    const initialValues = { fullName: user.fullName, email: user.email }
    const [error, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [state, dispatch] = useContext(Store)
    const handelSubmit = async (values) => {
        try {
            setLoading(true)
            const { data } = await UpdateInfoCall(state.auth.accessToken, values)
            localStorage.setItem('auth', JSON.stringify(data))
            dispatch({ type: 'AUTH_LOGIN', payload: data })
            onClose()
        } catch (error) {
            setError('Error when try to update Profile Info')
            console.log('http error: ', error.response)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            {
                error && <Text textAlign={'center'} w='full' textTransform={'capitalize'} py={3} px={2} color='red.500' rounded='sm' bg={'red.50'} mb='4'>{error}</Text>
            }
            <FormCustom
                initialValues={initialValues}
                validationSchema={validationSchema}
                handelSubmit={handelSubmit}
            >
                {
                    () => {
                        return (
                            <Form style={{ width: '100%' }}>
                                <Input label="fullName" name="fullName" placeholder="john doe" />
                                <Input label="Email address" name="email" type="email" placeholder="john.doe@example.com" />
                                <Button mt="1" type="submit" rounded="sm" color='white' bg="brand.900" colorScheme="brand" isLoading={isLoading} >Submit</Button>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}

const UpdatePassword = ({ onClose }) => {
    const validationSchema = yup.object().shape({
        newPassword: yup.string().min(6, 'Minium 6 characters').max(30, 'Maximum 30 characters').required('Password is required'),
        oldPassword: yup.string().min(6, 'Minium 6 characters').max(30, 'Maximum 30 characters').required('Password is required')
    })
    const initialValues = { newPassword: '', oldPassword: '' }
    const [error, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [state] = useContext(Store)
    const handelSubmit = async (values) => {
        try {
            setLoading(true)
            await UpdatePasswordCall(state.auth.accessToken, values)
            onClose()
        } catch (error) {
            setError('Error when try to update Profile Info')
            console.log('http error: ', error.response)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            {
                error && <Text textAlign={'center'} w='full' textTransform={'capitalize'} py={3} px={2} color='red.500' rounded='sm' bg={'red.50'} mb='4'>{error}</Text>
            }
            <FormCustom
                initialValues={initialValues}
                validationSchema={validationSchema}
                handelSubmit={handelSubmit}
            >
                {
                    () => {
                        return (
                            <Form style={{ width: '100%' }}>
                                <Input label="Old Password" name="oldPassword" type="password" placeholder="old password"/>
                                <Input label="New Password" name="newPassword" type="password" placeholder="new password"/>
                                <Button mt="1" type="submit" rounded="sm" color='white' bg="brand.900" colorScheme="brand" isLoading={isLoading} >Submit</Button>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
}
