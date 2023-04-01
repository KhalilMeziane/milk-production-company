import React, { useState, useContext } from 'react'

import PropTypes from 'prop-types'
import { Button, HStack, Text } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Select } from '@components/forms/fields/_index'
import { Store } from '@store/context'
import usePrivateAxios from '@services/private-axios'
import { RESPONSIBLE } from '@services/end-pointes'

const validationSchema = yup.object().shape({
    role: yup.string().oneOf(['admin', 'moderator'], 'Invalid option selected').required('User Role is required')
})

export default function UpdateResponsible ({ onClose, data: responsible }) {
    const initialValues = { role: responsible.role }
    const [error, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [state, dispatch] = useContext(Store)
    const axiosPrivate = usePrivateAxios()
    const handelSubmit = async (values) => {
        try {
            setLoading(true)
            const { data } = await axiosPrivate.patch(`${RESPONSIBLE}/${responsible.id}`, values)
            const responsiblesList = state.responsibles.map(user => {
                if (user.id === data.user.id) {
                    return {
                        ...user,
                        ...data.user
                    }
                } else {
                    return user
                }
            })
            dispatch({ type: 'UPDATE_RESPONSIBLE', payload: responsiblesList })
            onClose()
        } catch (error) {
            setError('Error when try to Update Responsible')
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
                                <Select label="User Role" name="role">
                                    <option value="" selected disabled>Select User Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="moderator">Moderator</option>
                                </Select>
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

UpdateResponsible.propTypes = {
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
