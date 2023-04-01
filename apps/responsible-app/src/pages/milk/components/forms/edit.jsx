import React, { useState, useContext } from 'react'

import PropTypes from 'prop-types'
import { Button, HStack, Text } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Input } from '@components/forms/fields/_index'
import { Store } from '@store/context'
import usePrivateAxios from '@services/private-axios'
import { MILKS } from '@services/end-pointes'

export default function EditMilk ({ onClose, data }) {
    const initialValues = { size: data.size, entryDate: data.entryDate }
    const validationSchema = yup.object().shape({
        size: yup.number('milk size must be number').required('Milk Size is required'),
        entryDate: yup.date().required('Entry Day is required')
    })
    const [error, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [state, dispatch] = useContext(Store)
    const axiosPrivate = usePrivateAxios()
    const handelSubmit = async (values) => {
        try {
            setLoading(true)
            const response = await axiosPrivate.patch(`${MILKS}/${data.id}`, values)
            const milks = state.milks.map(item => {
                if (item.id !== response.data.Milk.id) {
                    return item
                } else {
                    return response.data.Milk
                }
            })
            dispatch({ type: 'UPDATE_MILK', payload: milks })
            onClose()
        } catch (error) {
            setError('Error when try to Update Milk')
            console.log('http error: ', error)
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
                                <Input label="Milk size" name="size" type="number" placeholder={data.size} />
                                <Input label="Entry day" name="entryDate" type="date" max={new Date().toISOString().split('T')[0]}/>
                                <HStack justifyContent="flex-end" mt="2">
                                    <Button px="5" rounded="sm" colorScheme="brand" variant="outline" fontWeight="medium" onClick={onClose}>Close</Button>
                                    <Button type="submit" rounded="sm" color='white' bg="brand.900" colorScheme="brand" isLoading={isLoading}>Update</Button>
                                </HStack>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}

EditMilk.propTypes = {
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
