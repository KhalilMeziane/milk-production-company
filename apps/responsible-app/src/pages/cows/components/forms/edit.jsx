import React, { useState, useContext } from 'react'

import PropTypes from 'prop-types'
import { Button, HStack, Text } from '@chakra-ui/react'
import { Form } from 'formik'

import FormCustom from '@components/forms/form'
import { Select, Input } from '@components/forms/fields/_index'
import { Store } from '@store/context'
import { UpdateCow } from '@services/http-client'

export default function EditCow ({ onClose, cow }) {
    const initialValues = { breed: cow.breed, entryDate: cow.entryDate }
    const [error, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [state, dispatch] = useContext(Store)
    const handelSubmit = async (values) => {
        try {
            setLoading(true)
            const { data } = await UpdateCow(state.auth.accessToken, cow.id, values)
            const cows = state.cows.map(item => {
                if (item.id !== cow.id) {
                    return item
                } else {
                    return data.cow
                }
            })
            dispatch({ type: 'UPDATE_COW', payload: cows })
            onClose()
        } catch (error) {
            setError('Error when try to Update Cow')
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
                handelSubmit={handelSubmit}
            >
                {
                    () => {
                        return (
                            <Form>
                                <Select value={cow.breed} label="Cow Breed" name="breed">
                                    <option value="" selected disabled>Select Cow Breed</option>
                                    <option value="holstein">Holstein</option>
                                    <option value="montbliard">Montbliard</option>
                                </Select>
                                <Input value={cow.entryDate} label="Entry Date" name="entryDate" type="date" />
                                <HStack justifyContent="flex-end" mt="2">
                                    <Button px="5" rounded="sm" colorScheme="brand" variant="outline" fontWeight="medium" onClick={onClose}>Close</Button>
                                    <Button type="submit" rounded="sm" color='white' bg="brand.900" colorScheme="brand" isLoading={isLoading}>Update</Button>
                                </HStack>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}

EditCow.propTypes = {
    onClose: PropTypes.func.isRequired,
    cow: PropTypes.object.isRequired
}
