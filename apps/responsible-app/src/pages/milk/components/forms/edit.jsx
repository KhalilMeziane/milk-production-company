import React from 'react'

import PropTypes from 'prop-types'
import { Button, HStack } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Input } from '@components/forms/fields/_index'

export default function EditCow ({ onClose }) {
    const initialValues = { size: '50', day: '' }
    const validationSchema = yup.object().shape({
        size: yup.number('milk size must be number').required('Milk Size is required'),
        day: yup.date().required('Entry Day is required')
    })
    return (
        <>
            <FormCustom
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {
                    () => {
                        return (
                            <Form>
                                <Input value={45} label="Milk size" name="size" type="number" placeholder="0" />
                                <Input label="Entry day" name="day" type="date" />
                                <HStack justifyContent="flex-end" mt="2">
                                    <Button px="5" rounded="sm" colorScheme="brand" variant="outline" fontWeight="medium" onClick={onClose}>Close</Button>
                                    <Button type="submit" rounded="sm" color='white' bg="brand.900" colorScheme="brand">Update</Button>
                                </HStack>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}

EditCow.propTypes = {
    onClose: PropTypes.func.isRequired
}
