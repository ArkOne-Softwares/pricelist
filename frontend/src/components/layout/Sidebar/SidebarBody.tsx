import { AccessibleIcon, Box, Flex, ScrollArea, Text } from '@radix-ui/themes'
import React from 'react'
import { BiMessageAltDetail } from 'react-icons/bi'
import { LuBookmark } from 'react-icons/lu'
import { SidebarItem } from './SidebarComp'


export const SidebarBody = () => {
    return (
        <ScrollArea type="hover" scrollbars="vertical" className='h-[calc(100vh-7rem)]'>
            <Flex direction='column' gap='2' className='overflow-x-hidden pb-12 sm:pb-0' px='2'>
                <Flex direction='column' gap='1' className='pb-0.5'>
                    <SidebarItemForPage
                        to={'threads'}
                        label='Threads'
                        icon={<BiMessageAltDetail className='text-gray-12 dark:text-gray-300 mt-1 sm:text-sm text-base' />}
                        iconLabel='Threads' />
                    <SidebarItemForPage
                        to={'saved-messages'}
                        label='Saved'
                        icon={<LuBookmark className='text-gray-12 dark:text-gray-300 mt-0.5 sm:text-sm text-base' />}
                        iconLabel='Saved Message' />
                </Flex>
            </Flex>
        </ScrollArea>
    )
}

interface SidebarItemForPageProps {
    to: string
    label: string
    icon: React.ReactNode
    iconLabel: string
}

const SidebarItemForPage = ({ to, label, icon, iconLabel }: SidebarItemForPageProps) => {
    return (
        <Box>
            <SidebarItem to={to} className='py-1'>
                <AccessibleIcon label={iconLabel}>
                    {icon}
                </AccessibleIcon>
                <Box>
                    <Text size={{
                        initial: '3',
                        md: '2'
                    }} weight='bold' className='text-gray-12 dark:text-gray-300'>{label}</Text>
                </Box>
            </SidebarItem>
        </Box>
    )
}