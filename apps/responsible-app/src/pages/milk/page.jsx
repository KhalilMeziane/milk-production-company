import React from 'react'

import { MenuButton, Icon } from '@chakra-ui/react'
import { MdDeleteOutline } from 'react-icons/md'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'

import { Brand } from '@config/constants'
import { Menu, Layout, Head, Table } from '@components/_index'
import { AddSize } from './components/blocks'
import { DeleteSize, EditSize } from './components/forms/_index'

const MenuList = [
    {
        title: 'Edit size',
        text: 'Edit',
        icon: FiEdit,
        body: <EditSize />
    },
    {
        title: 'Delete size',
        text: 'Delete',
        icon: MdDeleteOutline,
        body: <DeleteSize />
    }

]

const tableHeadColumns = [
    { Header: 'id', accessor: 'id' },
    { Header: 'size', accessor: 'size' },
    { Header: 'date', accessor: 'date' },
    { Header: 'addedBy', accessor: 'addedBy' },
    { Header: 'action', accessor: 'action', Cell: (props) => <Menu data={props} menuList={MenuList}><MenuButton><Icon fontSize={'20'} as={BiDotsVerticalRounded} /></MenuButton></Menu> }
]

const data = [
    {
        id: 123,
        size: 45,
        date: '2023-03-28',
        addedBy: 'khalil meziane'
    },
    {
        id: 234,
        size: 45,
        date: '2023-03-28',
        addedBy: 'khalil meziane'
    },
    {
        id: 433,
        size: 45,
        date: '2023-03-28',
        addedBy: 'ahmed'
    },
    {
        id: 466,
        size: 45,
        date: '2023-03-28',
        addedBy: 'khalil meziane'
    },
    {
        id: 477,
        size: 45,
        date: '2023-03-28',
        addedBy: 'ahmed'
    }
]

export default function Milk () {
    return (
        <>
            <Head>
                <title>Milk | {Brand}</title>
            </Head>
            <Layout bgColor="white" p="4" border="1px" borderColor="gray.200">
                <Table
                    title='Daily Milk'
                    columns={tableHeadColumns}
                    data={data}
                    mb={'4'}
                    h={'full'}
                    overflowX="auto"
                    optionsList={[AddSize]}
                />
            </Layout>
        </>
    )
}
