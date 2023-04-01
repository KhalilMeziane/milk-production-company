import React, { useState, useContext } from 'react'

import PropTypes from 'prop-types'
import { Button, HStack, Text } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Input, Select } from '@components/forms/fields/_index'
import { Store } from '@store/context'
import usePrivateAxios from '@services/private-axios'
import { RESPONSIBLE } from '@services/end-pointes'

const initialValues = { fullName: '', email: '', password: '', role: '' }
const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Minium 6 characters').max(30, 'Maximum 30 characters').required('Password is required'),
    fullName: yup.string().min(6, 'Minium 8 characters').max(30, 'Maximum 30 characters').required('full Name is required'),
    role: yup.string().oneOf(['admin', 'moderator'], 'Invalid option selected').required('User Role is required')
})

export default function AddResponsible ({ onClose }) {
    const [error, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [, dispatch] = useContext(Store)
    const axiosPrivate = usePrivateAxios()
    const handelSubmit = async (values) => {
        try {
            setLoading(true)
            const { data } = await axiosPrivate.post(RESPONSIBLE, values)
            dispatch({ type: 'SET_RESPONSIBLE', payload: data.user })
            onClose()
        } catch (error) {
            setError('Error when try to Add Responsible')
            console.log('http error: ', error.response)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            {
                error && <Text textAlign={'center'} textTransform={'capitalize'} py={3} px={2} color='red.500' rounded='sm' bg={'red.50'} mb='4'>{error}</Text>
            }
            <FormCustom
                initialValues={initialValues}
                validationSchema={validationSchema}
                handelSubmit={handelSubmit}
            >
                {
                    () => {
                        return (
                            <Form>
                                <Input label="fullName" name="fullName" placeholder="john doe"/>
                                <Input label="Email address" name="email" type="email" placeholder="john.doe@example.com"/>
                                <Select label="User Role" name="role">
                                    <option value="" selected disabled>Select User Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="moderator">Moderator</option>
                                </Select>
                                <Input label="Password" name="password" type="password" placeholder="password"/>
                                <HStack justifyContent="flex-end" mt="2">
                                    <Button px="5" rounded="sm" colorScheme="brand" variant="outline" fontWeight="medium" onClick={onClose}>Close</Button>
                                    <Button type="submit" rounded="sm" color='white' bg="brand.900" colorScheme="brand" isLoading={isLoading}>Submit</Button>
                                </HStack>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}

AddResponsible.propTypes = {
    onClose: PropTypes.func.isRequired
}
