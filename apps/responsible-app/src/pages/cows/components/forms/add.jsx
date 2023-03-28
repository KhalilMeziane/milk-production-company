import React from 'react'

import PropTypes from 'prop-types'
import { Button, HStack } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Select, Input } from '@components/forms/fields/_index'

const initialValues = { breed: '', entryDate: '' }
const validationSchema = yup.object().shape({
    breed: yup.string().oneOf(['holstein', 'montbliard'], 'Invalid option selected').required('breed is required'),
    entryDate: yup.date().required('entry Date is required')
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
                                <Select label="Cow Breed" name="breed">
                                    <option value="" selected disabled>Select Cow Breed</option>
                                    <option value="holstein">Holstein</option>
                                    <option value="montbliard">Montbliard</option>
                                </Select>
                                <Input label="Entry Date" name="entryDate" type="date" />
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
