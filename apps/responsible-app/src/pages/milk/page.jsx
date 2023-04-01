/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react'

import { MenuButton, Icon } from '@chakra-ui/react'
import { MdDeleteOutline } from 'react-icons/md'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'

import { Brand } from '@config/constants'
import { Menu, Layout, Head, Table } from '@components/_index'
import { AddSize } from './components/blocks'
import { DeleteSize, EditSize } from './components/forms/_index'
import { Store } from '@store/context'
import usePrivateAxios from '@services/private-axios'
import { MILKS } from '@services/end-pointes'

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
    { Header: 'entryDate', accessor: 'entryDate' },
    { Header: 'addedBy', accessor: 'addedBy' },
    { Header: 'action', accessor: 'action', Cell: ({ row }) => <Menu data={row.original} menuList={MenuList}><MenuButton><Icon fontSize={'20'} as={BiDotsVerticalRounded} /></MenuButton></Menu> }
]

export default function Milk () {
    const [state, dispatch] = useContext(Store)
    const controller = new AbortController()
    const axiosPrivate = usePrivateAxios()
    const fetchMilks = async () => {
        try {
            const { data } = await axiosPrivate.get(MILKS)
            dispatch({ type: 'GET_MILKS', payload: data.milks })
        } catch (error) {
            console.log('error: ', error.response)
        }
    }

    useEffect(() => {
        fetchMilks()
        return () => {
            controller.abort()
        }
    }, [])
    return (
        <>
            <Head>
                <title>Milk | {Brand}</title>
            </Head>
            <Layout bgColor="white" p="4" border="1px" borderColor="gray.200">
                <Table
                    title='Daily Milk'
                    columns={tableHeadColumns}
                    data={state.milks}
                    mb={'4'}
                    h={'full'}
                    overflowX="auto"
                    optionsList={[AddSize]}
                />
            </Layout>
        </>
    )
}
