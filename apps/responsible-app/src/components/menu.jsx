import React from 'react'

import PropTypes from 'prop-types'
import { Menu, MenuItem, MenuList, Icon, Text, HStack } from '@chakra-ui/react'

import Modal from './modal'

export default function MenuComponent ({ menuList, cow, children }) {
    return (
        <>
            <Menu>
                {children}
                <MenuList
                    bg={'white'}
                    borderColor={'gray.200'}
                    minW="0"
                    w={'32'}
                    shadow={'md'}
                >
                    {
                        menuList.map(({ title, text, icon, body }, index) => {
                            const [bodyR] = React.Children.toArray(body)
                            const Body = (props) => {
                                return React.cloneElement(bodyR, { ...props, cow })
                            }
                            return (
                                <MenuItem key={index}>
                                    <Modal
                                        title={title}
                                        blockScrollOnMount={true}
                                        scrollBehavior="outside"
                                        isCentered
                                    >
                                        <HStack>
                                            <Icon as={icon} />
                                            <Text w="full">{text}</Text>
                                        </HStack>
                                        <Body />
                                    </Modal>
                                </MenuItem>
                            )
                        })
                    }
                </MenuList>
            </Menu>
        </>
    )
}

MenuComponent.propTypes = {
    menuList: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
    cow: PropTypes.object.isRequired
}
