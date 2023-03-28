import React from 'react'

import { IconButton } from '@chakra-ui/react'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { CiFilter } from 'react-icons/ci'

import { Modal } from '@components/_index'
import { AddCow as AddCowForm, Filter as FilterForm } from './forms/_index'

export const AddCow = () => {
    return (
        <>
            <Modal title={'Add Cow'}>
                <IconButton rounded="sm" colorScheme='brand' variant='outline' fontSize='24px' icon={<AiOutlineAppstoreAdd />} />
                <AddCowForm />
            </Modal>
        </>
    )
}

export const Filter = () => {
    return (
        <>
            <Modal title={'Filter Cows'}>
                <IconButton rounded="sm" colorScheme='brand' variant='outline' fontSize='24px' icon={<CiFilter/>} />
                <FilterForm />
            </Modal>
        </>
    )
}
