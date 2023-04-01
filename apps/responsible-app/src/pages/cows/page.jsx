/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react'

import { MenuButton, Icon } from '@chakra-ui/react'
import { MdOutlineMedicalServices, MdOutlineDeleteOutline } from 'react-icons/md'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'
import { BsInfoSquare } from 'react-icons/bs'
import { GrAddCircle } from 'react-icons/gr'

import { Brand } from '@config/constants'
import { Menu, Layout, Head, Table } from '@components/_index'
import { AddCow, Filter, ViewCow } from './components/blocks'
import { DeleteCow, EditCow, Medical, AddCow as AddCowForm } from './components/forms/_index'
import { COWS as COWSUrl } from '@services/end-pointes'
import { Store } from '@store/context'
import usePrivateAxios from '@services/private-axios'

const MenuList = [
    {
        title: 'View Cow',
        text: 'View',
        icon: BsInfoSquare,
        body: <ViewCow />
    },
    {
        title: 'Add Medical Examination',
        text: 'Disease',
        icon: MdOutlineMedicalServices,
        body: <Medical />
    },
    {
        title: 'Add Calf Birth',
        text: 'Add birth',
        icon: GrAddCircle,
        body: <AddCowForm />
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
        icon: MdOutlineDeleteOutline,
        body: <DeleteCow />
    }

]

const tableHeadColumns = [
    { Header: 'id', accessor: 'id' },
    { Header: 'breed', accessor: 'breed' },
    { Header: 'origin', accessor: 'origin' },
    { Header: 'entryDate', accessor: 'entryDate' },
    { Header: 'addedBy', accessor: 'addedBy' },
    { Header: 'action', accessor: 'action', Cell: ({ row }) => <Menu data={row.original} menuList={MenuList}><MenuButton><Icon fontSize={'20'} as={BiDotsVerticalRounded} /></MenuButton></Menu> }
]

export default function Cows () {
    const [state, dispatch] = useContext(Store)
    const controller = new AbortController()
    const axiosPrivate = usePrivateAxios()
    const fetchCows = async () => {
        try {
            const { data } = await axiosPrivate(COWSUrl)
            dispatch({ type: 'GET_COWS', payload: data.cows })
        } catch (error) {
            console.log('error: ', error.response)
        }
    }

    useEffect(() => {
        fetchCows()
        return () => {
            controller.abort()
        }
    }, [])
    return (
        <>
            <Head>
                <title>Cows | {Brand}</title>
            </Head>
            <Layout bgColor="white" p="4" border="1px" borderColor="gray.200">
                <Table
                    title='Cows'
                    columns={tableHeadColumns}
                    data={state.cows}
                    mb={'4'}
                    h={'full'}
                    overflowX="auto"
                    optionsList={[AddCow, Filter]}
                    clearFilter={true}
                />
            </Layout>
        </>
    )
}
