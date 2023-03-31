import React from 'react'

import { Button } from '@chakra-ui/react'

import { Modal } from '@components/_index'
import { AddUser as AddUserForm } from './forms/_index'

export const AddUser = () => {
    return (
        <>
            <Modal title={'Add User'}>
                <Button rounded="sm" colorScheme='brand' variant='outline'>Add User</Button>
                <AddUserForm />
            </Modal>
        </>
    )
}
