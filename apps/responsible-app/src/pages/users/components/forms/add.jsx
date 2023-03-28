import React from 'react'

import PropTypes from 'prop-types'
import { Button, HStack } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Input } from '@components/forms/fields/_index'

const initialValues = { fullName: '', email: '', password: '' }
const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Minium 8 characters').max(30, 'Maximum 30 characters').required('Password is required'),
    fullName: yup.string().min(6, 'Minium 8 characters').max(30, 'Maximum 30 characters').required('full Name is required')
})

export default function AddCow ({ onClose }) {
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
                                <Input label="fullName" name="fullName" placeholder="john doe"/>
                                <Input label="Email address" name="email" type="email" placeholder="john.doe@example.com"/>
                                <Input label="Password" name="password" type="password" placeholder="password"/>
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

AddCow.propTypes = {
    onClose: PropTypes.func.isRequired
}
