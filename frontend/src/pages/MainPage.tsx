import { Flex, Box } from '@radix-ui/themes'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar/Sidebar'
import { useIsMobile } from '@/hooks/useMediaQuery'

export const MainPage = () => {

    const isMobile = useIsMobile()

    return <Flex>
        {!isMobile &&
            <Box className={`w-64 bg-gray-2 border-r-gray-3 border-r dark:bg-gray-1`} left="0" top='0' position="fixed">
                <Sidebar />
            </Box>
        }
        <Box className='md:ml-[var(--sidebar-width)] w-[calc(100vw-var(--sidebar-width))] dark:bg-gray-2'>
            <Outlet />
        </Box>
    </Flex>
}