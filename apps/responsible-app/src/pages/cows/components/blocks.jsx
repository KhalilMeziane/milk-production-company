import React from 'react'

import PropTypes from 'prop-types'
import { HStack, Text, Button, VStack, Grid, GridItem, IconButton, Heading, Divider } from '@chakra-ui/react'
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

export const ViewCow = ({ onClose, data }) => {
    console.log('data: ', data)
    return (
        <>
            <VStack alignItems="flex-start" w="full" py="2">
                <Heading fontWeight="medium" as="h2" size="md">Cow Info:</Heading>
                <Grid
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(4, 1fr)'
                    gap={1.5}
                    w="full"
                >
                    <GridItem colSpan={2}>
                        <Text>Cow Id:</Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text>{data.id}</Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text>Entry Date:</Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text>{data.entryDate}</Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text>Origin:</Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text>{data.origin}</Text>
                    </GridItem>
                    {
                        data.motherId && <>
                            <GridItem colSpan={2}>
                                <Text>Mother:</Text>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <Text>{data.motherId}</Text>
                            </GridItem>
                        </>
                    }
                    <GridItem colSpan={2}>
                        <Text>Added By:</Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text>{data.addedBy}</Text>
                    </GridItem>
                </Grid>
            </VStack>
            <Divider />
            <VStack alignItems="flex-start" w="full" py="2">
                <Heading fontWeight="medium" as="h2" size="md">Medical Status</Heading>
                <Grid
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(4, 1fr)'
                    gap={1.5}
                    w="full"
                >
                    <GridItem colSpan={4}>
                        <HStack>
                            <HStack spacing="2" w='50%'>
                                <Text>Date:</Text>
                                <Text>2023-03-29</Text>
                            </HStack>
                            <HStack spacing="2" w='50%'>
                                <Text>Diesis:</Text>
                                <Text>Diesis 1</Text>
                            </HStack>
                        </HStack>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <HStack>
                            <HStack spacing="2" w='50%'>
                                <Text>Date:</Text>
                                <Text>2023-03-29</Text>
                            </HStack>
                            <HStack spacing="2" w='50%'>
                                <Text>Diesis:</Text>
                                <Text>Diesis 1</Text>
                            </HStack>
                        </HStack>
                    </GridItem>
                </Grid>
            </VStack>
            <HStack justifyContent="flex-end" mt="2">
                <Button px="5" rounded="sm" colorScheme="gray" variant="outline" fontWeight="medium" onClick={onClose}>Close</Button>
            </HStack>
        </>
    )
}

ViewCow.propTypes = {
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
