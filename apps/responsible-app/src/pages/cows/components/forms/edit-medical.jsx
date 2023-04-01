import React, { useState, useContext } from 'react'

import PropTypes from 'prop-types'
import { Button, HStack } from '@chakra-ui/react'
import { Form } from 'formik'
import * as yup from 'yup'

import FormCustom from '@components/forms/form'
import { Select, Input } from '@components/forms/fields/_index'
import { Store } from '@store/context'
import { UpdateExamination } from '@services/http-client'

const validationSchema = yup.object().shape({
    entryDate: yup.date().required('entry Date is required'),
    disease: yup.string().oneOf(['Bluetongue', 'Botulism', 'Brucellosis'], 'Invalid option selected').required('Disease is required')
})

export default function EditMedical ({ onClose, disease, fetchCowExamination }) {
    const initialValues = { disease: disease.disease, entryDate: disease.entryDate }
    const [isLoading, setLoading] = useState(false)
    const [state] = useContext(Store)
    const handelSubmit = async (values) => {
        try {
            setLoading(true)
            await UpdateExamination(state.auth.accessToken, disease.id, values)
            await fetchCowExamination()
            onClose()
        } catch (error) {
            console.log('http error: ', error.response)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <FormCustom
                initialValues={initialValues}
                validationSchema={validationSchema}
                handelSubmit={handelSubmit}
            >
                {
                    () => {
                        return (
                            <Form>
                                <Select label="Cow Disease " name="disease">
                                    <option value="" selected disabled>Select Disease</option>
                                    <option value="Bluetongue">Bluetongue</option>
                                    <option value="Botulism">Botulism</option>
                                    <option value="Brucellosis">Brucellosis</option>
                                </Select>
                                <Input label="Medical Examinations Date" name="entryDate" type="date" max={new Date().toISOString().split('T')[0]} />
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

EditMedical.propTypes = {
    onClose: PropTypes.func.isRequired,
    disease: PropTypes.object.isRequired,
    fetchCowExamination: PropTypes.func.isRequired
}
