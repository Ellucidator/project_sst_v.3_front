import { TagValue } from "./tagTypes";

export interface ItemToCar{
    id:number
    quantity:number
}

export interface ItemCharacteristics{
    item_id: number
    width: number
    height: number
    length: number
    weight: number
    insurance_value: number
    quantity?: number
}

export interface Item {
    id: number;
    name: string;
    description?: string;
    price: number;
    in_stock: number;
    featured?: boolean;
    promotion: boolean;
    thumbnail_url: string;
    sub_category_id?: number;
    quantity?:number;
    ItemCharacteristics?: ItemCharacteristics
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
    TagValues?: TagValue[]
}