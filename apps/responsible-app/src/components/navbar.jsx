import React from 'react'

import { Avatar, Box, Flex, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Heading } from '@chakra-ui/react'
import { Link as LinkRouter } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'
import { VscSignOut } from 'react-icons/vsc'
import { AiOutlineUser } from 'react-icons/ai'
import { TbReportAnalytics } from 'react-icons/tb'

import { Brand } from '@config/constants'

const MenuItems = [
    { name: 'Cows', path: '/cows', icon: TbReportAnalytics },
    { name: 'Profile', path: '/profile', icon: AiOutlineUser }
]

export default function Navbar (props) {
    return (
        <Flex
            px={{ base: 4, md: 8, lg: 16, xl: 24 }}
            height="20"
            alignItems="center"
            bg="white"
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
            justifyContent={{ base: 'space-between' }}
            {...props}
        >
            <Heading display={{ base: 'none', md: 'block' }} as="h1" size="lg" fontWeight="semibold" textColor="gray.900">{Brand}</Heading>
            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'} gap="2">
                    <Menu zIndex="2">
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    name="meziane khalil"
                                />
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg="white"
                            borderColor="gray.200"
                        >
                            {MenuItems.map(({ icon: Icon, path, name }) => (
                                <MenuItem
                                    as={LinkRouter}
                                    key={name}
                                    to={path}
                                    icon={<Icon />}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                            <MenuDivider />
                            <MenuItem icon={<VscSignOut />}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}
