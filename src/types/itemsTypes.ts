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

export interface ItemPromotionAtributes{
    price:number
}

export interface ItemPromotion extends Item {
    ItemPromotion:ItemPromotionAtributes;
}

export interface ItemFull extends ItemPromotion {
    bucket?: string;
    mime?: string;
    size?: number;
    images?: {
        key:string[],
        mime?:string[],
        size?:string[],
        bucket?:string[]
    };
}