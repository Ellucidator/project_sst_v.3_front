export interface Item {
    id: number;
    name: string;
    description?: string;
    price: number;
    in_stock: number;
    featured?: boolean;
    promotion: boolean;
    thumbnail_url: string;
}

export interface ItemPromotion extends Item {
    ItemPromotion:ItemPromotionAtributes;
}

export interface ItemPromotionAtributes{
    price:number
}

export interface ItemFull extends Item {
    bucket: string;
    mime: string;
    size: number;
    images: string;
    sub_category_id: number;
}