import React from 'react'

import PropTypes from 'prop-types'
import { Button, HStack } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Input } from '@components/forms/fields/_index'

const initialValues = { size: 0, day: '' }
const validationSchema = yup.object().shape({
    size: yup.number('milk size must be number').required('Milk Size is required'),
    day: yup.date().required('Entry Day is required')
})

export default function AddSize ({ onClose }) {
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
                                <Input label="Milk size" name="size" type="number" />
                                <Input label="Entry day" name="day" type="date" />
                                <HStack justifyContent="flex-end" mt="2">
                                    <Button px="5" rounded="sm" colorScheme="brand" variant="outline" fontWeight="medium" onClick={onClose}>Close</Button>
                                    <Button type="submit" rounded="sm" color='white' bg="brand.900" colorScheme="brand">Submit</Button>
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
