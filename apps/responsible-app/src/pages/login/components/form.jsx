import React from 'react'

import { Button } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import Input from '@components/forms/fields/input'

const initialValues = { email: '', password: '' }

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Minium 8 characters').max(30, 'Maximum 30 characters').required('Password is required')
})

export default function LoginForm () {
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
                                <Input label="Email address" name="email" type="email" placeholder="john.doe@example.com"/>
                                <Input label="Password" name="password" type="password" placeholder="password"/>
                                <Button type="submit" w='full' my='3' color='white' bg="brand.900" colorScheme="brand" >Sign in</Button>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}
