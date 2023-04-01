import React, { useEffect, useContext, useState } from 'react'

import PropTypes from 'prop-types'
import { HStack, Text, Button, VStack, Grid, GridItem, IconButton, Heading, Divider } from '@chakra-ui/react'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { CiFilter } from 'react-icons/ci'

import { Modal } from '@components/_index'
import { AddCow as AddCowForm, Filter as FilterForm } from './forms/_index'
import { GetExamination } from '@services/http-client'
import { Store } from '@store/context'

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
    const { id } = data
    const controller = new AbortController()
    const [state] = useContext(Store)
    const [diseases, setDiseases] = useState([])
    const fetchCowExamination = async () => {
        try {
            const { data } = await GetExamination(state.auth.accessToken, id)
            setDiseases(data.examinations)
        } catch (error) {
            console.log('error: ', error.response)
        }
    }

    useEffect(() => {
        fetchCowExamination()
        return () => {
            controller.abort()
        }
    }, [])
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
                    {
                        diseases.length
                            ? diseases.map(disease => {
                                return (
                                    <GridItem colSpan={4} key={disease?.id}>
                                        <HStack>
                                            <HStack spacing="2" w='50%'>
                                                <Text>Date:</Text>
                                                <Text>{disease?.entryDate}</Text>
                                            </HStack>
                                            <HStack spacing="2" w='50%'>
                                                <Text>Diesis:</Text>
                                                <Text>{disease?.disease}</Text>
                                            </HStack>
                                        </HStack>
                                    </GridItem>
                                )
                            })
                            : <GridItem fontSize="lg" rounded="sm" colSpan={4} w="100%" bg="yellow.300" py="2" px="2">Empty list of diseases</GridItem>
                    }
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
