import React from 'react'

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalOverlay,
    ModalContent,
    useDisclosure
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

export default function ModalCustom ({ title, children, ...props }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const childrenArray = React.Children.toArray(children)
    const CButton = () => {
        return React.cloneElement(childrenArray[0], { onClick: onOpen })
    }
    const Body = (props) => {
        return React.cloneElement(childrenArray[1], { ...props, onClose })
    }

    return (
        <>
            <CButton />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={'xl'}
                isCentered
                preserveScrollBarGap
                {...props}
            >
                <ModalOverlay />
                <ModalContent overflow="hidden" rounded="sm">
                    <ModalHeader fontSize='xl' fontWeight="semibold" bg="gray.50" textColor="gray.900" p='3' overflow="hidden">{title}</ModalHeader>
                    <ModalBody px="3" pt="0" mb="1">
                        <Body />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

ModalCustom.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}
