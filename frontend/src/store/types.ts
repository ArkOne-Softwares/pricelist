export type ProductItemType = {
    name: string;
    title: string;
    category: string;
    description?: string;
    options?: ProductOptionType[];
    offers?: ProductOffersType[];
    image?: string;
    parent_item?: string;
    sku?: string;
    ean?: string;
    upc?: string;
    barcode?: string;
    mop?: number;
    out_of_stock?: boolean;
};

export type ProductOffersType = {
    name: string;
    value: number;
    type?: string;
    condition?: string;
    segment?: string;
    active?: boolean;
    starts_at?: string;
    ends_at?: string;
};

export type ProductOptionType = {
    option: string;
    value: any;
};