import { Button, DataList, Flex, Table, Text } from "@radix-ui/themes";

import { useSetAtom } from "jotai";
import { selectedPricelistItem, showDetailsDrawerOpen } from "@/store/atoms";
import type { ProductItemType } from "@/store/types";

import PriceTag from "@/assets/price-tag.svg";

export const ListItem = ({ item }: { item: ProductItemType }) => {
  const { title, category, image, options, offers, name } = item;

  const setSelectedItem = useSetAtom(selectedPricelistItem);
  const setDetailsDrawerOpen = useSetAtom(showDetailsDrawerOpen);
  const handleItemSelection = (value: ProductItemType) => {
    setSelectedItem(value);
    setDetailsDrawerOpen(true);
  };

  return (
    <Table.Row
      className="cursor-pointer hover:bg-slate-1"
      onClick={() => handleItemSelection(item)}
    >
      <Table.RowHeaderCell>
        <Flex>
          <div className="flex flex-col">
            {image ? (
              <img
                src={image}
                alt={title}
                className="h-12 w-12 rounded-md bg-white p-2 mr-3"
              />
            ) : (
              <img
                src={PriceTag}
                alt={title}
                className="h-12 w-12 rounded-md bg-white p-2 mr-3 opacity-50"
              />
            )}
          </div>
          <div className="flex flex-col flex-1">
            <Text size="4" color="yellow">
              {title}
            </Text>
            <Text size="1">{category}</Text>
          </div>
        </Flex>
      </Table.RowHeaderCell>
      <Table.Cell>
        {options && !options.length && (
          <>
            <p className="text-gray-400 dark:text-gray-600">
              No Options Availbale
            </p>
          </>
        )}
        <DataList.Root>
          {options &&
            options.length > 0 &&
            options.map((option) => {
              return (
                <DataList.Item>
                  <DataList.Label minWidth="100px">
                    {option.option}
                  </DataList.Label>
                  <DataList.Value>{option.value}</DataList.Value>
                </DataList.Item>
              );
            })}
        </DataList.Root>
      </Table.Cell>
      <Table.Cell>
        {offers && offers.length > 0 && <Button>{offers.length} Offers</Button>}
        {offers && !offers.length && (
          <p className="text-gray-400 dark:text-gray-600">0 Offers</p>
        )}
      </Table.Cell>
    </Table.Row>
  );
};
