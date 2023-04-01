import React from 'react'

import PropTypes from 'prop-types'
import { Button, HStack } from '@chakra-ui/react'
import { Form } from 'formik'
import { useSearchParams } from 'react-router-dom'

import FormCustom from '@components/forms/form'
import { Select } from '@components/forms/fields/_index'

const initialValues = { breed: '', origin: '' }

export default function Filter ({ onClose, setFilter }) {
    const [, setSearchParams] = useSearchParams()
    const handelFilter = (values) => {
        for (const filter in values) {
            setFilter(filter, values[filter] || '')
        }
        setSearchParams(values)
        onClose()
    }
    return (
        <>
            <FormCustom
                initialValues={initialValues}
                handelSubmit={handelFilter}
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
                                <Select label="Origin" name="origin">
                                    <option value="" selected disabled>Select Origin</option>
                                    <option value="farm">farm</option>
                                    <option value="importer">importer</option>
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
    onClose: PropTypes.func.isRequired,
    setFilter: PropTypes.func.isRequired
}
