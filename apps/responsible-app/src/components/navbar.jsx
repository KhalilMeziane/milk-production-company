import React, { useContext, useCallback, useEffect } from 'react'

import { Avatar, Box, Flex, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Heading } from '@chakra-ui/react'
import { Link as LinkRouter, useNavigate, Navigate } from 'react-router-dom'
import { FiChevronDown, FiUsers } from 'react-icons/fi'
import { VscSignOut } from 'react-icons/vsc'
import { AiOutlineUser } from 'react-icons/ai'
import { TbReportAnalytics } from 'react-icons/tb'

import Drawer from './drawer'
import Profile from './profile'
import { Brand } from '@config/constants'
import { Store } from '@store/context'
import usePrivateAxios from '@services/private-axios'
import { LOGOUT, PROFILE } from '@services/end-pointes'

const MenuItems = [
    { name: 'Cows', path: '/cows', icon: TbReportAnalytics },
    { name: 'Milk', path: '/milk', icon: AiOutlineUser }
]

export default function Navbar (props) {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(Store)
    const { role } = state.auth
    const axiosPrivate = usePrivateAxios()
    const handelSubmit = async () => {
        try {
            await axiosPrivate.get(LOGOUT)
            dispatch({ type: 'AUTH_LOGOUT' })
            navigate('/')
            localStorage.removeItem('auth')
        } catch (error) {
            localStorage.removeItem('auth')
            navigate('/')
            console.log('error: ', error.response)
        }
    }
    const fetchProfile = useCallback(async () => {
        try {
            const { data } = await axiosPrivate.get(PROFILE)
            dispatch({ type: 'AUTH_REFRESH', payload: data.profile })
        } catch (error) {
            localStorage.removeItem('auth')
            return <Navigate to="/" />
        }
    }, [])
    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])
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
            <Heading as="h1" size="lg" fontWeight="semibold" textColor="gray.900">{Brand}</Heading>
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
                                    name={state.auth.fullName}
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
                            {
                                role === 'admin' && <MenuItem
                                    as={LinkRouter}
                                    key={'Users'}
                                    to='/users'
                                    icon={<FiUsers />}
                                >
                                    Users
                                </MenuItem>
                            }
                            <Drawer title="Profile">
                                <MenuItem icon={<AiOutlineUser />}>Profile</MenuItem>
                                <Profile user={state.auth} />
                            </Drawer>
                            <MenuDivider />
                            <MenuItem onClick={handelSubmit} icon={<VscSignOut />}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}
