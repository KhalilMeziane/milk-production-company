import React, { useMemo } from 'react'

import PropTypes from 'prop-types'
import 'regenerator-runtime'
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/table'
import { Box, Flex, Select, HStack, IconButton, Heading, InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiFilterOffLine } from 'react-icons/ri'
import { useSearchParams } from 'react-router-dom'

export default function CustomTable ({ data, columns: cols, title, optionsList, clearFilter, ...props }) {
    const [, setSearchParams] = useSearchParams()
    const columns = useMemo(() => [...cols], [cols])
    const tableProps = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        useFilters,
        useGlobalFilter,
        usePagination
    )
    return (
        <Box {...props}>
            <Heading as="h1" size="lg" fontWeight="semibold" color="gray.900">{title}</Heading>
            <Flex justifyContent="space-between" py={'3'} bg={'white'}>
                <SearchComponent preGlobalFilteredRows={tableProps.preGlobalFilteredRows} globalFilter={tableProps.globalFilter} setGlobalFilter={tableProps.setGlobalFilter} />
                <HStack>
                    {
                        clearFilter && <IconButton variant='solid' colorScheme='gray' icon={<RiFilterOffLine />} onClick={() => { tableProps.setAllFilters([]); setSearchParams({}) }} />
                    }
                    {
                        optionsList && optionsList.map((Item, index) => <Item setFilter={tableProps.setFilter} key={index}/>)
                    }
                </HStack>
            </Flex>
            <Table rounded={'md'} {...tableProps.getTableProps()}>
                <TableHead headerGroups={tableProps.headerGroups} />
                <TableBody getTableBodyProps={tableProps.getTableBodyProps} page={tableProps.page} prepareRow={tableProps.prepareRow} />
            </Table>
            <TableFooter state={tableProps.state} setPageSize={tableProps.setPageSize} previousPage={tableProps.previousPage} canPreviousPage={tableProps.canPreviousPage} nextPage={tableProps.nextPage} pageOptions={tableProps.pageOptions} canNextPage={tableProps.canNextPage} />
        </Box>
    )
}

const TableHead = ({ headerGroups }) => {
    return (
        <Thead>
            {
                headerGroups.map((headerGroup, key) => (
                    <Tr
                        key={key}
                        {...headerGroup.getHeaderGroupProps()}
                        borderBottom={'6px'}
                        borderColor={'gray.500'}
                    >
                        {
                            headerGroup.headers.map((column, index) => (
                                <Th
                                    key={index}
                                    {...column.getHeaderProps()}
                                    fontWeight={'medium'}
                                    fontSize={'xs'}
                                    color={'gray.700'}
                                >
                                    {
                                        column.render('Header')
                                    }
                                </Th>

                            ))
                        }
                    </Tr>
                ))
            }
        </Thead>
    )
}

const TableBody = ({ getTableBodyProps, page, prepareRow }) => {
    return (
        <Tbody {...getTableBodyProps()}>
            {
                page.map((row, index) => {
                    prepareRow(row)
                    return (
                        <Tr
                            key={index}
                            {...row.getRowProps()}
                            bg={'white'}
                            borderBottom={'2px'}
                            borderColor={'gray.100'}
                        >
                            {
                                row.cells.map((cell, key) => {
                                    return (
                                        <Td
                                            key={key}
                                            {...cell.getCellProps()}
                                        >
                                            <HStack gap="1">
                                                {
                                                    cell.render('Cell')
                                                }
                                            </HStack>
                                        </Td>
                                    )
                                }
                                )
                            }
                        </Tr>
                    )
                })
            }
        </Tbody>
    )
}

const TableFooter = ({ state, setPageSize, previousPage, canPreviousPage, nextPage, pageOptions, canNextPage }) => {
    return (
        <Flex justifyContent="space-between" mt="3">
            <Select
                w={'auto'}
                bg={'white'}
                value={state.pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </Select>
            <HStack p={'1.5'}>
                <IconButton
                    colorScheme="brand"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    aria-label='page précédent'
                    rounded="sm"
                    icon={<IoIosArrowBack fontSize="16px" />}
                />
                <Box w={'16'} textAlign={'center'}>
                    {state.pageIndex + 1} of {pageOptions.length}
                </Box>
                <IconButton
                    colorScheme="brand"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    aria-label='page précédent'
                    rounded="sm"
                    icon={<IoIosArrowForward fontSize="16px" />}
                />
            </HStack>
        </Flex>
    )
}

const SearchComponent = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <>
            <InputGroup w={{ base: '50%', md: '45%', lg: '30%' }}>
                <InputLeftElement pointerEvents='none'>
                    <AiOutlineSearch color='gray.300' />
                </InputLeftElement>
                <Input w='100%' value={value || ''} onChange={e => { setValue(e.target.value); onChange(e.target.value) }} placeholder={`search in ${count} records...`}
                />
            </InputGroup>
        </>
    )
}

CustomTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    optionsList: PropTypes.array,
    clearFilter: PropTypes.bool
}

TableHead.propTypes = {
    headerGroups: PropTypes.array.isRequired
}

TableBody.propTypes = {
    getTableBodyProps: PropTypes.func.isRequired,
    page: PropTypes.array.isRequired,
    prepareRow: PropTypes.func.isRequired
}

TableFooter.propTypes = {
    setPageSize: PropTypes.isRequired,
    canPreviousPage: PropTypes.isRequired,
    state: PropTypes.isRequired,
    pageOptions: PropTypes.isRequired,
    canNextPage: PropTypes.isRequired,
    nextPage: PropTypes.func.isRequired,
    previousPage: PropTypes.func.isRequired
}

SearchComponent.propTypes = {
    preGlobalFilteredRows: PropTypes.array.isRequired,
    globalFilter: PropTypes.isRequired,
    setGlobalFilter: PropTypes.func.isRequired
}
