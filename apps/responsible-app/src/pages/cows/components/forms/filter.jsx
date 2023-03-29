import React from 'react'

import PropTypes from 'prop-types'
import { Button, HStack } from '@chakra-ui/react'
import { Form } from 'formik'

import FormCustom from '@components/forms/form'
import { Select } from '@components/forms/fields/_index'

const initialValues = { breed: '', addedBy: '' }

export default function Filter ({ onClose }) {
    return (
        <>
            <FormCustom
                initialValues={initialValues}
                handelSubmit={(values) => {
                    console.log('values: ', values)
                }}
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
                                <Select label="Added By" name="addedBy">
                                    <option value="" selected disabled>Select User</option>
                                    <option value="khalil">khalil</option>
                                    <option value="ahmed">ahmed</option>
                                </Select>
                                <HStack justifyContent="flex-end" mt="2">
                                    <Button px="5" rounded="sm" colorScheme="brand" variant="outline" fontWeight="medium" onClick={onClose}>Close</Button>
                                    <Button type="submit" rounded="sm" px="6" color='white' bg="brand.900" colorScheme="brand">Filter</Button>
                                </HStack>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}

Filter.propTypes = {
    onClose: PropTypes.func.isRequired
}
