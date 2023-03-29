import React from 'react'

import PropTypes from 'prop-types'
import { Button, HStack } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Select, Input } from '@components/forms/fields/_index'

const initialValues = { disease: '', date: '' }
const validationSchema = yup.object().shape({
    disease: yup.string().oneOf(['holstein', 'montbliard'], 'Invalid option selected').required('Disease is required'),
    date: yup.date().required('entry Date is required')
})

export default function Medical ({ onClose }) {
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
                                <Select label="Cow Disease " name="disease">
                                    <option value="" selected disabled>Select Disease</option>
                                    <option value="holstein">Holstein</option>
                                    <option value="montbliard">Montbliard</option>
                                </Select>
                                <Input label="Medical Examinations Date" name="date" type="date" />
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

Medical.propTypes = {
    onClose: PropTypes.func.isRequired
}
