import React from 'react'

import PropTypes from 'prop-types'
import { HStack, Alert, Text, Button, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Input } from '@components/forms/fields/_index'

export default function DeleteCow ({ onClose }) {
    const initialValues = { id: '' }
    const validationSchema = yup.object().shape({
        id: yup.string().oneOf(['123e4567-e89b-12d3-a456-426655'], 'Cow Id Not Match').required('Cow ID is required')
    })

    return (
        <>
            <Text fontSize="md" textColor="gray.900">
                This cow will be deleted, along with all of its data.
            </Text>
            <Alert status='warning' variant='subtle' my="3" >
                <AlertTitle>Warning:</AlertTitle>
                <AlertDescription>This action is not reversible. Please be certain.</AlertDescription>
            </Alert>
            <FormCustom
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {
                    () => {
                        return (
                            <Form>
                                <Text color="gray.900" fontSize="md" mb="1">
                                    Enter the Cow Id <Text display='inline' fontWeight="semibold">123e4567-e89b-12d3-a456-426655</Text> to continue:
                                </Text>
                                <Input name="id" placeholder="123e4567-e89b-12d3-a456-426655" />
                                <HStack justifyContent="flex-end" mt="2">
                                    <Button px="5" rounded="sm" colorScheme="red" variant="outline" fontWeight="medium" onClick={onClose}>Close</Button>
                                    <Button type="submit" bg="red.500" px="5" rounded="sm" colorScheme="red" fontWeight="medium">Delete</Button>
                                </HStack>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}

DeleteCow.propTypes = {
    onClose: PropTypes.func.isRequired
}
