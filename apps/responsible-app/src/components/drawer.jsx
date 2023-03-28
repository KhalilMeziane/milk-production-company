import React from 'react'

import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

export default function CustomDrawer ({ title, children }) {
    const btnRef = React.useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const childrenArray = React.Children.toArray(children)
    const CButton = () => {
        return React.cloneElement(childrenArray[0], { onClick: onOpen })
    }
    const Body = () => {
        return React.cloneElement(childrenArray[1], { onClose })
    }

    return (
        <>
            <CButton />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size="md"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{title}</DrawerHeader>
                    <DrawerBody>
                        <Body />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

CustomDrawer.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}
