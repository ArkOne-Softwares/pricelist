import { Text } from "@radix-ui/themes";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedPricelistItem, showDetailsDrawerOpen } from "@/store/atoms";
import type { ProductItemType } from "@/store/types";
import { Drawer, DrawerContent } from "../layout/Drawer";
import { useEffect } from "react";

export default function ListItemDetails() {
  const item = useAtomValue<ProductItemType | null>(selectedPricelistItem);
  const setDetailsDrawerOpen = useSetAtom(showDetailsDrawerOpen);
  const open = useAtomValue(showDetailsDrawerOpen);

  useEffect(() => {
    setDetailsDrawerOpen(!open);
  }, []);

  return (
    <>
      <Drawer open={open} onOpenChange={setDetailsDrawerOpen} direction="bottom" dismissible>
        <DrawerContent>
          <div className="min-h-[60vh]">
            <Text>Item: {item?.title}</Text>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
