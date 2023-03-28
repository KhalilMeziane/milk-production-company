import React from 'react'

import { MenuButton, Icon } from '@chakra-ui/react'
import { MdDeleteOutline } from 'react-icons/md'
import { BiDotsVerticalRounded } from 'react-icons/bi'

import { Brand } from '@config/constants'
import { Menu, Layout, Head, Table } from '@components/_index'
import { DeleteUser } from './components/forms/_index'
import { AddUser } from './components/blocks'

const MenuList = [
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
    { Header: 'createdAt', accessor: 'createdAt' },
    { Header: 'action', accessor: 'action', Cell: (props) => <Menu data={props} menuList={MenuList}><MenuButton><Icon fontSize={'20'} as={BiDotsVerticalRounded} /></MenuButton></Menu> }
]

const data = [
    {
        id: '456-544-544',
        fullName: 'khalil',
        email: 'khalil@gmail.com',
        createdAt: '2023-03-29'
    },
    {
        id: '456-544-544',
        fullName: 'khalil',
        email: 'khalil@gmail.com',
        createdAt: '2023-03-29'
    },
    {
        id: '456-544-544',
        fullName: 'khalil',
        email: 'khalil@gmail.com',
        createdAt: '2023-03-29'
    },
    {
        id: '456-544-544',
        fullName: 'khalil',
        email: 'khalil@gmail.com',
        createdAt: '2023-03-29'
    },
    {
        id: '456-544-544',
        fullName: 'khalil',
        email: 'khalil@gmail.com',
        createdAt: '2023-03-29'
    }
]

export default function Users () {
    return (
        <>
            <Head>
                <title>Cows | {Brand}</title>
            </Head>
            <Layout bgColor="white" p="4" border="1px" borderColor="gray.200">
                <Table
                    title='Users'
                    columns={tableHeadColumns}
                    data={data}
                    mb={'4'}
                    h={'full'}
                    overflowX="auto"
                    optionsList={[AddUser]}
                />
            </Layout>
        </>
    )
}
