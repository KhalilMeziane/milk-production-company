import React, { useContext, useState } from 'react'

import { Form } from 'formik'
import { Button, Text } from '@chakra-ui/react'
import * as yup from 'yup'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

import FormCustom from '@components/forms/form'
import Input from '@components/forms/fields/input'
import { LOGIN } from '@services/end-pointes'
import { Store } from '@store/context'

const initialValues = { email: '', password: '' }

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required')
})

export default function LoginForm () {
    const [error, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [, dispatch] = useContext(Store)
    const handelSubmit = async (values) => {
        try {
            setLoading(true)
            const { data } = await axios.post(LOGIN, values)
            localStorage.setItem('auth', JSON.stringify(data))
            dispatch({ type: 'AUTH_LOGIN', payload: data })
            return <Navigate to="/cows" />
        } catch (error) {
            setError('Invalid email or password')
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
                                <Input label="Email address" name="email" type="email" placeholder="john.doe@example.com"/>
                                <Input label="Password" name="password" type="password" placeholder="password"/>
                                <Button type="submit" w='full' my='3' color='white' bg="brand.900" colorScheme="brand" isLoading={isLoading} >Sign in</Button>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}
