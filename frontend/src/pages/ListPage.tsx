import { ErrorBanner } from "@/components/layout/AlertBanner";
import { PageHeader } from "@/components/layout/Heading/PageHeader";
import { Box, Flex, Heading, Table, Text } from "@radix-ui/themes";
import { useFrappeGetCall } from "frappe-react-sdk";
import { BiChevronLeft } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { EmptyStateForThreads } from "@/components/common/EmptyStateForThreads";
import { ListItem } from "@/components/common/ListItem";
import ListItemDetails from "@/components/common/ListItemDetails";
import { ProductItemType } from "@/store/types";


function ListPage() {
  const { name: categoryName } = useParams();

  const { data, error } = useFrappeGetCall<{ message: ProductItemType[] }>(
    "pricelist.api.doc.get_data",
    {
      revalidateOnFocus: false,
      filters: [["category", "=", categoryName ? categoryName : ""]],
    }
  );

  return (
    <Flex direction="column" gap="0">
      <PageHeader>
        <Flex align="center" gap="3" className="h-8">
          <Link
            to="/"
            className="block bg-transparent hover:bg-transparent active:bg-transparent sm:hidden"
          >
            <BiChevronLeft size="24" className="block text-gray-12" />
          </Link>
          <Heading size="5">List</Heading>
        </Flex>
      </PageHeader>
      <Box className=" w-full pt-16 pb-8">
        <div className={"px-2"}>
          <ErrorBanner error={error} />
        </div>
        {data && (
          <>
            {data.message.length === 0 ? (
              <EmptyStateForThreads />
            ) : (
              <div className={"px-2"}>
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
                      return (
                        <ListItem
                          key={item.title}
                          item={item}
                        />
                      );
                    })}
                  </Table.Body>
                </Table.Root>
              </div>
            )}
          </>
        )}
      </Box>
      <ListItemDetails />
    </Flex>
  );
}

export const Component = ListPage;
