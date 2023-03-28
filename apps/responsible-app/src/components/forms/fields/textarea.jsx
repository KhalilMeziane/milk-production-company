import React from 'react'

import { FormControl, FormLabel, FormErrorMessage, Textarea } from '@chakra-ui/react'
import { useField, ErrorMessage } from 'formik'
import PropTypes from 'prop-types'

export default function TextAreaField ({ label, ...props }) {
    const [field, meta] = useField(props)
    return (
        <FormControl id={field.name} isInvalid={meta.touched && meta.error} pb='1'>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Textarea size="md" resize="vertical" {...field} {...props} value={meta.value} />
            <FormErrorMessage>
                {
                    meta.touched && meta.error ? <ErrorMessage name={field.name} component="span"/> : null
                }
            </FormErrorMessage>
        </FormControl>
    )
}

TextAreaField.propTypes = {
    label: PropTypes.string.isRequired
}
