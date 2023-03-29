import React from 'react'

import { IconButton } from '@chakra-ui/react'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'

import { Modal } from '@components/_index'
import { AddSize as AddSizeForm } from './forms/_index'

export const AddSize = () => {
    return (
        <>
            <Modal title={'Add Milk Size'}>
                <IconButton rounded="sm" colorScheme='brand' variant='outline' fontSize='24px' icon={<AiOutlineAppstoreAdd />} />
                <AddSizeForm />
            </Modal>
        </>
    )
}
