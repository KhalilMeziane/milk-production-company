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

const initialValues = { size: '', day: '' }
const validationSchema = yup.object().shape({
    size: yup.number().typeError('you must specify a number').positive('Must be a positive number.').min(1, 'Milk size must be greater than or equal to 1').required('Milk Size must be Number'),
    entryDate: yup.date().required('Entry Day is required')
})

export default function AddSize ({ onClose }) {
    const [error, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [, dispatch] = useContext(Store)
    const axiosPrivate = usePrivateAxios()
    const handelSubmit = async (values) => {
        try {
            setLoading(true)
            const { data } = await axiosPrivate.post(MILKS, values)
            dispatch({ type: 'SET_MILK', payload: data.milk })
            onClose()
        } catch (error) {
            setError('Error when try to create Milk')
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
                                <Input label="Milk size" name="size" type="number" placeholder="0" />
                                <Input label="Entry day" name="entryDate" type="date" max={new Date().toISOString().split('T')[0]} />
                                <HStack justifyContent="flex-end" mt="2">
                                    <Button px="5" rounded="sm" colorScheme="brand" variant="outline" fontWeight="medium" onClick={onClose}>Close</Button>
                                    <Button type="submit" rounded="sm" color='white' bg="brand.900" colorScheme="brand" isLoading={isLoading} >Submit</Button>
                                </HStack>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}

AddSize.propTypes = {
    onClose: PropTypes.func.isRequired
}
