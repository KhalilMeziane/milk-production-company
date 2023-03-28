import React from 'react'

import { Button } from '@chakra-ui/react'
import { Form } from 'formik'

import FormCustom from '@components/forms/form'
import { Select } from '@components/forms/fields/_index'

const initialValues = { breed: '', addedBy: '' }

export default function Filter () {
    return (
        <>
            <FormCustom
                initialValues={initialValues}
            >
                {
                    () => {
                        return (
                            <Form>
                                <Select label="Cow Breed" name="addedBy">
                                    <option value="" selected disabled>Select Cow Breed</option>
                                    <option value="holstein">Holstein</option>
                                    <option value="montbliard">Montbliard</option>
                                </Select>
                                <Select label="Added By" name="breed">
                                    <option value="" selected disabled>Select User</option>
                                    <option value="khalil">khalil</option>
                                    <option value="ahmed">ahmed</option>
                                </Select>
                                <Button type="submit" w='full' my='3' color='white' bg="brand.900" colorScheme="brand">Submit</Button>
                            </Form>
                        )
                    }
                }
            </FormCustom>
        </>
    )
}
