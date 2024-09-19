import { ErrorBanner } from '@/components/layout/AlertBanner'
import { PageHeader } from '@/components/layout/Heading/PageHeader'
import { Badge, Box, Button, DataList, Flex, Heading, Table, Text } from '@radix-ui/themes'
import { useFrappeGetCall, useFrappeGetDocList } from 'frappe-react-sdk'
import { BiChevronLeft } from 'react-icons/bi'
import { Link, useParams, useRoutes } from 'react-router-dom'
import PriceTag from '@/assets/price-tag.svg'

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

export const ListItem = ({ image, title, category, options, offers }: { image?: string, title: string, category: string, options: [{ option: string, value: any }], offers: [{ offers: string, value: number }] }) => {
    return (
        <Table.Row>
            <Table.RowHeaderCell>
                <Flex>
                    <div className='flex flex-col'>
                        {image ? <img src={image} alt={title} className='h-12 w-12 rounded-md bg-white p-2 mr-3' /> : <img src={PriceTag} alt={title} className='h-12 w-12 rounded-md bg-white p-2 mr-3 opacity-50' />}
                    </div>
                    <div className='flex flex-col flex-1'>
                        <Text size='4' color='yellow'>{title}</Text>
                        <Text size='1'>{category}</Text>
                    </div>
                </Flex>
            </Table.RowHeaderCell>
            <Table.Cell>
                <DataList.Root>
                    {options.map((option) => {
                        return <DataList.Item>
                            <DataList.Label minWidth="100px">{option.option}</DataList.Label>
                            <DataList.Value>{option.value}</DataList.Value>
                        </DataList.Item>
                    })}
                </DataList.Root>

            </Table.Cell>
            <Table.Cell>{offers.length} Offers</Table.Cell>
        </Table.Row>
    )
}

function ListPage() {
    const { name: categoryName } = useParams();

    const { data, error } = useFrappeGetCall<{ message: List[] }>("pricelist.api.doc.get_data", {
        revalidateOnFocus: false,
        filters: [['category', '=', categoryName ? categoryName : '']]
    })

    // const { data, error, isValidating, mutate } = useFrappeGetDocList<{ message: List[] }>(
    //     'PL Variant',
    //     {
    //         /** Fields to be fetched - Optional */
    //         fields: ['name', 'title', 'creation'],
    //         /** Filters to be applied - SQL AND operation */
    //         filters: [['category', '=', categoryName ? categoryName : '']],
    //         /** Filters to be applied - SQL OR operation */
    //         orFilters: [],
    //         /** Number of documents to be fetched. Default is 20  */
    //         limit: 10,
    //         /** Sort results by field and order  */
    //         orderBy: {
    //             field: 'creation',
    //             order: 'desc',
    //         },
    //         /** Fetch documents as a dictionary */
    //         asDict: true,
    //     }
    // );

    // useEffect(() => {
    //     mutate()
    // }, [categoryName])

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
                    {data.message.length === 0 ?
                        <EmptyStateForThreads /> :
                        <div className={'px-2'}>
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Options</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Offers</Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {data.message.map((item) => {
                                        return <ListItem title={item.title} key={item.title} category={item.category} options={item.options} offers={item.offers} />
                                    })}
                                </Table.Body>
                            </Table.Root>
                        </div>}
                </>}
            </Box>
        </Flex>
    )
}

export const Component = ListPage