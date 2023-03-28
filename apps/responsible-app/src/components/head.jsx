import React from 'react'

import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'

export default function Head ({ children }) {
    return (
        <Helmet>
            {children}
        </Helmet>
    )
}

Head.propTypes = {
    children: PropTypes.node.isRequired
}
