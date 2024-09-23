import { atom } from "jotai";
import type { ProductItemType } from "@/store/types";

export const selectedPricelistItem = atom<ProductItemType | null>(null);

export const showDetailsDrawerOpen = atom(false);
