/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react'

import { MenuButton, Icon } from '@chakra-ui/react'
import { MdDeleteOutline } from 'react-icons/md'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'

import { Brand } from '@config/constants'
import { Menu, Layout, Head, Table } from '@components/_index'
import { DeleteUser, UpdateResponsible } from './components/forms/_index'
import { AddUser } from './components/blocks'
import { GetResponsibles } from '@services/http-client'
import { Store } from '@store/context'

const MenuList = [
    {
        title: 'Edit Responsible',
        text: 'Edit',
        icon: FiEdit,
        body: <UpdateResponsible />
    },
    {
        title: 'Delete User',
        text: 'Delete',
        icon: MdDeleteOutline,
        body: <DeleteUser />
    }

]

const tableHeadColumns = [
    { Header: 'id', accessor: 'id' },
    { Header: 'fullName', accessor: 'fullName' },
    { Header: 'email', accessor: 'email' },
    { Header: 'role', accessor: 'role' },
    { Header: 'createdAt', accessor: 'createdAt' },
    { Header: 'action', accessor: 'action', Cell: ({ row }) => <Menu data={row.original} menuList={MenuList}><MenuButton><Icon fontSize={'20'} as={BiDotsVerticalRounded} /></MenuButton></Menu> }
]

export default function Users () {
    const [state, dispatch] = useContext(Store)
    const controller = new AbortController()
    const fetchResponsibles = async () => {
        try {
            const { data } = await GetResponsibles(state.auth.accessToken)
            dispatch({ type: 'GET_RESPONSIBLES', payload: data.users })
        } catch (error) {
            console.log('error: ', error.response)
        }
    }

    useEffect(() => {
        fetchResponsibles()
        return () => {
            controller.abort()
        }
    }, [])
    return (
        <>
            <Head>
                <title>Responsibles | {Brand}</title>
            </Head>
            <Layout bgColor="white" p="4" border="1px" borderColor="gray.200">
                <Table
                    title='Users'
                    columns={tableHeadColumns}
                    data={state.responsibles}
                    mb={'4'}
                    h={'full'}
                    overflowX="auto"
                    optionsList={[AddUser]}
                />
            </Layout>
        </>
    )
}
