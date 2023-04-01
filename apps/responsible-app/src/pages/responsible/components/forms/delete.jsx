import React, { useState, useContext } from 'react'

import PropTypes from 'prop-types'
import { HStack, Alert, Text, Button, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Input } from '@components/forms/fields/_index'
import { Store } from '@store/context'
import usePrivateAxios from '@services/private-axios'
import { RESPONSIBLE } from '@services/end-pointes'

export default function DeleteResponsible ({ onClose, data }) {
    const initialValues = { email: '' }
    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').oneOf([data.email], 'Email Not Match').required('Email is required')
    })
    const [error, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [state, dispatch] = useContext(Store)
    const axiosPrivate = usePrivateAxios()
    const handelSubmit = async () => {
        try {
            setLoading(true)
            await axiosPrivate.delete(`${RESPONSIBLE}/${data.id}`)
            const filteredResponsibles = state.responsibles.filter(item => item.id !== data.id)
            dispatch({ type: 'DELETE_RESPONSIBLE', payload: filteredResponsibles })
            onClose()
        } catch (error) {
            setError('Error when try to Delete Responsible')
            console.log('http error: ', error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Text fontSize="md" textColor="gray.900">
                This user will be deleted, along with all of its data.
            </Text>
            <Alert status='warning' variant='subtle' my="3" >
                <AlertTitle>Warning:</AlertTitle>
                <AlertDescription>This action is not reversible. Please be certain.</AlertDescription>
            </Alert>
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
                                <Text color="gray.900" fontSize="md" mb="1">
                                    Enter the user email <Text display='inline' fontWeight="semibold">{data.email}</Text> to continue:
                                </Text>
                                <Input name="email" placeholder={data.email} />
                                <HStack justifyContent="flex-end" mt="2">
                                    <Button px="5" rounded="sm" colorScheme="red" variant="outline" fontWeight="medium" onClick={onClose}>Close</Button>
                                    <Button type="submit" bg="red.500" px="5" rounded="sm" colorScheme="red" fontWeight="medium" isLoading={isLoading}>Delete</Button>
                                </HStack>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}

DeleteResponsible.propTypes = {
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
