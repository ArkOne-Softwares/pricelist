import { ErrorBanner } from '@/components/layout/AlertBanner'
import { PageHeader } from '@/components/layout/Heading/PageHeader'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { useFrappeGetCall } from 'frappe-react-sdk'
import { BiChevronLeft } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export type List = {
}

export const EmptyStateForThreads = () => {
    return (
        <Box className={'py-2 px-6'}>
            <Flex direction='column' gap='2'>
                <Text size='3'><strong>No data here</strong></Text>
                <Flex direction='column' gap='1'>
                    <Text as='span' size='2'>Threads are a way to keep conversations organized and focused. You can create a thread by replying to a message.</Text>
                    <Text as='span' size='2'>You can also start a thread by clicking on the <strong>Create Thread</strong> button on any message.</Text>
                </Flex>
            </Flex>
        </Box>
    )
}

function ListPage() {
    const { data, error } = useFrappeGetCall<{ message: List[] }>("pricelist.api.doc.get_data", {
        revalidateOnFocus: false
    })

    const { data: categories, error: categoryError } = useFrappeGetCall<{ message: List[] }>("pricelist.api.doc.get_category", {
        revalidateOnFocus: false
    })

    return (
        <Flex direction='column' gap='0'>
            <PageHeader>
                <Flex align='center' gap='3' className="h-8">
                    <Link to='/channel' className="block bg-transparent hover:bg-transparent active:bg-transparent sm:hidden">
                        <BiChevronLeft size='24' className="block text-gray-12" />
                    </Link>
                    <Heading size='5'>List</Heading>
                </Flex>
            </PageHeader>
            <Box className=" w-full pt-16 pb-8">
                <div className={'px-2'}><ErrorBanner error={error} /></div>
                {data && <>
                    {data.message?.length === 0 ?
                        <EmptyStateForThreads /> :
                        <Flex direction='column' gap='3' justify='start' px='4' pt='2'>
                            {data.message.map((item) => {
                                return <div>{item.name}</div>
                            })}
                        </Flex>}
                </>}
            </Box>

                <Flex align='center' gap='3' className="h-8">
                    <Link to='/channel' className="block bg-transparent hover:bg-transparent active:bg-transparent sm:hidden">
                        <BiChevronLeft size='24' className="block text-gray-12" />
                    </Link>
                    <Heading size='5'>Categories</Heading>
                </Flex>
            <Box className=" w-full pt-16 pb-8">
                <div className={'px-2'}><ErrorBanner error={categoryError} /></div>
                {data && <>
                    {data.message?.length === 0 ?
                        <EmptyStateForThreads /> :
                        <Flex direction='column' gap='3' justify='start' px='4' pt='2'>
                            {categories?.message.map((cat) => {
                                return <div>{cat.name}</div>
                            })}
                        </Flex>}
                </>}
            </Box>
        </Flex>
    )
}

export const Component = ListPage