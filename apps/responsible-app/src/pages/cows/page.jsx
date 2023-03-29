import React from 'react'

import { MenuButton, Icon } from '@chakra-ui/react'
import { MdDeleteOutline } from 'react-icons/md'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'

import { Brand } from '@config/constants'
import { Menu, Layout, Head, Table } from '@components/_index'
import { AddCow, Filter } from './components/blocks'
import { DeleteCow, EditCow, Medical } from './components/forms/_index'

const MenuList = [
    {
        title: 'Add Medical Examination',
        text: 'Disease',
        icon: FiEdit,
        body: <Medical />
    },
    {
        title: 'Edit Cow',
        text: 'Edit',
        icon: FiEdit,
        body: <EditCow />
    },
    {
        title: 'Delete Cow',
        text: 'Delete',
        icon: MdDeleteOutline,
        body: <DeleteCow />
    }

]

const tableHeadColumns = [
    { Header: 'id', accessor: 'id' },
    { Header: 'breed', accessor: 'breed' },
    { Header: 'entryDate', accessor: 'entryDate' },
    { Header: 'addedBy', accessor: 'addedBy' },
    { Header: 'action', accessor: 'action', Cell: (props) => <Menu data={props} menuList={MenuList}><MenuButton><Icon fontSize={'20'} as={BiDotsVerticalRounded} /></MenuButton></Menu> }
]

const data = [
    {
        id: 457,
        breed: 'Holstein',
        entryDate: '2023-03-28',
        addedBy: 'khalil meziane'
    },
    {
        id: 458,
        breed: 'montbliard',
        entryDate: '2023-03-28',
        addedBy: 'khalil meziane'
    },
    {
        id: 345,
        breed: 'Holstein',
        entryDate: '2023-03-28',
        addedBy: 'ahmed meziane'
    },
    {
        id: 123,
        breed: 'Holstein',
        entryDate: '2023-03-28',
        addedBy: 'khalil meziane'
    },
    {
        id: 631,
        breed: 'montbliard',
        entryDate: '2023-03-28',
        addedBy: 'khalil meziane'
    },
    {
        id: 402,
        breed: 'Holstein',
        entryDate: '2023-03-28',
        addedBy: 'ahmed'
    },
    {
        id: 905,
        breed: 'montbliard',
        entryDate: '2023-03-28',
        addedBy: 'zino meziane'
    }
]

export default function Cows () {
    return (
        <>
            <Head>
                <title>Cows | {Brand}</title>
            </Head>
            <Layout bgColor="white" p="4" border="1px" borderColor="gray.200">
                <Table
                    title='Cows'
                    columns={tableHeadColumns}
                    data={data}
                    mb={'4'}
                    h={'full'}
                    overflowX="auto"
                    optionsList={[AddCow, Filter]}
                />
            </Layout>
        </>
    )
}
